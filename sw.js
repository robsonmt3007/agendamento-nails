const CACHE_NAME = 'nails-rita-v53';
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
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(assets)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((res) => res || fetch(event.request)));
});  
