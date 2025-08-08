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

messaging.onBackgroundMessage((payload) => {
  console.log("[SW] BG message", payload);
  const { title, body, url, tag } = payload.data || {};

  const notificationTag = tag || `notification-${new Date().getTime()}`;

  const options = {
    body,
    icon: "/human maximizer.svg",
    badge: "/icons8-notification.gif",
    vibrate: [200, 100, 200],
    renotify: true,
    requireInteraction: true,
    tag: tag || "default-notification",
    data: { url },
    actions: [
      { action: "view", title: "View", icon: "/view.svg" },
      { action: "dismiss", title: "Dismiss", icon: "/close.svg" },
    ],
    tag: notificationTag,
  };

  self.registration.showNotification(title, options);
});

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
