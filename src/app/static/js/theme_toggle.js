document.addEventListener("DOMContentLoaded", () => {
	let currentLink = document.getElementById("theme-stylesheet");
	const themeButtons = document.querySelectorAll(".theme-toggle");

	const swapTheme = (selectedTheme) => {
		if (!selectedTheme || selectedTheme === localStorage.getItem("theme")) return;

		const newLink = document.createElement("link");
		newLink.rel = "stylesheet";
		newLink.href = `/static/css/themes/${selectedTheme}.css`;

		newLink.onload = () => {
			if (currentLink && currentLink.parentNode) {
				currentLink.parentNode.removeChild(currentLink);
			}
			newLink.id = "theme-stylesheet";
			currentLink = newLink;
		};

		document.head.appendChild(newLink);
		localStorage.setItem("theme", selectedTheme);
	};

	themeButtons.forEach(button => {
		button.addEventListener("click", (e) => swapTheme(e.currentTarget.dataset.theme));
	});
});
