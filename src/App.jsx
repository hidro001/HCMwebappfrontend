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
      const { title, body, url, type = "info" } = payload.data || {};

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

      toast.custom(
        (t) => (
          <PushNotificationCard
            title={title}
            body={body}
            type={type}
            onClose={() => toast.dismiss(t.id)}
            onClick={() => {
              toast.dismiss(t.id);
              window.location.href = url || "/dashboard/notifications";
            }}
            showProgress={false}
          />
        ),
        {
          duration: Infinity,
          position: "top-right",
          style: {
            background: "transparent",
            boxShadow: "none",
          },
        }
      );
    });

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
      <Toaster
        reverseOrder={false}
        toastOptions={{
          className:
            "text-gray-900 dark:text-white bg-white dark:bg-[#1e293b] border dark:border-gray-700",
          style: {
            zIndex: 9999999,
         
            boxShadow: "none",
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}
