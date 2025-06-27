// Service Worker for Trebound - Performance Optimization
const CACHE_NAME = 'trebound-v1.0.0';
const STATIC_CACHE_NAME = 'trebound-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'trebound-dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/hero.webp',
  '/images/trebound-favicon-32px.jpg',
  // Add other critical assets
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /^https:\/\/yrppmcoycmydrujbesnd\.supabase\.co\/rest\/v1\//,
];

// Images to cache
const IMAGE_CACHE_PATTERNS = [
  /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i,
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Skip waiting');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Cache installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME && 
                cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients
      self.clients.claim()
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!request.url.startsWith('http')) {
    return;
  }

  // Handle different types of requests with different strategies
  if (isStaticAsset(request.url)) {
    // Static assets: Cache First
    event.respondWith(cacheFirst(request, STATIC_CACHE_NAME));
  } else if (isApiRequest(request.url)) {
    // API requests: Network First with fallback
    event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME));
  } else if (isImageRequest(request.url)) {
    // Images: Cache First with network fallback
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE_NAME));
  } else if (isHTMLRequest(request)) {
    // HTML pages: Network First
    event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME));
  } else {
    // Everything else: Network First
    event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME));
  }
});

// Cache First Strategy
async function cacheFirst(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache First failed:', error);
    return new Response('Content not available offline', { status: 503 });
  }
}

// Network First Strategy
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Content not available', { status: 503 });
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });

  return cachedResponse || fetchPromise;
}

// Helper functions
function isStaticAsset(url) {
  return url.includes('/assets/') || 
         url.includes('/images/') || 
         url.includes('/fonts/') ||
         url.endsWith('.js') ||
         url.endsWith('.css') ||
         url.endsWith('.woff2') ||
         url.endsWith('.woff');
}

function isApiRequest(url) {
  return API_CACHE_PATTERNS.some(pattern => pattern.test(url));
}

function isImageRequest(url) {
  return IMAGE_CACHE_PATTERNS.some(pattern => pattern.test(url));
}

function isHTMLRequest(request) {
  return request.headers.get('Accept').includes('text/html');
}

// Background sync for failed requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  console.log('Service Worker: Background sync triggered');
  // Handle any background sync logic here
}

// Push notifications (if needed)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/images/trebound-favicon-32px.jpg',
    badge: '/images/trebound-favicon-32px.jpg',
    tag: 'trebound-notification',
    actions: [
      {
        action: 'view',
        title: 'View',
        icon: '/images/trebound-favicon-32px.jpg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Trebound', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PERFORMANCE_METRICS') {
    console.log('Service Worker: Performance metrics received:', event.data.metrics);
    // Send metrics to analytics if needed
  }
});

console.log('Service Worker: Script loaded successfully'); 