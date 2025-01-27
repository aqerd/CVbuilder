let projectCount = 1;
let experienceCount = 1;
let educationCount = 1;
let languageCount = 1;
let socialCount = 1;

// Добавление новой социальной сети
function addSocial(event) {
    event.preventDefault();
    socialCount++;
    const newSocialDiv = document.createElement('div');
    newSocialDiv.classList.add('social-item');
    newSocialDiv.innerHTML = `
        <div class="form-group">
            <label for="social-service-${socialCount}">Service</label>
            <input type="text" id="social-service-${socialCount}" name="social-service-${socialCount}" placeholder="Service Name">
        </div>
        <div class="form-group">
            <label for="social-link-${socialCount}">Link</label>
            <input type="url" id="social-link-${socialCount}" name="social-link-${socialCount}" placeholder="https://example.com/you">
        </div>
    `;
    document.getElementById('socials-container').appendChild(newSocialDiv);
}

// Добавление нового проекта
function addProject(event) {
    event.preventDefault();
    projectCount++;
    const newProjectDiv = document.createElement('div');
    newProjectDiv.classList.add('portfolio-item');
    newProjectDiv.innerHTML = `
        <div class="form-group">
            <label for="project-name-${projectCount}">Project Name</label>
            <input type="text" id="project-name-${projectCount}" name="project-name-${projectCount}" placeholder="Project Title">
        </div>
        <div class="form-group">
            <label for="project-time-${projectCount}">Project Time</label>
            <input type="text" id="project-time-${projectCount}" name="project-time-${projectCount}" placeholder="From - To">
        </div>
        <div class="form-group">
            <label for="project-link-${projectCount}">Project Link</label>
            <input type="url" id="project-link-${projectCount}" name="project-link-${projectCount}" placeholder="https://example.com">
        </div>
        <div class="form-group">
            <div class="text-with-btn">
                <label for="project-description-${projectCount}">Project Description</label>
                <button class="ai-btn" onclick="openModal(event)" data-id="project-description-${projectCount}">AI</button>
            </div>
            <textarea id="project-description-${projectCount}" name="project-description-${projectCount}" placeholder="Describe the project"></textarea>
        </div>
    `;
    document.getElementById('portfolio-container').appendChild(newProjectDiv);
}

// Добавление нового опыта работы
function addExperience(event) {
    event.preventDefault();
    experienceCount++;
    const newExperienceDiv = document.createElement('div');
    newExperienceDiv.classList.add('experience-item');
    newExperienceDiv.innerHTML = `
        <div class="form-group">
            <label for="company-name-${experienceCount}">Company Name</label>
            <input type="text" id="company-name-${experienceCount}" name="company-name-${experienceCount}" placeholder="Company Name">
        </div>
        <div class="form-group">
            <label for="job-title-${experienceCount}">Job Title</label>
            <input type="text" id="job-title-${experienceCount}" name="job-title-${experienceCount}" placeholder="Job Title">
        </div>
        <div class="form-group">
            <label for="work-period-${experienceCount}">Work Period</label>
            <input type="text" id="work-period-${experienceCount}" name="work-period-${experienceCount}" placeholder="From - To">
        </div>
        <div class="form-group">
            <div class="text-with-btn">
                <label for="job-description-${experienceCount}">Job Description</label>
                <button class="ai-btn" onclick="openModal(event)" data-id="job-description-${projectCount}">AI</button>
            </div>
            <textarea id="job-description-${experienceCount}" name="job-description-${experienceCount}" placeholder="Describe your job responsibilities"></textarea>
        </div>
    `;
    document.getElementById('experience-container').appendChild(newExperienceDiv);
}

// Добавление нового образования
function addEducation(event) {
    event.preventDefault();
    educationCount++;
    const newEducationDiv = document.createElement('div');
    newEducationDiv.classList.add('education-item');
    newEducationDiv.innerHTML = `
        <div class="form-group">
            <label for="institution-name-${educationCount}">Institution Name</label>
            <input type="text" id="institution-name-${educationCount}" name="institution-name-${educationCount}" placeholder="University Name">
        </div>
        <div class="form-group">
            <label for="education-period-${educationCount}">Study Period</label>
            <input type="text" id="education-period-${educationCount}" name="education-period-${educationCount}" placeholder="From - To">
        </div>
        <div class="form-group">
            <label for="field-of-study-${educationCount}">Field of Study</label>
            <input type="text" id="field-of-study-${educationCount}" name="field-of-study-${educationCount}" placeholder="Field of Study">
        </div>
    `;
    document.getElementById('education-container').appendChild(newEducationDiv);
}

// Добавление нового языка
function addLanguage(event) {
    event.preventDefault();
    languageCount++;
    const newLanguageDiv = document.createElement('div');
    newLanguageDiv.classList.add('language-item');
    newLanguageDiv.innerHTML = `
        <div class="form-group">
            <label for="language-name-${languageCount}">Language Name</label>
            <input type="text" id="language-name-${languageCount}" name="language-name-${languageCount}" placeholder="Language">
        </div>
        <div class="form-group">
            <label for="language-level-${languageCount}">Language Level</label>
            <select id="language-level-${languageCount}" name="language-level-${languageCount}">
                <option value="beginner">Beginner</option>
                <option value="elementary">Elementary</option>
                <option value="intermediate">Intermediate</option>
                <option value="upper-intermediate">Upper Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="fluent">Fluent</option>
            </select>
        </div>
    `;
    document.getElementById('languages-container').appendChild(newLanguageDiv);
}
