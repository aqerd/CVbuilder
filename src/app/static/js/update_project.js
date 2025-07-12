let projectCount = 1;

function addProject(event) {
	event.preventDefault();
	projectCount++;

	const exampleProjects = ['Wiki Parser', 'Telegram Chat Bot', 'Weather App', 'Todo List App', 'Personal Website', 'E-commerce Site', 'Blog Platform', 'URL Shortener'];
	const randomProject = exampleProjects[Math.floor(Math.random() * exampleProjects.length)];

	const currentYear = new Date().getFullYear();
	const minYear = 2010;
	const startYear = Math.floor(Math.random() * (currentYear - minYear + 1)) + minYear;
	const endYear = Math.floor(Math.random() * (currentYear - startYear + 1)) + startYear;
	const timelinePlaceholder = startYear === endYear ? `${startYear}` : `${startYear} - ${endYear}`;

	const tlds = ['com', 'net', 'org', 'io', 'dev', 'app', 'us', 'art', 'ai', 'tech'];
	const randomTld = tlds[Math.floor(Math.random() * tlds.length)];
	const projectUrl = `https://${randomProject.toLowerCase().replace(/\s+/g, '')}.${randomTld}`;

	const starIcon = document.getElementById('ai-icon-template')?.innerHTML.trim() || '';

	const newProjectDiv = document.createElement('div');
	newProjectDiv.classList.add('portfolio-item');
	newProjectDiv.innerHTML = `
		<h2 id="project-title-${projectCount}">Project</h2>
		<div class="form-group">
			<label for="project-name-${projectCount}">Name</label>
			<input type="text" id="project-name-${projectCount}" name="project-name-${projectCount}" placeholder="${randomProject}">
		</div>
		<div class="form-group">
			<label for="project-time-${projectCount}">Timeline</label>
			<input type="text" id="project-time-${projectCount}" name="project-time-${projectCount}" placeholder="${timelinePlaceholder}">
		</div>
		<div class="form-group">
			<label for="project-link-${projectCount}">Link</label>
			<input type="url" id="project-link-${projectCount}" name="project-link-${projectCount}" placeholder="${projectUrl}">
		</div>
		<div class="form-group">
			<div class="text-with-btn">
				<label for="project-description-${projectCount}">Description</label>
				<button class="ai-btn" onclick="openModal(event)" data-id="project-description-${projectCount}">
					${starIcon}
				</button>
			</div>
			<textarea id="project-description-${projectCount}" name="project-description-${projectCount}" placeholder="Tell something about this project"></textarea>
		</div>
	`;

	document.getElementById('portfolio-container').appendChild(newProjectDiv);

	const projectNameInput = document.getElementById(`project-name-${projectCount}`);
	if (projectNameInput) {
		projectNameInput.addEventListener('input', updateProjectTitle);
	}

	const projectLinkInput = document.getElementById(`project-link-${projectCount}`);
    if (projectLinkInput) {
        projectLinkInput.addEventListener('blur', validateAndFormatUrl);
    }
}

function updateProjectTitle(event) {
	const input = event.target;
	const projectId = input.id.replace('project-name-', '');
	const titleElement = document.getElementById(`project-title-${projectId}`);
	titleElement.textContent = input.value.trim() || 'Project';
}

function validateAndFormatUrl(event) {
    const input = event.target;
    const url = input.value.trim();
    if (url) {
        const formattedUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
        input.value = `https://${formattedUrl}`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const initialProjectNameInput = document.getElementById('project-name-1');
    if (initialProjectNameInput) {
        initialProjectNameInput.addEventListener('input', updateProjectTitle);
    }
});
