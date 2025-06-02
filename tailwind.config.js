// /** @type {import('tailwindcss').Config} */
// export default {
//   darkMode: "class",  //enabled class for dark mode
//   content: ["./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }



/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "text-primary": "var(--text-primary)",
        "bg-sidebar" : "var(--bg-sidebar)",
        // ...
      },
    },
  },
  plugins: [],
};


// import React from "react";

// function MyComponent() {
//   return (
//     <div className="bg-bg-primary text-text-primary p-6">
//       <h1 className="text-2xl font-bold">Hello from MyComponent</h1>
//       <p>This paragraph uses our custom text color variable.</p>
//     </div>
//   );
// }

// export default MyComponent;
