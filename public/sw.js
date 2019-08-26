const CACHE_API = () =>
    `api_${(() => {
        const DATE = new Date()
        const weekday = Math.floor(DATE.getDate() / 7)
        return weekday === 1 && DATE.getHours() < 10 ? weekday - 1 : weekday
    })()}`
// TODO: dynamic versioning
const CACHE_NAME = 'beta_v1'

const checkAgent = name => navigator.userAgent.indexOf(name) !== -1

const API_URL =
    location.hostname === 'meals.muhun.dev'
        ? 'https://meals-data.muhun.kim'
        : 'https://meals-data.muhun.kim/dev'

const Chrome = [
    'img/icons/android-chrome-192x192.png',
    'img/icons/android-chrome-512x512.png'
]

const Safari = [
    'img/icons/apple-touch-icon-60x60.png',
    'img/icons/apple-touch-icon-120x120.png',
    'img/icons/apple-touch-icon-152x152.png',
    'img/icons/apple-touch-icon-180x180.png',
    'img/icons/apple-touch-icon.png'
]

let CacaheByAgent = []

if (checkAgent('Chrome/')) CacaheByAgent.push(...Chrome)
else if (!checkAgent('Firefox/')) CacaheByAgent.push(...Safari)

const fileToCache = [
    '/',
    'manifest.json',
    'https://fonts.googleapis.com/css?family=Material+Icons',
    'main.js',
    'main.css',
    'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    'favicon.ico',
    ...CacaheByAgent
]

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
                    if (cacheWhitelist.indexOf(name) === -1)
                        return caches.delete(name)
                })
            ).catch(err => console.log(err))
        )
    )
})
