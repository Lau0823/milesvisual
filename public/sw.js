const CACHE_NAME = 'milesvisual-media-v1';
const CLOUDINARY_HOST = 'res.cloudinary.com';

// Instalación: saltar espera para activar de inmediato
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // ESTRATEGIA PARA CLOUDINARY: Cache First (Cachear imágenes y videos de Cloudinary)
  if (url.host === CLOUDINARY_HOST) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          // Si está en cache, lo devolvemos
          if (response) return response;

          // Si no, lo descargamos y lo guardamos
          return fetch(event.request).then((networkResponse) => {
            // Solo guardamos si la respuesta es exitosa
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // ESTRATEGIA PARA ARCHIVOS LOCALES (JS, CSS, LOGOS): Stale-while-revalidate
  if (event.request.destination === 'script' || event.request.destination === 'style' || event.request.destination === 'image') {
    event.respondWith(
      caches.open('milesvisual-static').then((cache) => {
        return cache.match(event.request).then((response) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
          return response || fetchPromise;
        });
      })
    );
  }
});
