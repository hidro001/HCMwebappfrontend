import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { ThemeProvider } from "./hooks/ThemeContext";
import { useEffect } from "react";



export default function App() {
 

  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}


