let experienceCount = 1;

function addExperience(event) {
	event.preventDefault();
	experienceCount++;

	const exampleCompanies = ['OpenAI', 'Apple', 'Nvidia', 'Microsoft', 'Amazon', 'Meta'];
	const randomCompany = exampleCompanies[Math.floor(Math.random() * exampleCompanies.length)];

	const examplePositions = ['Software Engineer', 'Project Manager', 'Lead Developer', 'QA Engineer', 'UI/UX Designer'];
	const randomPosition = examplePositions[Math.floor(Math.random() * examplePositions.length)];

	const currentYear = new Date().getFullYear();
	const minYear = 2010;
	const startYear = Math.floor(Math.random() * (currentYear - minYear + 1)) + minYear;
	const endYear = Math.floor(Math.random() * (currentYear - startYear + 1)) + startYear;
	const timelinePlaceholder = startYear === endYear ? `${startYear}` : `${startYear} - ${endYear}`;

	const starIcon = document.getElementById('ai-icon-template')?.innerHTML.trim() || '';

	const newExperienceDiv = document.createElement('div');
	newExperienceDiv.classList.add('experience-item');
	newExperienceDiv.innerHTML = `
		<h2 id="job-title-${experienceCount}">Job</h2>
		<div class="form-group">
			<label for="company-name-${experienceCount}">Company</label>
			<input type="text" id="company-name-${experienceCount}" name="company-name-${experienceCount}" placeholder="${randomCompany}">
		</div>
		<div class="form-group">
			<label for="job-position-${experienceCount}">Position</label>
			<input type="text" id="job-position-${experienceCount}" name="job-position-${experienceCount}" placeholder="${randomPosition}">
		</div>
		<div class="form-group">
			<label for="work-period-${experienceCount}">Period</label>
			<input type="text" id="work-period-${experienceCount}" name="work-period-${experienceCount}" placeholder="${timelinePlaceholder}">
		</div>
		<div class="form-group">
			<div class="text-with-btn">
				<label for="job-description-${experienceCount}">Description</label>
				<button class="ai-btn" onclick="openModal(event)" data-id="job-description-${experienceCount}">
					${starIcon}
				</button>
			</div>
			<textarea id="job-description-${experienceCount}" name="job-description-${experienceCount}" placeholder="Describe your experience"></textarea>
		</div>
	`;

	document.getElementById('experience-container').appendChild(newExperienceDiv);

	const companyNameInput = document.getElementById(`company-name-${experienceCount}`);
	if (companyNameInput) {
		companyNameInput.addEventListener('input', updateJobTitle);
	}
}

function updateJobTitle(event) {
	const input = event.target;
	const jobId = input.id.replace('company-name-', '');
	const titleElement = document.getElementById(`job-title-${jobId}`);
	titleElement.textContent = input.value.trim() || 'Job';
}

document.addEventListener('DOMContentLoaded', function() {
    const initialCompanyNameInput = document.getElementById('company-name-1');
    if (initialCompanyNameInput) {
        initialCompanyNameInput.addEventListener('input', updateJobTitle);
    }
});
