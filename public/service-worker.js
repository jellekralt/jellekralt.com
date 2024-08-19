// public/service-worker.js

self.addEventListener('install', (event) => {
  console.log('Service Worker: Install');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activate');
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Fetching', event.request.url);
  event.respondWith(fetch(event.request));
});