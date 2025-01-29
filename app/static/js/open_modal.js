let modalState = {};

function openModal(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const textareaId = button.getAttribute('data-id');
    if (!textareaId) {
        return;
    }
    let selectedTextareaId = textareaId;

    if (!modalState[textareaId]) {
        modalState[textareaId] = { prompt: '', generatedText: '' };
    }

    const { prompt, generatedText } = modalState[textareaId];

    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal');
    modalDiv.innerHTML = `
        <div class="modal-content">
            <h2 id="no-margin-h2">Generate your description with AI</h2>
            <p id="small-text">List your key highlights from your professional experience, like notable achievements, skills acquired, or the impact of your contributions</p>
            <textarea id="prompt" name="prompt" placeholder="Enter your prompt here">${prompt}</textarea>
            <p id="status-text" style="display: ${generatedText ? 'block' : 'none'};">${generatedText || ''}</p>
            <div class="button-row center">
                <button class="close-button" id="small-text">Close</button>
                <button class="generate" id="small-text" disabled>Generate</button>
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
        statusText.style.display = "block";
        statusText.textContent = "Generating...";
        generateButton.disabled = true;

        fetch('/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': document.querySelector("input[name='csrf_token']").value,
            },
            body: new URLSearchParams({
                action: 'generate_description',
                prompt: promptTextarea.value
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.description) {
                    modalState[textareaId].generatedText = data.description;
                    statusText.textContent = data.description;
                    generateButton.textContent = "Regenerate";
                    generateButton.disabled = false;

                    if (!modalDiv.querySelector('.insert')) {
                        const insertButton = document.createElement('button');
                        insertButton.classList.add('insert');
                        insertButton.id = 'small-text';
                        insertButton.textContent = "Insert";
                        modalDiv.querySelector('.button-row').appendChild(insertButton);

                        insertButton.addEventListener('click', function () {
                            insertDescription(data.description, modalDiv, textareaId);
                        });
                    }
                } else {
                    alert("An error occurred: Empty response.");
                    generateButton.textContent = "Generate";
                    generateButton.disabled = false;
                }
            })
            .catch(() => {
                alert("Error generating description.");
                statusText.style.display = "none";
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
    generateButton.disabled = !promptTextarea.value.trim();
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
