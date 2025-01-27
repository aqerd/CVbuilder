let languageCount = 1;
let socialCount = 1;

function addSocial(event) {
    event.preventDefault();
    socialCount++;
    const newSocialDiv = document.createElement('div');
    newSocialDiv.classList.add('social-item');
    newSocialDiv.innerHTML = `
        <div class="form-group">
            <label for="social-service-${socialCount}">Service</label>
            <input type="text" id="social-service-${socialCount}" name="social-service-${socialCount}" placeholder="Service">
        </div>
        <div class="form-group">
            <label for="social-link-${socialCount}">Link</label>
            <input type="url" id="social-link-${socialCount}" name="social-link-${socialCount}" placeholder="https://example.com/you">
        </div>
    `;
    document.getElementById('socials-container').appendChild(newSocialDiv);
}

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
