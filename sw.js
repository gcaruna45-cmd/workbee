// WorkBee.lk Service Worker - PWA Offline Support
// Version: 1.0.0

const CACHE_NAME = 'workbee-v16';
const OFFLINE_PAGE = 'offline.html';

// Files to cache for offline use (relative paths for GitHub Pages compatibility)
const STATIC_ASSETS = [
  './',
  'index.html',
  'privacy-policy.html',
  'terms-of-service.html',
  'register-worker.html',
  'register-company.html',
  'login.html',
  'worker-dashboard.html',
  'company-dashboard.html',
  'admin.html',
  'offline.html',
  'manifest.json',
  'css/main.css',
  'css/components.css',
  'css/forms.css',
  'js/firebase-config.js',
  'js/auth.js',
  'js/admin.js',
  'js/forms.js',
  'js/main.js',
  'assets/logo.jpg',
  'assets/logo.png',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png'
];

// ---- INSTALL: Cache static assets ----
self.addEventListener('install', function(event) {
  console.log('[WorkBee SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[WorkBee SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' })));
    }).then(function() {
      console.log('[WorkBee SW] Install complete');
      return self.skipWaiting();
    }).catch(function(err) {
      console.log('[WorkBee SW] Cache failed (some assets may not exist yet):', err);
      return self.skipWaiting();
    })
  );
});

// ---- ACTIVATE: Clean old caches ----
self.addEventListener('activate', function(event) {
  console.log('[WorkBee SW] Activating...');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('[WorkBee SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      console.log('[WorkBee SW] Activated. Taking control...');
      return self.clients.claim();
    })
  );
});

// ---- FETCH: Network first, then cache fallback ----
self.addEventListener('fetch', function(event) {
  // Skip non-GET requests and chrome-extension requests
  if (event.request.method !== 'GET') return;
  if (event.request.url.startsWith('chrome-extension://')) return;
  if (event.request.url.includes('fonts.googleapis.com') ||
      event.request.url.includes('fonts.gstatic.com')) {
    // Cache Google Fonts
    event.respondWith(
      caches.open(CACHE_NAME + '-fonts').then(function(cache) {
        return cache.match(event.request).then(function(cached) {
          if (cached) return cached;
          return fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          }).catch(function() { return cached; });
        });
      })
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        // Cache successful responses
        if (response && response.status === 200) {
          var responseClone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(function() {
        // Network failed - serve from cache
        return caches.match(event.request).then(function(cached) {
          if (cached) return cached;
          // For navigation requests, show the index page
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html') || caches.match(OFFLINE_PAGE);
          }
          return new Response('Offline - No cached content available', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        });
      })
  );
});

// ---- PUSH NOTIFICATIONS (future use) ----
self.addEventListener('push', function(event) {
  var data = {};
  if (event.data) {
    try { data = event.data.json(); } catch(e) { data = { title: 'WorkBee', body: event.data.text() }; }
  }
  var options = {
    body: data.body || 'New update from WorkBee.lk',
    icon: 'assets/icons/icon-192.png',
    badge: 'assets/icons/icon-72.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: 'Open App' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'WorkBee.lk', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'dismiss') return;
  var url = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(clients.openWindow(url));
});

console.log('[WorkBee SW] Service Worker loaded!');
