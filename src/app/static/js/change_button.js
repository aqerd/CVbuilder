document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.filetype');
    const downloadBtn = document.getElementById('downloadBtn');
    const emailBtn = document.getElementById('emailBtn');
    const csrfToken = document.querySelector('input[name="csrf_token"]').value;
    let selectedFormat = null;

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            buttons.forEach(function(btn) {
                btn.classList.remove('current');
            });
            button.classList.add('current');

            selectedFormat = button.getAttribute('data-format');
            console.log('Chosen format:', selectedFormat);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/set_format', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('X-CSRF-Token', csrfToken);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                }
            };
            xhr.send('format=' + encodeURIComponent(selectedFormat));
        });
    });

    downloadBtn.addEventListener('click', function() {
        if (!selectedFormat) {
            showAlert('First select the format');
        } else {
            window.location.href = '/download';
        }
    });

    emailBtn.addEventListener('click', function() {
        if (!selectedFormat) {
            showAlert('First select the format');
        } else {
            window.location.href = '/email';
        }
    });
});