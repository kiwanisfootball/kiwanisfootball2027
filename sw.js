const CACHE_NAME = 'kfl-store-v5';
const urlsToCache = ['./', 'index.html', 'css/global.css', 'components.js'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(urlsToCache.map((url) => cache.add(url)))
    )
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== self.location.origin) return;

  // Primero red (versión nueva), y si no hay conexión, caché
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        if (response && response.ok) {
          const copia = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copia));
        }
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
