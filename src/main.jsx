// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";


// createRoot(document.getElementById("root")).render(<App />);


// src/index.js
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./hooks/ThemeContext";
import { CallProvider } from "./contexts/CallContext.jsx";
import CallModal from "./components/chats/calls/CallModal.jsx"
import CallWindow from "./components/chats/calls/CallWindow.jsx"
import VideoCallModal from "./components/chats/calls/VideoCallModal.jsx"

import { ChatProvider } from './contexts/ChatContext';



createRoot(document.getElementById("root")).render(
    <ThemeProvider>

    
   

      
  <CallProvider>
  <CallModal />
 <CallWindow />
 <VideoCallModal />
 <ChatProvider>
    <App />
   
    </ChatProvider>
  </CallProvider>


    
    </ThemeProvider>
 
);
