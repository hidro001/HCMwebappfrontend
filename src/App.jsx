import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { ThemeProvider } from "./hooks/ThemeContext";
import { useEffect } from "react";
import "./components/charts/register";
import { Toaster } from "react-hot-toast";
// import 'react-hot-toast/style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css"; // Import the Tailwind setup here

export default function App() {
  return (
    <>
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      <Toaster
        reverseOrder={false}
        toastOptions={{
          style: {
            // Something higher than your modal overlay
            zIndex: 9999999,
          },
        }}
      />

      <RouterProvider router={router} />
    </>
  );
}
