// public/firebase-messaging-sw.js

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
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
    