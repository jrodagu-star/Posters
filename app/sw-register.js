(function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  const RELOAD_FLAG = 'posters_sw_reloading';

  function askUpdate(registration) {
    if (!registration || !registration.waiting) return;
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  }

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (sessionStorage.getItem(RELOAD_FLAG) === '1') return;
    sessionStorage.setItem(RELOAD_FLAG, '1');
    location.reload();
  });

  window.addEventListener('load', () => {
    sessionStorage.removeItem(RELOAD_FLAG);
    navigator.serviceWorker.register('./sw.js', { scope: './' })
      .then((registration) => {
        registration.update().catch(() => {});

        if (registration.waiting) askUpdate(registration);

        registration.addEventListener('updatefound', () => {
          const installing = registration.installing;
          if (!installing) return;
          installing.addEventListener('statechange', () => {
            if (installing.state === 'installed' && navigator.serviceWorker.controller) {
              askUpdate(registration);
            }
          });
        });

        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            registration.update().catch(() => {});
          }
        });

        window.addEventListener('focus', () => {
          registration.update().catch(() => {});
        });

        // Revisión periódica por si la app instalada queda abierta mucho tiempo
        setInterval(() => {
          registration.update().catch(() => {});
        }, 30 * 60 * 1000);
      })
      .catch((err) => {
        console.warn('Service Worker no registrado:', err);
      });
  });
})();
