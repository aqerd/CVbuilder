if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/js/service_worker.js')
        .then(() => console.log('Service Worker is registered'))
        .catch((error) => console.error('Register error for Service Worker:', error));
}
