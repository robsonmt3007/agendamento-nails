const CACHE_NAME = 'nails-rita-v40';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './plano_fundo.png',
  './maps.png',
  './waze.png',
  './d2fb736130b4a19276c01092cf78d24e.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting(); // Força a atualização imediata
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim(); // Garante que o SW controle a página imediatamente
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
