let projectCount = 1;

function addProject(event) {
	event.preventDefault();
	projectCount++;

	const newProjectDiv = document.createElement('div');
	newProjectDiv.classList.add('portfolio-item');
	newProjectDiv.innerHTML = `
		<h2 id="project-title-${projectCount}">Project</h2>
		<div class="form-group">
			<label for="project-name-${projectCount}">Name</label>
			<input type="text" id="project-name-${projectCount}" name="project-name-${projectCount}" placeholder="Project Title">
		</div>
		<div class="form-group">
			<label for="project-time-${projectCount}">Period</label>
			<input type="text" id="project-time-${projectCount}" name="project-time-${projectCount}" placeholder="Timeline">
		</div>
		<div class="form-group">
			<label for="project-link-${projectCount}">Link</label>
			<input type="url" id="project-link-${projectCount}" name="project-link-${projectCount}" placeholder="https://cvbuilder.art">
		</div>
		<div class="form-group">
			<div class="text-with-btn">
				<label for="project-description-${projectCount}">Description</label>
				<button class="ai-btn" onclick="openModal(event)" data-id="project-description-${projectCount}">
					<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
						<style>.star { fill: var(--main-color); }</style>
						<path class="star" d="M16 13L17.9799 19.0201L24 21L17.9799 22.9799L16 29L14.0201 22.9799L8 21L14.0201 19.0201L16 13Z" fill="black"/>
						<path class="star" d="M24 22L24.9899 25.0101L28 26L24.9899 26.9899L24 30L23.0101 26.9899L20 26L23.0101 25.0101L24 22Z" fill="black"/>
						<path class="star" d="M25 10L26.2374 13.7626L30 15L26.2374 16.2374L25 20L23.7626 16.2374L20 15L23.7626 13.7626L25 10Z" fill="black"/>
					</svg>
				</button>
			</div>
			<textarea id="project-description-${projectCount}" name="project-description-${projectCount}" placeholder="Describe the project"></textarea>
		</div>
	`;

	document.getElementById('portfolio-container').appendChild(newProjectDiv);

	const projectNameInput = document.getElementById(`project-name-${projectCount}`);
	if (projectNameInput) {
		projectNameInput.addEventListener('input', updateProjectTitle);
	}
}

function updateProjectTitle(event) {
	const input = event.target;
	const projectId = input.id.replace('project-name-', '');
	const titleElement = document.getElementById(`project-title-${projectId}`);
	titleElement.textContent = input.value.trim() || 'Project';
}

document.addEventListener('DOMContentLoaded', () => {
	const projectNameInput = document.getElementById('project-name-1');
	if (projectNameInput) {
		projectNameInput.addEventListener('input', updateProjectTitle);
	}

	const addButton = document.querySelector('.add-button');
	if (addButton) {
		addButton.addEventListener('click', addProject);
	}
});
