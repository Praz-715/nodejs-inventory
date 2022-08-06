let CACHE_NAME = 'inventory-pwa-cache-v1';
let urlsToCache = [
  // '/',
  // '/master/satuanbarang',
  // '/public/sbadmin/vendor/fontawesome-free/css/all.min.css',
  // '/public/sbadmin/vendor/fontawesome-free/svgs/solid/store.svg',
  // '/public/sbadmin/css/sb-admin-2.css',
  // '/public/sbadmin/vendor/jquery/jquery.min.js',
  // '/public/sbadmin/vendor/bootstrap/js/bootstrap.bundle.min.js',
  // '/public/sbadmin/vendor/jquery-easing/jquery.easing.min.js',
  // '/public/sbadmin/js/sb-admin-2.js',
  // '/public/main/main.js',
];

console.log('di service worker')

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('in install serviceworker... cache openend!')
      return cache.addAll(urlsToCache);
    })
  )

});

self.addEventListener('activate', function (event) {

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName != CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      )
    })
  )
})


self.addEventListener('fetch', function (event) {
  // NORMAL FETCH
  // event.respondWith(
  //   caches.match(event.request).then(function (response) {
  //     if (response) {
  //       return response;
  //     }
  //     return fetch(event.request);
  //   })
  // )

  // CACHE THEN NETWORK

  const request = event.request
  let url = new URL(request.url)

  //pisahkan request API dan internal
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then((response) => response || fetch(request))
    );
  } else {
    event.respondWith(
      caches.open('products-cache').then(function (cache) {
        return fetch(request).then(function (liveResponse) {
          cache.put(request, liveResponse.clone())
          return liveResponse;
        }).catch(function () {
          return caches.match(request).then(function (response) {
            if (response) return response
            return caches.match('/fallback.json')
          })
        })
      })
    );
  }


})

// self.addEventListener('fetch', event => {
//   console.log('Fetch event for ', event.request.url);
//   event.respondWith(
//     caches.match(event.request)
//     .then(response => {
//       if (response) {
//         console.log('Found ', event.request.url, ' in cache');
//         return response;
//       }
//       console.log('Network request for ', event.request.url);
//       return fetch(event.request)

//       // TODO 4 - Add fetched files to the cache

//     }).catch(error => {

//       // TODO 6 - Respond with custom offline page

//     })
//   );
// });
