function showAlert(message) {
	const existingAlert = document.querySelector('.custom-alert');
	if (existingAlert) {
		existingAlert.remove();
	}

	const alertDiv = document.createElement('div');
	alertDiv.classList.add('custom-alert');

	const messageDiv = document.createElement('p');
	messageDiv.textContent = message;

	const closeButton = document.createElement('button');
	closeButton.textContent = "Close";
	closeButton.classList.add('close-alert');
	closeButton.addEventListener('click', function () {
		alertDiv.remove();
	});

	alertDiv.appendChild(messageDiv);
	alertDiv.appendChild(closeButton);
	document.body.appendChild(alertDiv);

	setTimeout(() => {
		if (alertDiv) {
			alertDiv.remove();
		}
	}, 8000);
}
