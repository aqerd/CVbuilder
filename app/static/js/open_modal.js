function openModal(event) {
    event.preventDefault();

    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal');
    modalDiv.innerHTML = `
        <div class="modal-content">
            <h2>Generate your description with AI</h2>
            <p>List your key highlights from your professional experience, like notable achievements, skills acquired, or the impact of your contributions</p>
            <textarea id="prompt" name="prompt" placeholder="Enter your prompt here"></textarea>
            <input type="hidden" name="csrf_token" value="{{ csrf_token() }}">
            <p>Powered by GroqCloud with Meta's Llama 3.3 70B Versatile</p>
            <button class="close-button">Close</button>
            <button class="generate">Generate</button>
        </div>
    `;

    document.body.appendChild(modalDiv);

    modalDiv.style.display = "block";

    const closeButton = modalDiv.querySelector('.close-button');
    closeButton.addEventListener('click', function() {
        closeModal(modalDiv);
    });
}

function closeModal(modalToClose) {
    modalToClose.style.display = "none";
}
