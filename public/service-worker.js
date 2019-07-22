workbox.setConfig({
	debug: true,
});

workbox.precaching.precacheAndRoute([
	'/',
	'/manifest.json'
])

workbox.routing.registerRoute(
	/\.js$/,
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'js'
	})
)

workbox.routing.registerRoute(
	/\.css$/,
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'css'
	})
)

workbox.routing.registerRoute(
	new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
	workbox.strategies.cacheFirst({
		cacheName: 'googleapis',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 30
			})
		]
	})
)

workbox.routing.registerRoute(
	/\.(?:png|gif|jpg|jpeg|svg)$/,
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'images',
	})
)

workbox.routing.registerRoute(
	'https://meals-data.muhun.kim/',
	workbox.strategies.networkFirst({
		cacheName: 'api'
	})
)
