import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { ThemeProvider } from "./hooks/ThemeContext";
import { useEffect } from "react";
import "./components/charts/register";
import { Toaster } from "react-hot-toast";
// import 'react-hot-toast/style.css';

export default function App() {
  return (
    <>
      <ThemeProvider>
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      <Toaster  reverseOrder={false} />
        <RouterProvider router={router} />
      </ThemeProvider>

    </>
  );
}
