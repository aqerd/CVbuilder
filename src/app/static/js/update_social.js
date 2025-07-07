let socialCount = 1;

function getDomain(link) {
	try {
		const url = new URL(link);
		if (url.hostname && url.hostname.includes('.')) {
			return url.hostname;
		}
		return null;
	} catch (e) {
		return null;
	}
}

function addSocial(event) {
    event.preventDefault();

    const lastLinkInput = document.getElementById(`social-link-${socialCount}`);
    let link = lastLinkInput.value.trim();

    if (!link) {
		alert('Please fill in the link first');
		return;
	}

    if (!/^https?:\/\//i.test(link)) {
        link = 'https://' + link;
    }

	const domain = getDomain(link);
	if (!domain) {
		alert('Please enter a correct link format (e.g., google.com)');
		return;
	}
    lastLinkInput.value = link;
    lastLinkInput.setAttribute('readonly', true);

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
	document.getElementById(`social-link-${socialCount}`).focus();
}
