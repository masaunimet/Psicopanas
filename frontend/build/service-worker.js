importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js");

workbox.setConfig({debug: false});

// workbox.routing.registerRoute(
//     ({ request }) => request.mode === 'navigate',
//     new workbox.strategies.NetworkFirst()
// );

// workbox.routing.registerRoute(
//     ({ request }) => 
//     request.destination === 'style' || request.destination === 'script' ||request.destination === 'worker',
//     new workbox.strategies.StaleWhileRevalidate()
// );

workbox.routing.registerRoute(
    ({request})=>request.destination ==='image',
    new workbox.strategies.CacheFirst()
);