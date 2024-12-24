// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";


// createRoot(document.getElementById("root")).render(<App />);


// src/index.js
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SocketProvider } from "./contexts/SocketContext.jsx"; // Adjust the path to your SocketContext file

createRoot(document.getElementById("root")).render(
  <SocketProvider>
    <App />
  </SocketProvider>
);
