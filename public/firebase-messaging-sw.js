importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBfDrlgTR0fhzyzJtmr-rth--iyyilONwo",
  authDomain: "hcmapp-24ca7.firebaseapp.com",
  projectId: "hcmapp-24ca7",
  storageBucket: "hcmapp-24ca7.firebasestorage.app",
  messagingSenderId: "729459296989",
  appId: "1:729459296989:web:86a6b035c8632918072934",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/human maximizer.svg",
    data: payload.data || {}, // Preserve data for click event
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click and redirect to URL in data.url
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const clickUrl = event.notification.data?.url || "/dashboard/notifications";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        // If there's already a window/tab open with your app, focus it and navigate
        if (client.url.includes(self.location.origin) && "focus" in client) {
          client.focus();
          client.navigate(clickUrl);
          return;
        }
      }
      // Otherwise, open a new window/tab with the url
      if (clients.openWindow) {
        return clients.openWindow(clickUrl);
      }
    })
  );
});
