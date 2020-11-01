const getCacheVersion = () =>
  `api_${(() => {
    const DATE = new Date()
    const weekday = Math.floor(DATE.getDate() / 7)
    return weekday === 1 && DATE.getHours() < 10 ? weekday - 1 : weekday
  })()}`

const CACHE_NAME = 'cache_v3'

const API_URL =
  location.hostname === 'localhost'
    ? 'https://meals-data.muhun.kim/dev'
    : 'https://meals-data.muhun.kim'

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

const staticFiles = [
  '/',
  'manifest.json',
  'favicon.ico',
  'app.js',
  'main.js',
  'vendor.js'
]

let CacaheByAgent = []

const checkAgent = (name) => navigator.userAgent.indexOf(name) !== -1
if (checkAgent('Chrome/')) CacaheByAgent.push(...Chrome)
else if (!checkAgent('Firefox/')) CacaheByAgent.push(...Safari)

const fileToCache = [...staticFiles, ...CacaheByAgent]

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(fileToCache))
      .catch(evt => console.log(evt))
  )
  evt.waitUntil(
    caches
      .open(getCacheVersion())
      .then(cache => cache.addAll([API_URL]))
      .catch(evt => console.log(evt))
  )
})

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then(res => res || fetch(evt.request))
      .catch(err => console.log(err))
  )
})

self.addEventListener('activate', evt => {
  const cacheWhitelist = [CACHE_NAME, getCacheVersion()]
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
