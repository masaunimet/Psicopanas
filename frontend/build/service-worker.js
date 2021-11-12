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

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// Catch routing errors, like if the user is offline
workbox.routing.setCatchHandler(async ({ event }) => {
  // Return the precached offline page if a document is being requested
  if (event.request.destination === 'document') {
    return matchPrecache('/offline.html');
  }

  return Response.error();
});