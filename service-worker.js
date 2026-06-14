// Minimal service worker — enables PWA install but does NOT cache responses.
// The app is online-only (per user preference: "I don't want it offline. I want it to be able to sync").
// Installing this SW is what makes "Add to Home Screen" work properly on Android/Chrome.

self.addEventListener("install", (event) => {
  // Take over immediately on new versions
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Pass-through: always go to network. No offline caching.
  // (Browsers may still show "no internet" if offline — that's intentional.)
  event.respondWith(fetch(event.request).catch(() => new Response("Offline", { status: 503 })));
});
