let modalState = {};

function openModal(event) {
	event.preventDefault();
	const button = event.currentTarget;
	const textareaId = button.getAttribute('data-id');
	if (!textareaId) return;

	let selectedTextareaId = textareaId;

	const textareaType = textareaId.includes("project") ? "project" : "job";

	if (!modalState[textareaId]) {
		modalState[textareaId] = { prompt: '', generatedText: '', type: textareaType };
	}

	const { prompt, generatedText } = modalState[textareaId];

	const modalDiv = document.createElement('div');
	modalDiv.classList.add('modal');
	modalDiv.innerHTML = `
		<div class="modal-content">
			<h2 class="modal-h2">Generate your description with AI</h2>
			<p class="small-text">List your key highlights from your professional experience, like notable achievements, skills acquired, or the impact of your contributions</p>
			<textarea id="prompt" class="small-text modal-textarea" name="prompt" placeholder="Enter your prompt here">${prompt}</textarea>
			<div class="boxed-text">
				<p id="status-text" class="small-text" style="display: ${generatedText ? 'block' : 'none'};">${generatedText || ''}</p>
			</div>
			<div class="button-row center">
				<button class="close-button" class="small-text">Close</button>
				<button class="generate" class="small-text" disabled>Generate</button>
			</div>
		</div>
	`;
	document.body.appendChild(modalDiv);
	modalDiv.style.display = "block";

	const closeButton = modalDiv.querySelector('.close-button');
	closeButton.addEventListener('click', function () {
		closeModal(modalDiv, textareaId);
	});

	const generateButton = modalDiv.querySelector('.generate');
	const promptTextarea = modalDiv.querySelector('#prompt');
	const statusText = modalDiv.querySelector('#status-text');

	updateGenerateButtonState(promptTextarea, generateButton);

	promptTextarea.addEventListener('input', function () {
		updateGenerateButtonState(promptTextarea, generateButton);
		modalState[textareaId].prompt = promptTextarea.value;
	});

	generateButton.addEventListener('click', function () {
		if (!promptTextarea.value.trim()) {
			showAlert("Please enter some text first");
			return;
		}

		showAlert("Generating...");
		generateButton.disabled = true;

		fetch('/profile', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'X-CSRFToken': document.querySelector("input[name='csrf_token']").value,
			},
			body: new URLSearchParams({
				action: 'generate_description',
				prompt: encodeURIComponent(promptTextarea.value),
				textarea_type: textareaType
			}),
		})
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(text => {
			console.log("Raw response:", text);

			const lines = text.trim().split(/\r?\n/).filter(line => line.trim() !== "").map(line => JSON.parse(line));
			const finalData = lines.find(line => line.description !== "Generating...");

			if (finalData && (finalData.description || finalData.error_message)) {
				if (finalData.error_code !== 0 && finalData.error_message) {
					showAlert(finalData.error_message);
					generateButton.textContent = "Generate";
					generateButton.disabled = false;
					return;
				}
				let generatedText = finalData.description;

				if (generatedText.startsWith("[ERROR]")) {
					let cleanText = generatedText.replace("[ERROR]", "").trim();
					if (cleanText) {
						cleanText = cleanText.charAt(0).toUpperCase() + cleanText.slice(1);
						showAlert(cleanText);
					} else {
						showAlert("Bad prompt detected, but no additional message provided");
					}

					generateButton.textContent = "Generate";
					generateButton.disabled = false;
					return;
				}

				modalState[textareaId].generatedText = generatedText;
				statusText.style.display = "block";
				statusText.textContent = generatedText;
				generateButton.textContent = "Regenerate";
				generateButton.disabled = false;

				if (!modalDiv.querySelector('.insert')) {
					const insertButton = document.createElement('button');
					insertButton.classList.add('insert');
					insertButton.id = 'small-text';
					insertButton.textContent = "Insert";
					modalDiv.querySelector('.button-row').appendChild(insertButton);
					insertButton.addEventListener('click', function () {
						insertDescription(generatedText, modalDiv, textareaId);
					});
				}
			} else {
				showAlert(finalData.error_message || "Empty response received");
				generateButton.textContent = "Generate";
				generateButton.disabled = false;
			}
		})
		.catch(error => {
			console.error("Error generating description:", error);
			showAlert("Error generating description. Try again");
			generateButton.textContent = "Generate";
			generateButton.disabled = false;
		});
	});
}

function closeModal(modalToClose, textareaId) {
	modalToClose.remove();
	if (textareaId && modalState[textareaId]) {
		const promptTextarea = modalToClose.querySelector('#prompt');
		if (promptTextarea) {
			modalState[textareaId].prompt = promptTextarea.value;
		}
	}
}

function updateGenerateButtonState(promptTextarea, generateButton) {
	if (!promptTextarea.value.trim()) {
		generateButton.disabled = false;
		generateButton.addEventListener('click', function showAlertMessage() {
			showAlert("Please enter some text first");
			generateButton.removeEventListener('click', showAlertMessage);
		});
	} else {
		generateButton.disabled = false;
	}
}

function insertDescription(description, modalDiv, textareaId) {
	if (!description || !textareaId) {
		return;
	}

	const targetTextarea = document.querySelector(`#${textareaId}`);
	if (!targetTextarea) {
		return;
	}

	targetTextarea.value = description;
	closeModal(modalDiv, textareaId);
}

document.addEventListener("DOMContentLoaded", function () {
	document.addEventListener("keydown", function (event) {
		if (event.key === "Enter") {
			const activeElement = document.activeElement;
			if (activeElement && activeElement.tagName !== "TEXTAREA") {
				event.preventDefault();
			}
		}
	});
});
