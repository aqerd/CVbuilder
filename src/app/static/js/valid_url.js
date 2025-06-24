document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("input[type='url']").forEach(urlInput => {
        urlInput.addEventListener("blur", function () {
            let url = urlInput.value.trim();
            const domainPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,7}(?:\/.*)?$/;
            const ipPattern = /^(?:\d{1,3}\.){3}\d{1,3}$/;
            const localhostPattern = /^localhost(:\d+)?$/;

            if (!url) return;

            if (url.startsWith("http://") || url.startsWith("https://")) {
                return;
            }

            if (domainPattern.test(url) || ipPattern.test(url) || localhostPattern.test(url)) {
                urlInput.value = "http://" + url;
            } else {
                showAlert("Please enter a valid URL address");
            }
        });
    });
});
