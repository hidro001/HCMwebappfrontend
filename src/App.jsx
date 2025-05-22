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



import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { ThemeProvider } from "./hooks/ThemeContext";
import { useEffect } from "react";
import "./components/charts/register";
import { Toaster, toast } from "react-hot-toast";
import { onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebase-config";
import { registerFcmToken } from "./utils/registerFcmToken"; 

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

export default function App() {
  useEffect(() => {
    // ✅ Foreground FCM notifications
    const unsubscribe = onMessage(messaging, (payload) => {
      const { title, body } = payload.notification || {};
      toast.custom(
        (t) => (
          <div
            className="bg-white text-black px-4 py-2 rounded shadow-lg"
            onClick={() => toast.dismiss(t.id)}
          >
            <strong>{title}</strong>
            <div>{body}</div>
          </div>
        ),
        {
          duration: 5000,
        }
      );
      console.log("📨 Foreground message received:", payload);
    });

    // ✅ Trigger token refresh when tab becomes active
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible") {
        await registerFcmToken(); // will update only if needed
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
          style: {
            zIndex: 9999999,
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}
