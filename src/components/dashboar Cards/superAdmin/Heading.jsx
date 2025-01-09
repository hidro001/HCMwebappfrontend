
// import * as React from "react";

// function HeadingWithSubtitle({ heading, subtitle }) {
//   return (
//     <div className="flex flex-col self-stretch my-auto max-md:mt-10 max-md:max-w-full">
//       <div className="self-start text-5xl font-bold text-blue-600 max-md:text-4xl">
//         {heading}
//       </div>
//       <div className="mt-6 text-xl text-fuchsia-800 max-md:max-w-full">
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
//       className="object-contain grow w-full aspect-[3.13] max-md:mt-4 max-md:max-w-full"
//     />
//   );
// }

// function Heading() {
//   return (
//     <div className="flex flex-col w-full">
//       <div
//         className="px-6 py-px w-full rounded-3xl  max-md:px-5 max-md:max-w-full shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]"
//         style={{
//           backgroundImage: `url("https://s3-alpha-sig.figma.com/img/7151/a0a3/e2f701865993cc6c4df68f40a20f2ba5?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WPqKWclDouPXVxZCtaEyFBtxCOW2zyhQ3Dk~ieg0DDaBKB45m-TIrC3gbLt5Ve76iRWKQtyrqfA48kkMBk9QRR1oQUBGkPk-z-b8NVKINSawiO4VUYG-qvjWeu6fRsz7DA8kPtJd0W7-LTdmbI-o3OAnV~qX45vjWB8v8EULWydBgAy2fdiS8qQK32fRLCS36AJu8Jx2Gez-~GET4kc7fZ1zQSwwVEXRCLKLIzfN1YOdD6~a10gslk0Wh8MtufiveFj0IS2fVOCtm~Hi7WgRReFbJ84xa2WPrXKmZuNhNegqCqVou38ht4OhSPyUltXitgQM9RfH13y0mQq1gCR36A__")`,
//           backgroundSize: 'cover', // adjust as needed
//           backgroundPosition: 'center', // adjust as needed
//         }}
//       >
//         <div className="flex gap-5 max-md:flex-col">
//           <div className="flex flex-col w-[37%] max-md:ml-0 max-md:w-full">
//             <HeadingWithSubtitle
//               heading="Good Morning"
//               subtitle="Let's create something incredible together 🚀 🌟"
//             />
//           </div>
//           <div className="flex flex-col ml-5 w-[63%] max-md:ml-0  ">
//             <Image
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8fe58e579fa4eeff5f3fc5d4db35e0831c93b1ce6e9aade797b84a750606ab4?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//               alt=""
//             />
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
  return (
    <div className="flex flex-col w-full">
      <div
        className="
          px-6 py-2 w-full rounded-3xl shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]
          bg-cover bg-center
        "
        style={{
          backgroundImage: `url("https://s3-alpha-sig.figma.com/img/7151/a0a3/e2f701865993cc6c4df68f40a20f2ba5")`,
        }}
      >
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col md:w-1/3 w-full">
            <HeadingWithSubtitle
              heading="Good Morning"
              subtitle="Let's create something incredible together 🚀 🌟"
            />
          </div>
          <div className="flex flex-col md:w-2/3 w-full">
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
