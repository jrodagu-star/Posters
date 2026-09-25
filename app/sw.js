/* Service Worker — Dashboard Posters UCI
 * Network-first: al estar online siempre intenta traer la versión nueva.
 * Al desplegar, cambia CACHE_VERSION para invalidar cachés antiguas.
 */
const CACHE_VERSION = 'posters-v20260925a';
const SHELL_URLS = [
  './',
  './index.html',
  './styles.css?v=20260925a',
  './app.js?v=20260925a',
  './sw-register.js?v=20260925a',
  './manifest.webmanifest',
  '../biblioteca/biblioteca.js?v=20260925a'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(SHELL_URLS.map((url) => new Request(url, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith('posters-v') && key !== CACHE_VERSION)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Network-first: prioriza red para que la app instalada se actualice
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.ok && (response.type === 'basic' || response.type === 'cors')) {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy)).catch(() => {});
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (request.mode === 'navigate') {
          const shell = await caches.match('./index.html');
          if (shell) return shell;
        }
        return Response.error();
      })
  );
});
