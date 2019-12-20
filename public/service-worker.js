importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
)

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`)

  workbox.routing.registerRoute(
    /\.js$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'css-cache'
    })
  )

  workbox.routing.registerRoute(
    /\.css$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'css-cache'
    })
  )
} else {
  console.log(`Boo! Workbox didn't load 😬`)
}

const CACHE_API = () =>
  `api_${(() => {
    const DATE = new Date()
    const weekday = Math.floor(DATE.getDate() / 7)
    return weekday === 1 && DATE.getHours() < 10 ? weekday - 1 : weekday
  })()}`
const CACHE_NAME = 'cache_v3'

const checkAgent = name => navigator.userAgent.indexOf(name) !== -1

const API_URL =
  location.hostname === 'meals.muhun.dev'
    ? 'https://meals-data.muhun.kim'
    : 'https://meals-data.muhun.kim/dev'

const Chrome = [
  'icons/android-chrome-192x192.png',
  'icons/android-chrome-512x512.png'
]

const Safari = [
  'icons/apple-touch-icon-60x60.png',
  'icons/apple-touch-icon-120x120.png',
  'icons/apple-touch-icon-152x152.png',
  'icons/apple-touch-icon-180x180.png',
  'icons/apple-touch-icon.png'
]

let CacaheByAgent = []

if (checkAgent('Chrome/')) CacaheByAgent.push(...Chrome)
else if (!checkAgent('Firefox/')) CacaheByAgent.push(...Safari)

const fileToCache = ['/', 'manifest.json', 'favicon.ico', ...CacaheByAgent]

self.addEventListener('install', evt => {
  console.log('install', evt)
  evt.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(fileToCache))
      .catch(evt => console.log(evt))
  )
  evt.waitUntil(
    caches
      .open(CACHE_API())
      .then(cache => cache.addAll([API_URL]))
      .catch(evt => console.log(evt))
  )
})

self.addEventListener('fetch', evt => {
  console.log('[sw.js]', evt.request)
  evt.respondWith(
    caches
      .match(evt.request)
      .then(res => res || fetch(evt.request))
      .catch(err => console.log(err))
  )
})

self.addEventListener('activate', evt => {
  const cacheWhitelist = [CACHE_NAME, CACHE_API()]
  evt.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names.map(name => {
          if (cacheWhitelist.indexOf(name) === -1) return caches.delete(name)
        })
      ).catch(err => console.log(err))
    )
  )
})
