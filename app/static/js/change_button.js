document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            if (button.classList.contains('current') || button.classList.contains('filetype')) {
                buttons.forEach(function(btn) {
                    btn.classList.remove('current');
                });
                button.classList.add('current');
            }

            const format = button.getAttribute('data-format');
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/set_format', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                }
            };
            xhr.send('format=' + encodeURIComponent(format));
        });
    });
});
