const CACHE_STATIC_NAME = 'static-v5';
const CACHE_DYNAMIC_NAME = 'dynamic-v5';

self.addEventListener('install', function(event) {
    console.log('Service worker installing', event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then(cache => {
                console.log('[Service Worker] Precaching Static Data');
                return cache.addAll([
                    '/',
                    '/index.html',
                    '/manifest.json',
                    '/dist/assets/screenshot.png',
                    '/dist/main.bundle.js',
                    '/dist/assets/144.png',
                ]);
            })
    );
});

self.addEventListener('activate', function(event) {
    console.log('Service worker activating', event);
    event.waitUntil(
        caches.keys()
            .then(keyList => {
                return Promise.all(keyList.map(key => {
                    if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
                        console.log('[Service Worker] Removing old cache', key);
                        return caches.delete(key);
                    }
                }));
            })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    console.log('Service worker fetching', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                } else {
                    return fetch(event.request)
                        .then(fetchResponse => {
                            return caches.open(CACHE_DYNAMIC_NAME)
                                .then(cache => {
                                    cache.put(event.request.url, fetchResponse.clone());
                                    return fetchResponse;
                                });
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            })
    );
});
