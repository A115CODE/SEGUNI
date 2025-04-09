// service-worker.js
self.addEventListener('install', (e) => {
  console.log('Service Worker instalado');
});

self.addEventListener('fetch', () => {}); // No intercepta nada