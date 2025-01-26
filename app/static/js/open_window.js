const modal = document.getElementById("my-modal");
const btns = document.querySelectorAll("#open-modal");  // Все кнопки с id "open-modal"
const closeButtons = document.getElementsByClassName("close");

btns.forEach(function(btn) {
    btn.onclick = function (event) {
        event.preventDefault();
        modal.style.display = "block";
    };
});

for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function () {
        modal.style.display = "none";
    };
}

window.onclick = function (event) {
    event.preventDefault();
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
