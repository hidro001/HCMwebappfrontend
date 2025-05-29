import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBfDrlgTR0fhzyzJtmr-rth--iyyilONwo",
  authDomain: "hcmapp-24ca7.firebaseapp.com",
  projectId: "hcmapp-24ca7",
  storageBucket: "hcmapp-24ca7.firebasestorage.app",
  messagingSenderId: "729459296989",
  appId: "1:729459296989:web:86a6b035c8632918072934",
  measurementId: "G-RS3RZR8XFY"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { messaging, getToken, onMessage };
