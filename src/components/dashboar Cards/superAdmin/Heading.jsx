

// import * as React from "react";

// function HeadingWithSubtitle({ heading, subtitle }) {
//   return (
//     <div className="flex flex-col w-full ">
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
//   return (
//     <div className="flex flex-col w-full  ">
//       <div
//         className="
//           px-6 py-2 w-full rounded-3xl shadow-2xl
//           bg-cover bg-center  h-60 overflow-hidden
//         "
//         style={{
//           backgroundImage: `url("https://s3-alpha-sig.figma.com/img/7151/a0a3/e2f701865993cc6c4df68f40a20f2ba5?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WPqKWclDouPXVxZCtaEyFBtxCOW2zyhQ3Dk~ieg0DDaBKB45m-TIrC3gbLt5Ve76iRWKQtyrqfA48kkMBk9QRR1oQUBGkPk-z-b8NVKINSawiO4VUYG-qvjWeu6fRsz7DA8kPtJd0W7-LTdmbI-o3OAnV~qX45vjWB8v8EULWydBgAy2fdiS8qQK32fRLCS36AJu8Jx2Gez-~GET4kc7fZ1zQSwwVEXRCLKLIzfN1YOdD6~a10gslk0Wh8MtufiveFj0IS2fVOCtm~Hi7WgRReFbJ84xa2WPrXKmZuNhNegqCqVou38ht4OhSPyUltXitgQM9RfH13y0mQq1gCR36A__")`,
//         }}
//       >
//         <div className="flex gap-5 max-md:flex-col ">
//           <div className=" flex-col md:w-1/3 w-full block m-auto ">
//             <HeadingWithSubtitle
//               heading="Good Morning"
//               subtitle="Let's create something incredible together 🚀 🌟"
//             />
//           </div>
//           <div className="flex flex-col md:w-2/4 w-full h-full   overflow-hidden">
//             {/* <Image
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8fe58e579fa4eeff5f3fc5d4db35e0831c93b1ce6e9aade797b84a750606ab4"
//               alt="Hero"
//                   className="object-cover"
//             /> */}
//             <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8fe58e579fa4eeff5f3fc5d4db35e0831c93b1ce6e9aade797b84a750606ab4" alt=""  className="h-56 w-full"/>
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
//         style={{
//           backgroundImage: `url("https://s3-alpha-sig.figma.com/img/7151/a0a3/e2f701865993cc6c4df68f40a20f2ba5?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WPqKWclDouPXVxZCtaEyFBtxCOW2zyhQ3Dk~ieg0DDaBKB45m-TIrC3gbLt5Ve76iRWKQtyrqfA48kkMBk9QRR1oQUBGkPk-z-b8NVKINSawiO4VUYG-qvjWeu6fRsz7DA8kPtJd0W7-LTdmbI-o3OAnV~qX45vjWB8v8EULWydBgAy2fdiS8qQK32fRLCS36AJu8Jx2Gez-~GET4kc7fZ1zQSwwVEXRCLKLIzfN1YOdD6~a10gslk0Wh8MtufiveFj0IS2fVOCtm~Hi7WgRReFbJ84xa2WPrXKmZuNhNegqCqVou38ht4OhSPyUltXitgQM9RfH13y0mQq1gCR36A__")`,
//         }}
//       >
//         <div className="flex gap-5 max-md:flex-col">
//           <div className="flex-col md:w-1/3 w-full block m-auto">
//             <HeadingWithSubtitle
//               heading={greeting}
//               subtitle="Let's create something incredible together 🚀 🌟"
//             />
//           </div>
//           <div className="flex flex-col md:w-2/4 w-full h-full overflow-hidden">
//             <Image
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8fe58e579fa4eeff5f3fc5d4db35e0831c93b1ce6e9aade797b84a750606ab4"
//               alt="Hero"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Heading;



// import React, { useContext } from "react";
// import { ThemeContext } from "../../../hooks/ThemeContext";

// // A reusable heading + subtitle component
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

// // A simple image component that fills its parent
// function Image({ src, alt }) {
//   return (
//     <img
//       src={src}
//       alt={alt}
//       className="absolute inset-0 w-full h-full object-cover"
//     />
//   );
// }

// function Heading() {
//   // 1. Get the theme from ThemeContext
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
//       ? "/dark mode good afternoon.jpg"
//       : "/light mode good afternoon.jpg";
//   } else {
//     // Good Evening
//     imageUrl = isDark
//       ? "/dark mode good afternoon.jpg"
//       : "/light mode good afternoon.jpg";
//   }

//   return (
//     <div className="w-full">
//       {/* Relative container so we can position text above the absolute image */}
//       <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-2xl">
//         {/* The image fills the parent (absolute). */}
//         <Image src={imageUrl} alt="Hero" />

//         {/* Place text above the image (relative + z-index). */}
//         <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
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
