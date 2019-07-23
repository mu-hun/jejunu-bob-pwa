const CACHE_API = `api_${Math.floor(new Date().getDate() / 7)}`
const CACHE_NAME = 'cache_v1'

// TODO: dynamic icon cache by regex
// const ICON_NAME = 'icon_v1'

const API_URL = 'https://meals-data.muhun.kim'

const fileToCache = [
    '/',
    'manifest.json',
    'https://fonts.googleapis.com/css?family=Material+Icons',
    'app.js',
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
    'img/icons/mstile-150x150.png'
]

self.addEventListener('install', evt => {
    console.log('install', evt)
    evt.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => cache.addAll(fileToCache))
            .catch(evt => console.log(evt))
    )
})

self.addEventListener('fetch', evt => {
    const { request: req } = evt
    console.log('[sw.js]', req)
    if (req.url === API_URL) {
        evt.respondWith(
            caches.open(CACHE_API).then(cache =>
                cache.match(req).then(
                    res =>
                        res ||
                        fetch(req).then(res => {
                            cache.put(req, res.clone())
                            return res
                        })
                )
            )
        )
    } else {
        evt.respondWith(
            caches
                .match(evt.request)
                .then(res => res || fetch(evt.request))
                .catch(err => console.log(err))
        )
    }
})

self.addEventListener('activate', evt => {
    const cacheWhitelist = [CACHE_NAME, CACHE_API]
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
