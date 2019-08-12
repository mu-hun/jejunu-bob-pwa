const CACHE_API = () =>
    `api_${(() => {
        const DATE = new Date()
        const weekday = Math.floor(DATE.getDate() / 7)
        return weekday === 1 && DATE.getHours() < 10 ? weekday - 1 : weekday
    })()}`
const CACHE_NAME = 'cache_v2'

// TODO: dynamic icon cache by regex
// const ICON_NAME = 'icon_v1'

const API_URL =
    location.hostname === 'meals.muhun.dev'
        ? 'https://meals-data.muhun.kim'
        : 'https://meals-data.muhun.kim/dev'

const fileToCache = [
    '/',
    'manifest.json',
    'https://fonts.googleapis.com/css?family=Material+Icons',
    'main.js',
    'main.css',
    'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    'img/icons/android-chrome-192x192.png',
    'img/icons/android-chrome-512x512.png',
    'img/icons/apple-touch-icon-60x60.png',
    'img/icons/apple-touch-icon-120x120.png',
    'img/icons/apple-touch-icon-152x152.png',
    'img/icons/apple-touch-icon-180x180.png',
    'img/icons/apple-touch-icon.png',
    'img/icons/favicon-32x32.png',
    'img/icons/favicon-16x16.png',
    'img/icons/msapplication-icon-144x144.png',
    'img/icons/mstile-150x150.png',
    'favicon.ico'
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
