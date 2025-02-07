// import * as React from "react";

// function HeadingWithSubtitle({ heading, subtitle }) {
//   return (
//     <div className="flex flex-col w-full">
//       <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 max-md:text-4xl">
//         {heading}
//       </div>
//       <div className="mt-6 text-xl text-fuchsia-800 dark:text-fuchsia-400 max-md:max-w-full">
//         {subtitle}
//       </div>
//     </div>
//   );
// }

// function Image({ src, alt }) {
//   return (
//     <img
//       loading="lazy"
//       src={src}
//       alt={alt}
//       className="object-contain w-full h-auto max-md:mt-4"
//     />
//   );
// }

// function Heading() {
//   // Get current hour of day (0-23)
//   const now = new Date();
//   const hour = now.getHours();

//   // Determine greeting based on time
//   let greeting = "";
//   if (hour >= 6 && hour < 12) {
//     greeting = "Good Morning";
//   } else if (hour >= 12 && hour < 16) {
//     greeting = "Good Afternoon";
//   } else {
//     // Covers both 16:00 - 23:59 and 00:00 - 05:59
//     greeting = "Good Evening";
//   }

//   return (
//     <div className="flex flex-col w-full">
//       <div
//         className="
//           px-6 py-2 w-full rounded-3xl shadow-2xl
//           bg-cover bg-center h-48 overflow-hidden
//         "
//       >
//         <div className=" border">
//           <div className=" w-full block m-auto border ">
//             <HeadingWithSubtitle
//               heading={greeting}
//               subtitle="Let's create something incredible together 🚀 🌟"
//             />
//           </div>



//           <div className="  w-full h-full overflow-hidden border  relative top-0 left-0">
//             <Image
//               src={"/dark mode good morning.jpg"}
//               className="w-full  rounded shadow border "
//               alt="Hero"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Heading;


// import * as React from "react";

// function HeadingWithSubtitle({ heading, subtitle }) {
//   return (
//     <div className="flex flex-col w-full text-white">
//       <div className="text-5xl font-bold max-md:text-4xl">
//         {heading}
//       </div>
//       <div className="mt-4 text-xl max-md:max-w-full">
//         {subtitle}
//       </div>
//     </div>
//   );
// }

// import { ThemeContext } from "../../../hooks/ThemeContext";
//   // 3. Choose the image based on greeting + isDark
//   let imageUrl = "";
//   if (greeting === "Good Morning") {
//     imageUrl = isDark
//       ? "/dark mode good morning.jpg"
//       : "/light mode good morning.jpg";
//   } else if (greeting === "Good Afternoon") {
//     imageUrl = isDark
//       ? "/dark mode good evening.jpg"
//       : "/light mode good afternoon.jpg";
//   } else {
//     // Good Evening
//     imageUrl = isDark
//       ? "/dark mode good evening.jpg"
//       : "/light mode good evening.jpg";
//   }

// function Image({ src, alt }) {
//   // We’ll give the image absolute positioning below.
//   // The container around it will control the overall height.
//   return (
//     <img
//       src={src}
//       alt={alt}
//       className="absolute inset-0 w-full h-full object-cover"
//     />
//   );
// }

// function Heading() {

//   //   // 1. Get the theme ("light" or "dark") from ThemeContext
//   const { theme } = useContext(ThemeContext);
//   const isDark = theme === "dark";

//   // 2. Figure out the greeting based on current time
//   const hour = new Date().getHours();
//   let greeting = "";
//   if (hour >= 6 && hour < 12) {
//     greeting = "Good Morning";
//   } else if (hour >= 12 && hour < 16) {
//     greeting = "Good Afternoon";
//   } else {
//     greeting = "Good Evening";
//   }


//   // Determine greeting based on time


//   return (
//     <div className="w-full">
//       {/* Relative container so we can position text above the absolute image */}
//       <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-2xl">
//         {/* The image fills the parent (absolute). */}
//         <Image
//             src={imageUrl}
//           alt="Hero"
//         />

//         {/* Place text above the image (relative + z-index). */}
//         <div className="relative z-10 flex items-center justify-center w-full h-full  p-4">
//           <HeadingWithSubtitle
//             heading={greeting}
//             subtitle="Let's create something incredible together 🚀🌟"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Heading;


import React, { useContext } from "react";
import { ThemeContext } from "../../../hooks/ThemeContext";

// A reusable heading + subtitle component
function HeadingWithSubtitle({ heading, subtitle }) {
  return (
    <div className="flex flex-col w-full text-white">
      <div className="text-5xl font-bold max-md:text-4xl  text-orange-600">
        {heading}
      </div>
      <div className="mt-4 text-xl max-md:max-w-full text-orange-600">
        {subtitle}
      </div>
    </div>
  );
}

// A simple image component that fills its parent
function Image({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

function Heading() {
  // 1. Get the theme from ThemeContext
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // 2. Figure out the greeting based on current time
  const hour = new Date().getHours();
  let greeting = "";
  if (hour >= 6 && hour < 12) {
    greeting = "Good Morning";
  } else if (hour >= 12 && hour < 16) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  // 3. Choose the image based on greeting + isDark
  let imageUrl = "";
  if (greeting === "Good Morning") {
    imageUrl = isDark
      ? "/dark mode good morning.jpg"
      : "/light mode good morning.jpg";
  } else if (greeting === "Good Afternoon") {
    imageUrl = isDark
      ? "/dark mode good afternoon.jpg"
      : "/light mode good afternoon.jpg";
  } else {
    // Good Evening
    imageUrl = isDark
      ? "/dark mode good afternoon.jpg"
      : "/light mode good afternoon.jpg";
  }

  return (
    <div className="w-full bg-white">
      {/* Relative container so we can position text above the absolute image */}
      <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-2xl">
        {/* The image fills the parent (absolute). */}
        <Image src={imageUrl} alt="Hero" />

        {/* Place text above the image (relative + z-index). */}
        <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
          <HeadingWithSubtitle
            heading={greeting}
            subtitle="Let's create something incredible together 🚀🌟"
          />
        </div>
      </div>
    </div>
  );
}

export default Heading;









// import React, { useContext } from "react";
// import { ThemeContext } from "../../../hooks/ThemeContext";

// function Heading() {
//   // 1. Get the theme ("light" or "dark") from ThemeContext
//   const { theme } = useContext(ThemeContext);
//   const isDark = theme === "dark";

//   // 2. Figure out the greeting based on current time
//   const hour = new Date().getHours();
//   let greeting = "";
//   if (hour >= 6 && hour < 12) {
//     greeting = "Good Morning";
//   } else if (hour >= 12 && hour < 16) {
//     greeting = "Good Afternoon";
//   } else {
//     greeting = "Good Evening";
//   }

//   // 3. Choose the image based on greeting + isDark
//   let imageUrl = "";
//   if (greeting === "Good Morning") {
//     imageUrl = isDark
//       ? "/dark mode good morning.jpg"
//       : "/light mode good morning.jpg";
//   } else if (greeting === "Good Afternoon") {
//     imageUrl = isDark
//       ? "/dark mode good evening.jpg"
//       : "/light mode good afternoon.jpg";
//   } else {
//     // Good Evening
//     imageUrl = isDark
//       ? "/dark mode good evening.jpg"
//       : "/light mode good evening.jpg";
//   }

//   return (
//     <div className="p-6 bg-white dark:bg-gray-800">
//       {/* Greeting text (Tailwind classes adjust for dark vs. light mode) */}
//       <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
//         {greeting}
//       </h1>
//       <p className="mt-2 text-gray-700 dark:text-gray-300">
//         Let’s create something incredible together 🚀 🌟
//       </p>

//       {/* The image */}
//       <div className="mt-4">
//         <img
//           src={imageUrl}
//           alt={`${greeting} illustration`}
//           className="w-full max-w-md rounded shadow"
//         />
//       </div>
//     </div>
//   );
// }

// export default Heading;
