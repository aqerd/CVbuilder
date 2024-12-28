const CACHE_NAME = 'cvbuilder-cache-v1';
const ASSETS_TO_CACHE = [
    '/', // Кэшируем главную страницу
    '/offline.html', // Статический оффлайн-файл
    '/static/style.css',
    '/static/js/register_sw.js',
    '/static/js/service_worker.js',
    // Добавьте другие статические ресурсы по необходимости
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    console.log('Service Worker is activated');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }).catch(() => {
            // Возвращаем оффлайн-страницу только для навигационных запросов
            if (event.request.mode === 'navigate') {
                return caches.match('/offline.html');
            }
        })
    );
});
