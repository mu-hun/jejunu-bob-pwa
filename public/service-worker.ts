/// <reference path="../src/@types/service-worker" />
// Hack: Import type for editor

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

let cacheByAgent = []

const checkAgent = (name: string) => navigator.userAgent.indexOf(name) !== -1
if (checkAgent('Chrome/')) cacheByAgent.push(...Chrome)
else if (!checkAgent('Firefox/')) cacheByAgent.push(...Safari)

const fileToCache = [...staticFiles, ...cacheByAgent]

self.addEventListener('install', evt => {
  evt.waitUntil(
    Promise.all([
      addCache(CACHE_NAME, fileToCache),
      addCache(getCacheVersion(), API_URL)
    ])
  )
})

self.addEventListener('fetch', evt => {
  if (evt.request.url === API_URL) {
    const currentAPI = getCacheVersion()
    const cacheWhitelist = [CACHE_NAME, currentAPI]

    evt.waitUntil(
      caches.has(currentAPI).then(cache => {
        if (!cache) {
          return Promise.all([
            addCache(currentAPI, API_URL),
            cleanOldCache(cacheWhitelist)
          ])
        }
      })
    )
  }

  evt.respondWith(
    caches.match(evt.request).then(res => res || fetch(evt.request))
  )
})

self.addEventListener('activate', evt => {
  const cacheWhitelist = [CACHE_NAME, getCacheVersion()]
  evt.waitUntil(cleanOldCache(cacheWhitelist))
})

function addCache(name: string, URL: string | string[]) {
  return caches
    .open(name)
    .then(cache =>
      typeof URL === 'string' ? cache.add(URL) : cache.addAll(URL)
    )
}

async function cleanOldCache(cacheWhitelist: string[]) {
  const names = await caches.keys()

  return Promise.all(
    names.map(name => {
      if (!cacheWhitelist.includes(name)) return caches.delete(name)
    })
  )
}
