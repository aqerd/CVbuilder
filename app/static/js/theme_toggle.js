document.addEventListener("DOMContentLoaded", () => {
    const themeStylesheet = document.getElementById("theme-stylesheet");
    const themeButtons = document.querySelectorAll(".theme-toggle");
    const savedTheme = localStorage.getItem("theme") || "light";
    themeStylesheet.href = `/static/css/themes/${savedTheme}.css`;
    themeButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const selectedTheme = e.target.dataset.theme;
            themeStylesheet.href = `/static/css/themes/${selectedTheme}.css`;
            localStorage.setItem("theme", selectedTheme);
        });
    });
});
