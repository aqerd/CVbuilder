const modal = document.getElementById("my-modal");
const btn = document.getElementById("open-modal");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function (event) {
    event.preventDefault();
    modal.style.display = "block";
}

span.onclick = function () {
    event.preventDefault();
    modal.style.display = "none";
}

window.onclick = function (event) {
    event.preventDefault();
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
