// --- CONFIGURAÇÃO INICIAL ---
// Sempre que você mudar o código do index.html ou quiser forçar uma atualização,
// mude o número abaixo (ex: nails-v25 para nails-v26)
const CACHE_NAME = 'nails-v33';

// Lista de todos os arquivos que o app precisa para funcionar offline
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './plano_fundo.png',
  './d2fb736130b4a19276c01092cf78d24e.jpg',
  './maps.png',
  './waze.png'
];

// --- EVENTO DE INSTALAÇÃO ---
// Baixa todos os arquivos e salva no cache do celular
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache aberto: Salvando arquivos para funcionamento offline');
      return cache.addAll(ASSETS);
    })
  );
  // Força o Service Worker novo a se tornar o ativo imediatamente
  self.skipWaiting();
});

// --- EVENTO DE ATIVAÇÃO ---
// Limpa caches antigos de versões anteriores para não ocupar espaço
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Limpando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Garante que o app comece a ser controlado pelo novo SW sem precisar recarregar
  return self.clients.claim();
});

// --- EVENTO DE BUSCA (FETCH) ---
// Tenta carregar os arquivos do cache primeiro. Se não tiver internet, o app abre normal.
// Se tiver internet, ele busca as novidades no servidor.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna o arquivo do cache OU busca na rede
      return response || fetch(event.request);
    })
  );
});
