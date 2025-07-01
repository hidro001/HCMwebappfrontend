// import { getToken } from "firebase/messaging";
// import { messaging } from "../firebase/firebase-config";
// import axiosInstance from "../service/axiosInstance";
// import platform from "platform";
// import { toast } from "react-hot-toast";
// import BraveNotificationToast from "./BraveNotificationToast";

// const FCM_CACHE_KEY = "fcm_token";
// let braveSupported = null;

// async function checkIsBrave() {
//   if (braveSupported !== null) return braveSupported;
//   braveSupported = Boolean(
//     navigator.brave && (await navigator.brave.isBrave())
//   );
//   return braveSupported;
// }

// export async function registerFcmToken() {
//   try {
//     const permission = await Notification.requestPermission();
//     if (permission !== "granted") {
//       toast.error("Notification permission denied.");
//       return null;
//     }

//     const registration = await navigator.serviceWorker.getRegistration(
//       "/firebase-messaging-sw.js"
//     );
//     if (!registration) {
//       toast.error("Service worker not available.");
//       return null;
//     }

//     const currentToken = await getToken(messaging, {
//       vapidKey:
//         "BBykmU7Dhx_RslCY4uwxEm_csewzyq-KFJitYAutqyAyTmfOsMA80EqarmKvlK6C66i-rjVj2InFgeGGHUmgHjU",
//       serviceWorkerRegistration: registration,
//     });
//     if (!token) {
//       toast.error("Unable to generate FCM token.");
//       return null;
//     }

//     const previous = localStorage.getItem(FCM_CACHE_KEY);
//     if (previous === token) {
//       console.log("FCM token unchanged.");
//       return token;
//     }

//     const deviceInfo = `${platform.name} ${platform.version} on ${platform.os?.family}`;
//     await axiosInstance.post("/user-management/update-fcm-token", {
//       token,
//       platform: "web",
//       deviceInfo,
//     });
//     localStorage.setItem(FCM_CACHE_KEY, token);

//     console.log("FCM token registered.");
//     return token;
//   } catch (err) {
//     console.error("FCM registration error:", err);
//     if (err.name === "AbortError" && (await checkIsBrave())) {
//       toast.custom(
//         (t) => (
//           <div className={t.visible ? "animate-enter" : "animate-leave"}>
//             <BraveNotificationToast />
//           </div>
//         ),
//         { duration: 15000, position: "bottom-center", id: "brave-notification" }
//       );
//     } else {
//       console.error("Error setting up notifications:", err);
//       // toast.error("Error setting up notifications.");
//     }
//     return null;
//   }
// }



import { getToken } from "firebase/messaging";
import { messaging } from "../firebase/firebase-config";
import axiosInstance from "../service/axiosInstance";
import platform from "platform";
import { toast } from "react-hot-toast";
import BraveNotificationToast from "./BraveNotificationToast";

const FCM_CACHE_KEY = "fcm_token";
let braveSupported = null;

async function checkIsBrave() {
  if (braveSupported !== null) return braveSupported;
  braveSupported = Boolean(
    navigator.brave && (await navigator.brave.isBrave())
  );
  return braveSupported;
}

export async function registerFcmToken() {
  try {
    // Request notification permission
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      toast.error("Notification permission denied.");
      return null;
    }

    // Ensure the FCM service worker is registered
    const registration = await navigator.serviceWorker.getRegistration(
      "/firebase-messaging-sw.js"
    );
    if (!registration) {
      toast.error("Service worker not available.");
      return null;
    }

    // Attempt to get a fresh FCM token
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BBykmU7Dhx_RslCY4uwxEm_csewzyq-KFJitYAutqyAyTmfOsMA80EqarmKvlK6C66i-rjVj2InFgeGGHUmgHjU",
      serviceWorkerRegistration: registration,
    });
    if (!currentToken) {
      toast.error("Unable to generate FCM token.");
      return null;
    }

    // If it's unchanged, skip the network call
    const previousToken = localStorage.getItem(FCM_CACHE_KEY);
    if (previousToken === currentToken) {
      // console.log("FCM token unchanged.");
      return currentToken;
    }

    // Send the new token to your backend
    const deviceInfo = `${platform.name} ${platform.version} on ${platform.os?.family}`;
    await axiosInstance.post("/user-management/update-fcm-token", {
      token: currentToken,
      platform: "web",
      deviceInfo,
    });

    // Cache it locally
    localStorage.setItem(FCM_CACHE_KEY, currentToken);
    console.log("FCM token registered.");

    return currentToken;
  } catch (err) {
    console.error("FCM registration error:", err);
    // Special handling for Brave's blocking behavior
    if (err.name === "AbortError" && (await checkIsBrave())) {
      toast.custom(
        (t) => (
          <div className={t.visible ? "animate-enter" : "animate-leave"}>
            <BraveNotificationToast />
          </div>
        ),
        { duration: 15000, position: "bottom-center", id: "brave-notification" }
      );
    } else {
      console.error("Error setting up notifications:", err);
      // Optionally: toast.error("Error setting up notifications.");
    }
    return null;
  }
}
