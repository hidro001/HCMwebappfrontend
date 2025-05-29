// import { RouterProvider } from "react-router-dom";
// import router from "./routes/Router";
// import { ThemeProvider } from "./hooks/ThemeContext";
// import { useEffect } from "react";
// import "./components/charts/register";
// import { Toaster, toast } from "react-hot-toast";
// import { onMessage } from "firebase/messaging";
// import { messaging } from "./firebase/firebase-config"; // adjust if needed
// // import 'react-hot-toast/style.css';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./index.css"; // Import the Tailwind setup here

// export default function App() {
//   useEffect(() => {
//     const unsubscribe = onMessage(messaging, (payload) => {
//       const { title, body } = payload.notification || {};
//       toast.custom(
//         (t) => (
//           <div
//             className="bg-white text-black px-4 py-2 rounded shadow-lg"
//             onClick={() => toast.dismiss(t.id)}
//           >
//             <strong>{title}</strong>
//             <div>{body}</div>
//           </div>
//         ),
//         {
//           duration: 5000,
//         }
//       );
//       console.log("📨 Foreground message received:", payload);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <>
//       {/* <Toaster position="top-right" reverseOrder={false} /> */}
//       <Toaster
//         reverseOrder={false}
//         toastOptions={{
//           style: {
//             // Something higher than your modal overlay
//             zIndex: 9999999,
//           },
//         }}
//       />

//       <RouterProvider router={router} />
//     </>
//   );
// }



// import { RouterProvider } from "react-router-dom";
// import router from "./routes/Router";
// import { ThemeProvider } from "./hooks/ThemeContext";
// import { useEffect } from "react";
// import "./components/charts/register";
// import { Toaster, toast } from "react-hot-toast";
// import { onMessage } from "firebase/messaging";
// import { messaging } from "./firebase/firebase-config";
// import { registerFcmToken } from "./utils/registerFcmToken"; 

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./index.css";

// export default function App() {
//   useEffect(() => {
//     // ✅ Foreground FCM notifications
//     const unsubscribe = onMessage(messaging, (payload) => {
//       const { title, body } = payload.notification || {};
//       toast.custom(
//         (t) => (
//           <div
//             className="bg-white text-black px-4 py-2 rounded shadow-lg"
//             onClick={() => toast.dismiss(t.id)}
//           >
//             <strong>{title}</strong>
//             <div>{body}</div>
//           </div>
//         ),
//         {
//           duration: 5000,
//         }
//       );
//       console.log("📨 Foreground message received:", payload);
//     });

//     // ✅ Trigger token refresh when tab becomes active
//     const handleVisibilityChange = async () => {
//       if (document.visibilityState === "visible") {
//         await registerFcmToken(); // will update only if needed
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     return () => {
//       unsubscribe();
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, []);

//   return (
//     <>
//       <Toaster
//         reverseOrder={false}
//         toastOptions={{
//           style: {
//             zIndex: 9999999,
//           },
//         }}
//       />
//       <RouterProvider router={router} />
//     </>
//   );
// }


// import { useEffect } from "react";
// import { RouterProvider } from "react-router-dom";
// import router from "./routes/Router";
// import { Toaster, toast } from "react-hot-toast";
// import { onMessage } from "firebase/messaging";
// import { messaging } from "./firebase/firebase-config";
// import { registerFcmToken } from "./utils/registerFcmToken";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./index.css";

// export default function App() {
//   useEffect(() => {
//     // Handle foreground messages: read from payload.data
//     const unsubscribe = onMessage(messaging, (payload) => {
//       console.log("📨 Foreground message received:", payload);
//       const { title, body } = payload.data || {};

//       toast.custom((t) => (
//         <div
//           className="bg-white text-black px-4 py-2 rounded shadow-lg cursor-pointer"
//           onClick={() => toast.dismiss(t.id)}
//         >
//           <strong>{title}</strong>
//           <div>{body}</div>
//         </div>
//       ), { duration: 5000 });
//     });

//     // Refresh token when tab becomes active
//     const handleVisibilityChange = async () => {
//       if (document.visibilityState === "visible") {
//         await registerFcmToken();
//       }
//     };
//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     return () => {
//       unsubscribe();
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, []);

//   return (
//     <>
//       <Toaster
//         reverseOrder={false}
//         toastOptions={{ style: { zIndex: 9999999 } }}
//       />
//       <RouterProvider router={router} />
//     </>
//   );
// }


// import { useEffect } from "react";
// import { RouterProvider } from "react-router-dom";
// import router from "./routes/Router";
// import { Toaster } from "react-hot-toast"; // keep this for your other toasts
// import { onMessage } from "firebase/messaging";
// import { messaging } from "./firebase/firebase-config";
// import { registerFcmToken } from "./utils/registerFcmToken";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./index.css";

// export default function App() {
//   useEffect(() => {
//     // Foreground FCM → always show a system notification
//     const unsubscribe = onMessage(messaging, async (payload) => {
//       console.log("📨 Foreground message received:", payload);
//       const { title, body, url } = payload.data || {};

//       // Only if permission is already granted
//       if (Notification.permission === "granted") {
//         const reg = await navigator.serviceWorker.getRegistration();
//         if (reg) {
//           reg.showNotification(title, {
//             body,
//             icon: "/human maximizer.svg",
//             data: { url },
//           });
//         }
//       }
//     });

//     // Refresh token on tab focus
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === "visible") {
//         registerFcmToken();
//       }
//     };
//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     return () => {
//       unsubscribe();
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, []);

//   return (
//     <>
//       {/* KEEP your Toaster so other parts of the app can still toast */}
//       <Toaster
//         reverseOrder={false}
//         toastOptions={{ style: { zIndex: 9999999 } }}
//       />
//       <RouterProvider router={router} />
//     </>
//   );
// }


// App.jsx
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
      toast.custom((t) => (
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
      ), {
        duration: Infinity, // Never auto-dismiss
        position: "top-right",
        style: {
          background: "transparent",
          boxShadow: "none",
        },
      });
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
      <Toaster 
        reverseOrder={false} 
        toastOptions={{ 
          style: { 
            zIndex: 9999999,
            background: "transparent",
            boxShadow: "none",
          } 
        }} 
      />
      <RouterProvider router={router} />
    </>
  );
}

