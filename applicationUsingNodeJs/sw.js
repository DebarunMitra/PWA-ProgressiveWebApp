importScripts('./node_modules/workbox-sw/build/workbox-sw.js');

const staticAssets = [
  './',
  './js/app.js',
  './css/styles.css',
  './fallback.json',
  './images/fetch-dog.jpg'
];

const wb=new WorkboxSW();
wb.precache(staticAssets);

wb.router.registerRoute('https://newsapi.org/(.*)', wb.strategies.networkFirst());
wb.router.registerRoute(/.*\.(png|jpg|jpeg|gif)/,wb.strategies.cacheFirst({
  cacheName:'news-images',
  catchExpiration:{maxEntries:20, maxAgeSeconds:12*60*60},
  cacheableResponse:{statuses:[0, 200]}
}))
