import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { ThemeProvider } from "./hooks/ThemeContext";
import { useEffect } from "react";
import './components/charts/register';



export default function App() {
 

  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}


