import { getToken } from "firebase/messaging";
import { messaging } from "../firebase/firebase-config";
import axiosInstance from "../service/axiosInstance";
import platform from "platform";
import { toast } from "react-hot-toast";
import BraveNotificationToast from "./BraveNotificationToast"; // Custom styled toast

const FCM_CACHE_KEY = "fcm_token";

const isBrave = async () => {
  return !!(navigator.brave && (await navigator.brave.isBrave()));
};

export const registerFcmToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      toast.error("Notification permission denied.");
      return;
    }

    const registration = await navigator.serviceWorker.getRegistration("/firebase-messaging-sw.js");
    if (!registration) {
      toast.error("Service worker not found.");
      return;
    }

    const currentToken = await getToken(messaging, {
      vapidKey: "BBykmU7Dhx_RslCY4uwxEm_csewzyq-KFJitYAutqyAyTmfOsMA80EqarmKvlK6C66i-rjVj2InFgeGGHUmgHjU",
      serviceWorkerRegistration: registration,
    });

    if (!currentToken) {
      toast.error("⚠️ Failed to generate FCM token.");
      return;
    }

    const cachedToken = localStorage.getItem(FCM_CACHE_KEY);
    if (cachedToken === currentToken) {
      console.log("✅ FCM token unchanged, not re-sending.");
      return;
    }

    const deviceInfo = `${platform.name} ${platform.version} on ${platform.os?.family}`;
    await axiosInstance.post("/user-management/update-fcm-token", {
      token: currentToken,
      platform: "web",
      deviceInfo,
    });

    localStorage.setItem(FCM_CACHE_KEY, currentToken);

    console.log("✅ FCM token sent to backend and cached locally.");
  } catch (err) {
    console.error("❌ Error registering FCM token:", err);

    if (err.name === "AbortError" && (await isBrave())) {
      toast.custom(
        (t) => (
          <div className={`${t.visible ? "animate-enter" : "animate-leave"}`}>
            <BraveNotificationToast />
          </div>
        ),
        {
          duration: 15000,
          position: "bottom-center",
          id: "brave-notification-error",
        }
      );
    } else {
      toast.error("An error occurred during FCM setup.");
    }
  }
};
