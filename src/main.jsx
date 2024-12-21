import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import socket from './utils/socket';

createRoot(document.getElementById("root")).render(<App socket={socket} />);
