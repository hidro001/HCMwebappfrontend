import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Make `global` available and point it to `window`
    global: "window",
  },
  server: {
    port: 5173, // Change this to your desired port
    open: true, // Optional: Opens the browser automatically on startup
  },
});
