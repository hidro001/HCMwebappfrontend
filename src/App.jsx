import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { Toaster, toast } from "react-hot-toast";
import { onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebase-config";
import { registerFcmToken } from "./utils/registerFcmToken";
import PushNotificationCard from "./components/Notification/PushNotificationCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import { ChatProviderv2 } from "./contexts/ChatContextv2";

export default function App() {
  useEffect(() => {
    const unsubscribe = onMessage(messaging, async (payload) => {
      console.log("📨 Foreground message received:", payload);
      const { title, body, url, type = "info" } = payload.data || {};

      // 1) Show native system notification
      if (Notification.permission === "granted") {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg) {
          reg.showNotification(title, {
            body,
            icon: "/human maximizer.svg",
            data: { url },
          });
        }
      }

      // 2) Show beautiful in-app notification
      toast.custom(
        (t) => (
          <PushNotificationCard
            title={title}
            body={body}
            type={type} // Pass notification type from payload
            onClose={() => toast.dismiss(t.id)}
            onClick={() => {
              toast.dismiss(t.id);
              // Navigate to notification center or deep-link
              window.location.href = url || "/dashboard/notifications";
            }}
            showProgress={false} // No progress bar since no auto-close
          />
        ),
        {
          duration: Infinity, // Never auto-dismiss
          position: "top-right",
          style: {
            background: "transparent",
            boxShadow: "none",
          },
        }
      );
    });

    // Refresh FCM token on tab refocus
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        registerFcmToken();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      unsubscribe();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* Custom toaster with transparent background for our custom notifications */}
      {/* <Toaster 
        reverseOrder={false} 
        toastOptions={{ 
          style: { 
            zIndex: 9999999,
            // background: "transparent",
            boxShadow: "none",
          } 
        }} 
      /> */}
      <Toaster
        reverseOrder={false}
        toastOptions={{
          className:
            "text-gray-900 dark:text-white bg-white dark:bg-[#1e293b] border dark:border-gray-700",
          style: {
            zIndex: 9999999,
            background: "transparent",
            boxShadow: "none",
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}
