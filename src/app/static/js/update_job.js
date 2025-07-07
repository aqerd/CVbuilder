let experienceCount = 1;

function addExperience(event) {
	event.preventDefault();
	experienceCount++;

	const newExperienceDiv = document.createElement('div');
	newExperienceDiv.classList.add('experience-item');
	newExperienceDiv.innerHTML = `
		<h2 id="job-title-${experienceCount}">Job</h2>
		<div class="form-group">
			<label for="company-name-${experienceCount}">Name</label>
			<input type="text" id="company-name-${experienceCount}" name="company-name-${experienceCount}" placeholder="Company">
		</div>
		<div class="form-group">
			<label for="job-position-${experienceCount}">Position</label>
			<input type="text" id="job-position-${experienceCount}" name="job-position-${experienceCount}" placeholder="Position">
		</div>
		<div class="form-group">
			<label for="work-period-${experienceCount}">Period</label>
			<input type="text" id="work-period-${experienceCount}" name="work-period-${experienceCount}" placeholder="Timeline">
		</div>
		<div class="form-group">
			<div class="text-with-btn">
				<label for="job-description-${experienceCount}">Description</label>
				<button class="ai-btn" onclick="openModal(event)" data-id="job-description-${experienceCount}">
					<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
						<style>.star { fill: var(--main-color); }</style>
						<path class="star" d="M16 13L17.9799 19.0201L24 21L17.9799 22.9799L16 29L14.0201 22.9799L8 21L14.0201 19.0201L16 13Z" fill="black"/>
						<path class="star" d="M24 22L24.9899 25.0101L28 26L24.9899 26.9899L24 30L23.0101 26.9899L20 26L23.0101 25.0101L24 22Z" fill="black"/>
						<path class="star" d="M25 10L26.2374 13.7626L30 15L26.2374 16.2374L25 20L23.7626 16.2374L20 15L23.7626 13.7626L25 10Z" fill="black"/>
					</svg>
				</button>
			</div>
			<textarea id="job-description-${experienceCount}" name="job-description-${experienceCount}" placeholder="Describe your job responsibilities"></textarea>
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

document.addEventListener('DOMContentLoaded', () => {
	const companyNameInput = document.getElementById('company-name-1');
	if (companyNameInput) {
		companyNameInput.addEventListener('input', updateJobTitle);
	}
	const addButton = document.querySelector('.add-button');
	if (addButton) {
		addButton.addEventListener('click', addExperience);
	}
});
