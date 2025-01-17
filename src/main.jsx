// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";


// createRoot(document.getElementById("root")).render(<App />);


// src/index.js
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./hooks/ThemeContext";



createRoot(document.getElementById("root")).render(
    <ThemeProvider>
    <App />
    </ThemeProvider>
 
);
