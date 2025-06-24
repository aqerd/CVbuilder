document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll("input[type='email']").forEach(emailInput => {
		emailInput.addEventListener("blur", function () {
			let email = emailInput.value.trim();
			const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			if (!email) return;
			if (!emailPattern.test(email)) {
				showAlert("Please enter a valid email address");
			}
		});
	});
});
