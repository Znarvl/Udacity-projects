let restCache = "restaurantCashe-v2";

self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(restCache).then(function(cache) {
        return cache.addAll(
          [
            './',
            './css/styles.css',
            './data/restaurants.json',
            './img/1.jpg',
            './img/2.jpg',
            './img/3.jpg',
            './img/4.jpg',
            './img/5.jpg',
            './img/6.jpg',
            './img/7.jpg',
            './img/8.jpg',
            './img/9.jpg',
            './img/10.jpg',
            './js/dbhelper.js',
            './js/main.js',
            './js/restaurant_info.js',
            './sw.js',
            'index.html',
            'restaurant.html'
          ]
        );
      })
    );
  });


//Fetching offline cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        let fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            if(!response || response.status !== 200) {
              return response;
            }
            let respondToCache = response.clone();

            caches.open(restCache)
              .then(function(cache) {
                cache.put(event.request, respondToCache);
              });

            return response;
          }
        );
      })
    );
});
// remove old, update to new cache
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName != restCache;
        }).map(function(cacheName) {
          return cache.delete(cacheName);
        })
      );
    })
  );
});
