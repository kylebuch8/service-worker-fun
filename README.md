# Service Worker Fun

This is a sample site about cats where you are encouraged to add a service worker and explore various caching methods.

Using "[The Offline Cookbook](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook)" by Jake Archibald is a good place to start.

## Getting Started
```
npm install && npm start
```

This should start a local web server and serve a page that looks like this.
![Screenshot of Wonderful World of Cats homepage](https://raw.githubusercontent.com/kylebuch8/service-worker-fun/master/images/wonderful-world-of-cats.png)

## Register the Service Worker
Go to the bottom of `main.js` and uncomment the following
```javascript
// window.addEventListener("load", () => {
//   navigator.serviceWorker.register("/service-worker.js")
//     .then(registration => {
//       console.log("Service Worker registation was successful", registration);
//     })
//     .catch(error => console.log("Service Worker registration failed", error));
// });
```

Then go into the `service-worker.js` file and begin adding a caching strategy.