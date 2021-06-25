/// <reference path="../src/@types/service-worker" />
// Hack: Import type for editor

const getCacheVersion = (date: Date) =>
  `api_${(() => {
    const weekday = Math.floor(date.getDate() / 7)
    const dayOfWeek = date.getDay()

    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const notYet = dayOfWeek === 1 && date.getHours() < 10

    return isWeekend || notYet ? weekday - 1 : weekday
  })()}`

const cases = [
  { date: `2020-11-01`, expect: 'api_-1' },
  { date: `2020-11-02T08:00`, expect: 'api_-1' },
  { date: `2020-11-02T10:00`, expect: 'api_0' },
  { date: `2020-11-07`, expect: 'api_0' },
  { date: `2020-11-08`, expect: 'api_0' },
  { date: `2020-11-09T08:00`, expect: 'api_0' },
  { date: `2020-11-09T10:00`, expect: 'api_1' }
]

for (const { date, expect } of cases) {
  const output = getCacheVersion(new Date(date))
  console.assert(
    output === expect,
    `${date} should return ${expect} instead of ${output}.`
  )
}

const CACHE_NAME = 'cache_v4'

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

const cacheByAgent: string[] = []

const checkAgent = (name: string) => navigator.userAgent.indexOf(name) !== -1
if (checkAgent('Chrome/')) cacheByAgent.push(...Chrome)
else if (!checkAgent('Firefox/')) cacheByAgent.push(...Safari)

const fileToCache = [...staticFiles, ...cacheByAgent]

self.addEventListener('install', evt => {
  evt.waitUntil(
    Promise.all([
      addCache(CACHE_NAME, fileToCache),
      addCache(getCacheVersion(new Date()), API_URL)
    ])
  )
})

self.addEventListener('fetch', evt => {
  evt.respondWith(
    (async () => {
      if (evt.request.url === API_URL) {
        const currentAPI = getCacheVersion(new Date())
        const cacheWhitelist = [CACHE_NAME, currentAPI]

        const isCached = await caches.has(currentAPI)
        if (!isCached) {
          await Promise.all([
            addCache(currentAPI, API_URL),
            cleanOldCache(cacheWhitelist)
          ])
        }
      }

      const res = await caches.match(evt.request)
      return res || fetch(evt.request)
    })()
  )
})

self.addEventListener('activate', evt => {
  const cacheWhitelist = [CACHE_NAME, getCacheVersion(new Date())]
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
