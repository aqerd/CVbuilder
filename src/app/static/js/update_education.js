let educationCount = 1;

function addEducation(event) {
	event.preventDefault();
	educationCount++;

	const newEducationDiv = document.createElement('div');
	newEducationDiv.classList.add('education-item');
	newEducationDiv.innerHTML = `
		<h2 id="education-title-${educationCount}">Education</h2>
		<div class="form-group">
			<label for="institution-name-${educationCount}">Institution Name</label>
			<input type="text" id="institution-name-${educationCount}" name="institution-name-${educationCount}" placeholder="University Name">
		</div>
		<div class="form-group">
			<label for="education-period-${educationCount}">Study Period</label>
			<input type="text" id="education-period-${educationCount}" name="education-period-${educationCount}" placeholder="from - to">
		</div>
		<div class="form-group">
			<label for="field-of-study-${educationCount}">Field of Study</label>
			<input type="text" id="field-of-study-${educationCount}" name="field-of-study-${educationCount}" placeholder="Field of Study">
		</div>
	`;

	document.getElementById('education-container').appendChild(newEducationDiv);

	const institutionNameInput = document.getElementById(`institution-name-${educationCount}`);
	if (institutionNameInput) {
		institutionNameInput.addEventListener('input', updateEducationTitle);
	}
}

function updateEducationTitle(event) {
	const input = event.target;
	const educationId = input.id.replace('institution-name-', '');
	const titleElement = document.getElementById(`education-title-${educationId}`);
	titleElement.textContent = input.value.trim() || 'Education';
}

document.addEventListener('DOMContentLoaded', () => {
	const institutionNameInput = document.getElementById('institution-name-1');
	if (institutionNameInput) {
		institutionNameInput.addEventListener('input', updateEducationTitle);
	}

	const addButton = document.querySelector('.add-button');
	if (addButton) {
		addButton.addEventListener('click', addEducation);
	}
});
