const CACHE_NAME = 'cvbuilder-cache-v2';
const ASSETS_TO_CACHE = [
    '/',
    '/offline.html',
    '/static/css/style.css',
    '/static/js/register_sw.js',
    '/static/js/service_worker.js',
    '/static/media/icon.png',
    '/static/js/add_new_button.js',    // Добавьте этот файл, если он используется
    '/static/fonts/IBMPlexMono-Regular.ttf',   // Добавьте пути к шрифтам
    '/static/fonts/IBMPlexMono-SemiBold.ttf',  // Добавьте пути к шрифтам
];

self.addEventListener('install', (event) => {
    console.log('Service Worker: Install event');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker: Caching assets');
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => {
            console.log('Service Worker: All assets cached');
        }).catch((error) => {
            console.error('Service Worker: Failed to cache assets', error);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activate event');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Old caches cleared');
        }).catch((error) => {
            console.error('Service Worker: Failed to clear old caches', error);
        })
    );
    console.log('Service Worker: Activated');
});

self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetch event for', event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                console.log('Service Worker: Serving from cache:', event.request.url);
                return response;
            }
            console.log('Service Worker: Fetching from network:', event.request.url);
            return fetch(event.request).catch(() => {
                console.log('Service Worker: Network error, returning offline page');
                if (event.request.mode === 'navigate') {
                    return caches.match('/offline.html');
                }
            });
        }).catch((error) => {
            console.error('Service Worker: Error in fetch handler:', error);
        })
    );
});
