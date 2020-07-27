const cacheName = "world-of-cats-v1";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        "/",
        "/main.css",
        "/main.js",
        "images/cat-1.webp",
        "images/cat-2.webp",
        "images/cat-3.webp",
        "images/cat-4.webp",
        "images/cat-5.webp",
        "images/cat-6.webp",
        "images/cat-7.webp",
        "images/cat-8.webp",
        "images/cat-9.webp",
        "images/cat-10.webp",
        "images/cat-11.webp",
        "images/cat-12.webp"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  const requestURL = new URL(event.request.url);

  if (requestURL.hostname === "cat-fact.herokuapp.com") {
    event.respondWith(
      caches.open(cacheName)
        .then(cache => {
          return cache.match(event.request)
            .then(response => {
              return response || fetch(event.request)
                .then(response => {
                  cache.put(event.request, response.clone());
                  return response;
                })
            })
        })
    );
    
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});