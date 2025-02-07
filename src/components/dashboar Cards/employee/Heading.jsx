

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

import * as React from "react";

function HeadingWithSubtitle({ heading, subtitle }) {
  return (
    <div className="flex flex-col w-full">
      <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 max-md:text-4xl">
        {heading}
      </div>
      <div className="mt-6 text-xl text-fuchsia-800 dark:text-fuchsia-400 max-md:max-w-full">
        {subtitle}
      </div>
    </div>
  );
}

function Image({ src, alt }) {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className="object-contain w-full h-auto max-md:mt-4"
    />
  );
}

function Heading() {
  // Get current hour of day (0-23)
  const now = new Date();
  const hour = now.getHours();

  // Determine greeting based on time
  let greeting = "";
  if (hour >= 6 && hour < 12) {
    greeting = "Good Morning";
  } else if (hour >= 12 && hour < 16) {
    greeting = "Good Afternoon";
  } else {
    // Covers both 16:00 - 23:59 and 00:00 - 05:59
    greeting = "Good Evening";
  }

  return (
    <div className="flex flex-col w-full">
      <div
        className="
          px-6 py-2 w-full rounded-3xl shadow-2xl
          bg-cover bg-center h-48 overflow-hidden
        "
        style={{
          backgroundImage: `url("https://s3-alpha-sig.figma.com/img/7151/a0a3/e2f701865993cc6c4df68f40a20f2ba5?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WPqKWclDouPXVxZCtaEyFBtxCOW2zyhQ3Dk~ieg0DDaBKB45m-TIrC3gbLt5Ve76iRWKQtyrqfA48kkMBk9QRR1oQUBGkPk-z-b8NVKINSawiO4VUYG-qvjWeu6fRsz7DA8kPtJd0W7-LTdmbI-o3OAnV~qX45vjWB8v8EULWydBgAy2fdiS8qQK32fRLCS36AJu8Jx2Gez-~GET4kc7fZ1zQSwwVEXRCLKLIzfN1YOdD6~a10gslk0Wh8MtufiveFj0IS2fVOCtm~Hi7WgRReFbJ84xa2WPrXKmZuNhNegqCqVou38ht4OhSPyUltXitgQM9RfH13y0mQq1gCR36A__")`,
        }}
      >
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex-col md:w-1/3 w-full block m-auto">
            <HeadingWithSubtitle
              heading={greeting}
              subtitle="Let's create something incredible together 🚀 🌟"
            />
          </div>
          <div className="flex flex-col md:w-2/4 w-full h-full overflow-hidden">
            <Image
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8fe58e579fa4eeff5f3fc5d4db35e0831c93b1ce6e9aade797b84a750606ab4"
              alt="Hero"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Heading;

