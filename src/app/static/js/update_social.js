let socialCount = 0;

function getDomain(link) {
	try {
		const url = new URL(link);
		if (url.hostname && url.hostname.includes('.')) {
			return url.hostname.replace(/^www\./, '');
		}
		return null;
	} catch (e) {
		return null;
	}
}

function updateLabel(input) {
    let link = input.value.trim();
    const label = document.querySelector(`label[for="${input.id}"]`);

    if (!link) {
        if (label) label.textContent = 'Link';
        return;
    }

    if (!/^https?:\/\//i.test(link)) {
        link = 'https://' + link;
        input.value = link;
    }

    const domain = getDomain(link);
    if (domain) {
        if (label) label.textContent = domain;
    } else {
        if (label) label.textContent = 'Invalid Link';
    }
}

function addSocial(event) {
    event.preventDefault();
    socialCount++;

    const newSocialDiv = document.createElement('div');
    newSocialDiv.classList.add('social-item');

    newSocialDiv.innerHTML = `
        <div class="form-group">
            <label for="social-link-${socialCount}">Link</label>
            <input type="url" id="social-link-${socialCount}" name="social-link-${socialCount}" placeholder="https://another-link.com">
        </div>
    `;

    document.getElementById('socials-container').appendChild(newSocialDiv);
    const newLinkInput = document.getElementById(`social-link-${socialCount}`);
    newLinkInput.addEventListener('blur', (e) => updateLabel(e.target));
    newLinkInput.addEventListener('keydown', handleEnterKey);
    newLinkInput.focus();
}

function handleEnterKey(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        event.target.blur();

        const allInputs = Array.from(document.querySelectorAll('#socials-container input[type="url"]'));
        const lastInput = allInputs[allInputs.length - 1];

        if (event.target === lastInput && event.target.value.trim() !== '') {
            const domain = getDomain(event.target.value);
            if (domain) {
                document.getElementById('add-social-button').click();
            } else {
                showAlert('Please enter a correct link format');
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('socials-container');
    const inputs = container.querySelectorAll('input[type="url"]');

    let maxId = 0;
    inputs.forEach(input => {
        const currentId = parseInt(input.id.split('-').pop());
        if (currentId > maxId) {
            maxId = currentId;
        }
        updateLabel(input);
        input.addEventListener('blur', (e) => updateLabel(e.target));
        input.addEventListener('keydown', handleEnterKey);
    });
    socialCount = maxId || 0;

    if (inputs.length === 0) {
        addSocial(new Event('manual-init'));
    }
});
