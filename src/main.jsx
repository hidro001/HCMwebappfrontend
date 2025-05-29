import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./hooks/ThemeContext";
import { CallProvider } from "./contexts/CallContext.jsx";
import CallModal from "./components/chats/calls/CallModal.jsx";
import CallWindow from "./components/chats/calls/CallWindow.jsx";
import VideoCallModal from "./components/chats/calls/VideoCallModal.jsx";
import { ChatProviderv2 } from "./contexts/ChatContextv2.jsx";


const employee = localStorage.getItem("employeeId");
console.log("Employee ID:", employee);

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <CallProvider currentUserId={employee}>
      <CallModal />
      <CallWindow />
      <VideoCallModal />
      <ChatProviderv2>
        <App />
      </ChatProviderv2>
    </CallProvider>
  </ThemeProvider>
);
