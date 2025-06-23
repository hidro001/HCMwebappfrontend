import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./hooks/ThemeContext";
import { CallProvider } from "./contexts/CallContext.jsx";
import CallModal from "./components/chats/calls/CallModal.jsx";
import CallWindow from "./components/chats/calls/CallWindow.jsx";
import VideoCallModal from "./components/chats/calls/VideoCallModal.jsx";
import IncomingCallModal from "./components/chats/calls/IncomingCallModal.jsx";
import { onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebase-config";
import { toast } from "react-hot-toast";

import { ChatProviderv2 } from "./contexts/ChatContextv2.jsx";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("✅ Firebase service worker registered:", registration);
      })
      .catch((err) => {
        console.error("❌ Service worker registration failed:", err);
      });
  });
}

const employee = localStorage.getItem("employeeId");
// console.log("Employee ID:", employee);

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    {/* <CallProvider currentUserId={employee}> */}
      {/* <CallModal /> */}
      {/* <IncomingCallModal /> */}

      {/* <CallWindow /> */}
      {/* <VideoCallModal /> */}
      {/* <ChatProviderv2> */}
        <App />
      {/* </ChatProviderv2> */}
    {/* </CallProvider> */}
  </ThemeProvider>
);
