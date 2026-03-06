const CACHE_NAME = 'nails-v2'; // Mude a versão (v2, v3...) sempre que fizer uma grande alteração

self.addEventListener('install', (e) => {
  self.skipWaiting(); // Força o novo Service Worker a se tornar ativo imediatamente
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key); // Remove versões antigas do app
        }
      }));
    })
  );
  return self.clients.claim(); // Assume o controle das páginas imediatamente
});

self.addEventListener('fetch', (e) => {
  // Estratégia: Tenta rede primeiro, se falhar (offline), usa o cache
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
