// importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

// firebase.initializeApp({
//   apiKey: "AIzaSyBfDrlgTR0fhzyzJtmr-rth--iyyilONwo",
//   authDomain: "hcmapp-24ca7.firebaseapp.com",
//   projectId: "hcmapp-24ca7",
//   storageBucket: "hcmapp-24ca7.firebasestorage.app",
//   messagingSenderId: "729459296989",
//   appId: "1:729459296989:web:86a6b035c8632918072934",
// });

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   console.log("[firebase-messaging-sw.js] Received background message ", payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "/human maximizer.svg",
//     data: payload.data || {}, // Preserve data for click event
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// // Handle notification click and redirect to URL in data.url
// self.addEventListener("notificationclick", (event) => {
//   event.notification.close();

//   const clickUrl = event.notification.data?.url || "/dashboard/notifications";

//   event.waitUntil(
//     clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
//       for (const client of clientList) {
//         // If there's already a window/tab open with your app, focus it and navigate
//         if (client.url.includes(self.location.origin) && "focus" in client) {
//           client.focus();
//           client.navigate(clickUrl);
//           return;
//         }
//       }
//       // Otherwise, open a new window/tab with the url
//       if (clients.openWindow) {
//         return clients.openWindow(clickUrl);
//       }
//     })
//   );
// });

// importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

// firebase.initializeApp({
//   apiKey: "AIzaSyBfDrlgTR0fhzyzJtmr-rth--iyyilONwo",
//   authDomain: "hcmapp-24ca7.firebaseapp.com",
//   projectId: "hcmapp-24ca7",
//   storageBucket: "hcmapp-24ca7.firebasestorage.app",
//   messagingSenderId: "729459296989",
//   appId: "1:729459296989:web:86a6b035c8632918072934",
// });

// const messaging = firebase.messaging();

// // Background push: read title/body/url from payload.data
// messaging.onBackgroundMessage((payload) => {
//   console.log("[firebase-messaging-sw.js] Received background message", payload);
//   const { title, body, url } = payload.data || {};

//   const notificationOptions = {
//     body,
//     icon: "/human maximizer.svg",
//     data: { url }
//   };

//   self.registration.showNotification(title, notificationOptions);
// });

// // Handle click and navigate to the URL we passed in data.url
// self.addEventListener("notificationclick", (event) => {
//   event.notification.close();
//   const clickUrl = event.notification.data?.url || "/dashboard/notifications";

//   event.waitUntil(
//     clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
//       for (const client of clientList) {
//         if (client.url.includes(self.location.origin) && "focus" in client) {
//           client.focus();
//           return client.navigate(clickUrl);
//         }
//       }
//       return clients.openWindow(clickUrl);
//     })
//   );
// });

// // public/firebase-messaging-sw.js
// importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

// firebase.initializeApp({
//   apiKey: "AIzaSyBfDrlgTR0fhzyzJtmr-rth--iyyilONwo",
//   authDomain: "hcmapp-24ca7.firebaseapp.com",
//   projectId: "hcmapp-24ca7",
//   storageBucket: "hcmapp-24ca7.firebasestorage.app",
//   messagingSenderId: "729459296989",
//   appId: "1:729459296989:web:86a6b035c8632918072934",
// });

// const messaging = firebase.messaging();

// // background push: read everything from payload.data
// messaging.onBackgroundMessage((payload) => {
//   console.log("[SW] BG message", payload);
//   const { title, body, url } = payload.data || {};

//   const options = {
//     body,
//     icon: "/human maximizer.svg",
//     badge: "/icons8-notification.gif",
//     image: "/notification-background.jpg",
//     vibrate: [200, 100, 200],
//     requireInteraction: true,        // stays until user acts
//     data: { url },
//     actions: [
//       { action: "view", title: "View",   icon: "/view.svg"    },
//       { action: "dismiss", title: "Dismiss", icon: "/close.svg" }
//     ]
//   };

//   self.registration.showNotification(title, options);
// });

// // when user clicks one of our actions or the notification itself
// self.addEventListener("notificationclick", (event) => {
//   event.notification.close();
//   const clickUrl = event.notification.data?.url || "/dashboard/notifications";

//   event.waitUntil(
//     clients.matchAll({ type: "window", includeUncontrolled: true }).then((wins) => {
//       // if we already have a tab open, focus + navigate
//       for (const w of wins) {
//         if (w.url.startsWith(self.location.origin) && "focus" in w) {
//           w.focus();
//           return w.navigate(clickUrl);
//         }
//       }
//       // otherwise open a new one
//       if (clients.openWindow) {
//         return clients.openWindow(clickUrl);
//       }
//     })
//   );
// });

// // public/firebase-messaging-sw.js

// importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

// firebase.initializeApp({
//   apiKey: "AIzaSyBfDrlgTR0fhzyzJtmr-rth--iyyilONwo",
//   authDomain: "hcmapp-24ca7.firebaseapp.com",
//   projectId: "hcmapp-24ca7",
//   storageBucket: "hcmapp-24ca7.firebasestorage.app",
//   messagingSenderId: "729459296989",
//   appId: "1:729459296989:web:86a6b035c8632918072934",
// });

// const messaging = firebase.messaging();

// // Background push: read everything from payload.data
// messaging.onBackgroundMessage((payload) => {
//   console.log("[SW] BG message", payload);
//   const { title, body, url } = payload.data || {};

//   const options = {
//     body,
//     icon: "/human maximizer.svg",
//     badge: "/icons8-notification.gif",
//     image: "/notification-background.jpg",
//     vibrate: [200, 100, 200],
//     requireInteraction: true,        // stays until user acts
//     data: { url },
//     actions: [
//       { action: "view",    title: "View",    icon: "/view.svg"  },
//       { action: "dismiss", title: "Dismiss", icon: "/close.svg" }
//     ]
//   };

//   self.registration.showNotification(title, options);
// });

// // Handle notification clicks
// self.addEventListener("notificationclick", (event) => {
//   event.notification.close();
//   const clickUrl = event.notification.data?.url || "/dashboard/notifications";

//   event.waitUntil(
//     clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
//       for (const client of clientList) {
//         if (client.url.startsWith(self.location.origin) && "focus" in client) {
//           client.focus();
//           return client.navigate(clickUrl);
//         }
//       }
//       return clients.openWindow(clickUrl);
//     })
//   );
// });

importScripts(
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBfDrlgTR0fhzyzJtmr-rth--iyyilONwo",
  authDomain: "hcmapp-24ca7.firebaseapp.com",
  projectId: "hcmapp-24ca7",
  storageBucket: "hcmapp-24ca7.firebasestorage.app",
  messagingSenderId: "729459296989",
  appId: "1:729459296989:web:86a6b035c8632918072934",
});

const messaging = firebase.messaging();

// Background push: read everything from payload.data
messaging.onBackgroundMessage((payload) => {
  console.log("[SW] BG message", payload);
  const { title, body, url, tag } = payload.data || {};

  // Ensure a tag is present, else generate a unique one
  const notificationTag = tag || `notification-${new Date().getTime()}`;

  const options = {
    body,
    icon: "/human maximizer.svg",
    badge: "/icons8-notification.gif",
    // image: "/notification-background.jpg",
    vibrate: [200, 100, 200],
    renotify: true,
    requireInteraction: true, // stays until user acts
    tag: tag || "default-notification", // 🆕 this line fixes the error
    data: { url },
    actions: [
      { action: "view", title: "View", icon: "/view.svg" },
      { action: "dismiss", title: "Dismiss", icon: "/close.svg" },
    ],
    tag: notificationTag, // Add tag to prevent renotify issues
  };

  // Show notification with the required tag
  self.registration.showNotification(title, options);
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const clickUrl = event.notification.data?.url || "/dashboard/notifications";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (
            client.url.startsWith(self.location.origin) &&
            "focus" in client
          ) {
            client.focus();
            return client.navigate(clickUrl);
          }
        }
        return clients.openWindow(clickUrl);
      })
  );
});
