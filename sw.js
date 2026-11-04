const V = 'shell-4afb886829', FV = 'fonts-cef9b47e', SHELL = ["./", "index.html", "app.js", "clipper.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "ui-fonts/barlow-400-normal.woff2", "ui-fonts/barlow-500-normal.woff2", "ui-fonts/barlow-600-normal.woff2", "ui-fonts/barlow-condensed-500-normal.woff2", "ui-fonts/barlow-condensed-600-normal.woff2", "ui-fonts/ibm-plex-mono-400-normal.woff2", "ui-fonts/ibm-plex-mono-500-normal.woff2"];
self.addEventListener('install', e => e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V && k !== FV).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url); if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  if (/\/(fonts|icons-font)\//.test(u.pathname)) { e.respondWith(caches.open(FV).then(async c => (await c.match(e.request)) || fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; }))); return; }
  e.respondWith(caches.match(e.request, {ignoreSearch:true}).then(r => r || fetch(e.request)).catch(() => caches.match('index.html')));
});
