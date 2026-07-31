const CACHE_NAME = "jeu-lettres-cache-v7";
const ASSETS = [
  "./",
  "index.html",
  "manifest.json",
  "img/icon-192.png",
  "img/icon-512.png",
  "Image/avion.png",
  "Image/ballon.png",
  "Image/chat.png",
  "Image/dauphin.png",
  "Image/elephant.png",
  "Image/fleur.png",
  "Image/guitare.png",
  "Image/herisson.png",
  "Image/igloo.png",
  "Image/jaguar.png",
  "Image/koala.png",
  "Image/lapin.png",
  "Image/maison.png",
  "Image/nez.png",
  "Image/orange.png",
  "Image/poisson.png",
  "Image/quille.png",
  "Image/robot.png",
  "Image/soleil.png",
  "Image/tortue.png",
  "Image/urne.png",
  "Image/voiture.png",
  "Image/wagon.png",
  "Image/xylophone.png",
  "Image/yaourt.png",
  "Image/zebre.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
