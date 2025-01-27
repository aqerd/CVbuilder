let selectedTextareaId = null;

function openModal(event) {
    event.preventDefault();

    // Получаем id выбранного textarea
    selectedTextareaId = event.target.getAttribute('data-id');

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
            <button class="insert">Insert</button>
        </div>
    `;
    document.body.appendChild(modalDiv);
    modalDiv.style.display = "block";

    const closeButton = modalDiv.querySelector('.close-button');
    closeButton.addEventListener('click', function() {
        closeModal(modalDiv);
    });

    const generateButton = modalDiv.querySelector('.generate');
    generateButton.addEventListener('click', function() {
        generateDescription(modalDiv);
    });

    const insertButton = modalDiv.querySelector('.insert');
    insertButton.addEventListener('click', function() {
        insertDescription();
    });
}

function closeModal(modalToClose) {
    modalToClose.style.display = "none";
}

function generateDescription(modalDiv) {
    const prompt = modalDiv.querySelector('#prompt').value;

    if (!prompt) {
        alert("Please enter a prompt.");
        return;
    }

    // Отправка запроса на сервер для генерации описания
    $.ajax({
        url: '/profile',  // Отправляем запрос на тот же маршрут
        type: 'POST',
        data: {
            action: 'generate_description',
            prompt: prompt,
            csrf_token: $("input[name='csrf_token']").val()
        },
        success: function(response) {
            // Вставляем сгенерированный текст в модальное окно
            modalDiv.querySelector('#prompt').value = response.description;
        },
        error: function() {
            alert("Error generating description.");
        }
    });
}

function insertDescription() {
    const generatedText = document.querySelector('#prompt').value;

    if (generatedText && selectedTextareaId) {
        // Вставляем сгенерированный текст в выбранный textarea по id
        document.querySelector(`#${selectedTextareaId}`).value = generatedText;

        // Закрываем модальное окно
        closeModal(document.querySelector('.modal'));
    } else {
        alert("No generated description to insert.");
    }
}
