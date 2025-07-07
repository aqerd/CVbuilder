let educationCount = 1;

function addEducation(event) {
	event.preventDefault();
	educationCount++;

	const exampleInstitutions = ['Harvard', 'Stanford', 'MIT', 'UCLA', 'UC Berkeley', 'Yale'];
	const randomInstitution = exampleInstitutions[Math.floor(Math.random() * exampleInstitutions.length)];

	const exampleFields = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Electrical Engineering', 'Economics'];
	const randomField = exampleFields[Math.floor(Math.random() * exampleFields.length)];

	const currentYear = new Date().getFullYear();
	const minYear = 2010;
	const startYear = Math.floor(Math.random() * (currentYear - minYear + 1)) + minYear;
	const endYear = Math.floor(Math.random() * (currentYear - startYear + 1)) + startYear;
	const timelinePlaceholder = startYear === endYear ? `${startYear}` : `${startYear} - ${endYear}`;

	const newEducationDiv = document.createElement('div');
	newEducationDiv.classList.add('education-item');
	newEducationDiv.innerHTML = `
		<h2 id="education-title-${educationCount}">Education</h2>
		<div class="form-group">
			<label for="institution-name-${educationCount}">Institution Name</label>
			<input type="text" id="institution-name-${educationCount}" name="institution-name-${educationCount}" placeholder="${randomInstitution}">
		</div>
		<div class="form-group">
			<label for="education-period-${educationCount}">Study Period</label>
			<input type="text" id="education-period-${educationCount}" name="education-period-${educationCount}" placeholder="${timelinePlaceholder}">
		</div>
		<div class="form-group">
			<label for="field-of-study-${educationCount}">Field of Study</label>
			<input type="text" id="field-of-study-${educationCount}" name="field-of-study-${educationCount}" placeholder="${randomField}">
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

document.addEventListener('DOMContentLoaded', function() {
    const initialInstitutionNameInput = document.getElementById('institution-name-1');
    if (initialInstitutionNameInput) {
        initialInstitutionNameInput.addEventListener('input', updateEducationTitle);
    }
});
