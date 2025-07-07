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
					<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path class="star" d="M16 13L17.9799 19.0201L24 21L17.9799 22.9799L16 29L14.0201 22.9799L8 21L14.0201 19.0201L16 13Z" fill="black"/>
						<path class="star" d="M24 22L24.9899 25.0101L28 26L24.9899 26.9899L24 30L23.0101 26.9899L20 26L23.0101 25.0101L24 22Z" fill="black"/>
						<path class="star" d="M25 10L26.2374 13.7626L30 15L26.2374 16.2374L25 20L23.7626 16.2374L20 15L23.7626 13.7626L25 10Z" fill="black"/>
					</svg>
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
