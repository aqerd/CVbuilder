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