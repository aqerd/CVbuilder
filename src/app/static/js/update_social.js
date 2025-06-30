let socialCount = 1;

function getDomain(link) {
	try {
		const domain = new URL(link).hostname;
		return domain;
	} catch (e) {
		return null;
	}
}

function addSocial(event) {
	event.preventDefault();
	
	const linkInput = document.getElementById('social-link-input');
	const link = linkInput.value.trim();
	
	if (!link) {
		showAlert('Please fill in the link first');
		return;
	}

	const domain = getDomain(link);
	if (!domain) {
		showAlert('Invalid link');
		return;
	}

	socialCount++;

	const newSocialDiv = document.createElement('div');
	newSocialDiv.classList.add('form-group');
	newSocialDiv.innerHTML = `
		<p id="no-margin-p">${domain}</p>
		<a href="${link}" target="_blank">${link}</a>
	`;
	
	document.getElementById('socials-container').appendChild(newSocialDiv);

	linkInput.value = '';
}
