// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function Sliderbox() {
//   const settings = {
//     dots: true, // shows pagination dots
//     infinite: true, // loops through slides
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true, // auto-slide
//     autoplaySpeed: 3000, // time in ms between each slide
//     arrows: true, // hides next/prev arrows
//   };

//   return (
//     // Full-screen wrapper with blue background
//     <div className="flex items-center justify-center bg-black w-full  p-4 ">
//       <style jsx>{`
//         /* Slick Dots Customization */
//         .slick-dots {
//           bottom: 15px; /* adjust spacing as needed */
//         }
//         .slick-dots li button:before {
//           font-size: 0.625rem; /* ~10px */
//           color: white;
//           opacity: 0.5;
//         }
//         .slick-dots li.slick-active button:before {
//           color: white;
//           opacity: 1;
//         }
//       `}</style>

//       <div className="w-full max-w-md rounded-2xl overflow-hidden  ">
//         <Slider {...settings}>
//           <div>
//             <img
//               src="https://images.unsplash.com/photo-1735776327649-eeb6b6ed8829?q=80&w=1974&auto=format&fit=crop"
//               alt="slide-1"
//               className="w-full h-auto object-cover"
//             />
//           </div>
//           <div>
//             <img
//               src="https://images.unsplash.com/photo-1735661998642-71a998eaf912?q=80&w=1974&auto=format&fit=crop"
//               alt="slide-2"
//               className="w-full h-auto object-cover"
//             />
//           </div>
//           <div>
//             <img
//               src="https://plus.unsplash.com/premium_photo-1689607809844-dda6391f83b4?q=80&w=1974&auto=format&fit=crop"
//               alt="slide-3"
//               className="w-full h-auto object-cover"
//             />
//           </div>
//         </Slider>
//       </div>

//       {/* Rounded, max-width container */}
//     </div>
//   );
// }

// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function Sliderbox() {

//   const images = [
//     {
//       "url":"https://lh3.googleusercontent.com/chat_attachment/AP1Ws4t_iOw7dvaDVuann0pqPxWJWqM0giL6tZcl6G97TMl4Tp-n8NF1Z5qM4S17e6UfpIQRNF-LTdevCgBjQoyEkPdQgx9N4wr-zOaN62WhzR4mIu4H-P1e-BKmfnaFUrs0JXYeApIGdQSon88Kqr5C3WsU8ZtqRkJxILjMHoiwqXfZOhKzUE_XfB8-xRtrWtguR9HR6nGBxr2Picj8EcXkyfYobxZPZu0ClQMNcN9mJmTp3WBk7HUMy4Io_4nBh-6CcZTP90BVIE5xEJ6Ri0pgRc9lmUD6uojVzgNlp57CLvnAZ7IxpQpCQdRHKdDcTICtNlM=w1920-h917"
//     },
//     {
// "url":"https://chat.google.com/u/0/api/get_attachment_url?url_type=FIFE_URL&content_type=image%2Fgif&attachment_token=AOo0EEVn2I4CHxZipwQQFnL3McvnmReZUNZ4Evy9aAOpxaS3lB0XR2N%2F0S1vWQImlBAPPd0y6xWJJU4Tno%2FWSHq00UpmhQ54uNB%2BDjsGb5rQFeyST8YStUDePeUWDBcjNtR%2FgqTNKF%2FnMFKGeWj%2F6dwh2pY9Nb297pgkD0zKKegO8tTBll5G13qsb%2BAGqr3i6LCJnGu8pgzklKUybJ%2F5ZZ1ZRwG7eksqnK0pJhr9TXlghrN1P%2BipZaalW1VIjo3VbtX9uZu66Lv4OVG%2F0hPcSGI1U9P3IHBtNh%2Bp%2BABFxKoUf2oFybhs7hdDYHK6PncR04Avko57YAjB66iMCE%2BXXuvd09ETD5lf3TFgzbE%2BrtrLULhigQL7LPS2LPBAOGk7ytxH17kgSm8baeA5cYeJDLnn3ymxzofsQmxk61gJ3y7rEa8E3cbqzgmZlw7r9Au7UrA%2BdCABrMFqFdAWZxnUyxIoGcemIsYGaAshnWtFYbANu246Bmmzpy4cwpkT8Ebj8JhNLAov2dV2v4wc%2FT%2FAeffw5owGen6rGH%2BTzzSrq1jd4lJYI1tCE7qnsvJ91IvedwPz3r1yoDN%2FWzZOI5ZuoA%3D%3D&allow_caching=true&sz=w1920-h917"
//     }
//   ];

//   const settings = {
//     dots: false, // shows pagination dots
//     infinite: true, // loops through slides
//     speed: 500,
//     slidesToShow: 1, // default slides on large screens
//     slidesToScroll: 1,
//     autoplay: true, // auto-slide
//     autoplaySpeed: 3000, // time in ms between each slide
//     arrows: false, // hides next/prev arrows

//     // Optional: Adjust slides per viewport size
//     responsive: [
//       {
//         breakpoint: 1024, // screens < 1024px
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 768, // screens < 768px
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     // Full-screen wrapper with a background color
//     <div className="flex items-center justify-center w-full  p-4  ">
//       <style jsx>{`
//         /* Slick Dots Customization */
//         .slick-dots {
//           bottom: 15px; /* adjust spacing as needed */
//         }
//         .slick-dots li button:before {
//           font-size: 0.625rem; /* ~10px */
//           color: white;
//           opacity: 0.5;
//         }
//         .slick-dots li.slick-active button:before {
//           color: white;
//           opacity: 1;
//         }
//       `}</style>

//       <div className="w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-md rounded-lg overflow-hidden ">
//         <Slider {...settings}>
//         {images.map((url, index) => (
//           <div key={index}>
//             <img
//               src={url}
//               alt={`Game ${index}`}
//               className="w-full h-auto object-fill "
//             />
//           </div>
//         ))}
//         </Slider>
//       </div>
//     </div>
//   );
// }

import React from "react";
import Slider from "react-slick";

// Make sure you have these imports for styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Sliderbox() {
  // Each item is an object with a "url" property
  const images = [
    {
      url: "/mouse.gif",
    },
    {
      url: "/mouse2.gif",
    },
  ];

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,

    // Responsive breakpoints
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="flex items-center justify-center w-full p-4 ">
      <style jsx>{`
        /* Slick Dots Customization */
        .slick-dots {
          bottom: 15px; /* Adjust spacing as needed */
        }
        .slick-dots li button:before {
          font-size: 0.625rem; /* ~10px */
          color: white;
          opacity: 0.5;
        }
        .slick-dots li.slick-active button:before {
          color: white;
          opacity: 1;
        }
      `}</style>

      <div className="w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-md rounded-lg overflow-hidden">
        <Slider {...settings}>
          {images.map((imageObj, index) => (
            <div key={index}>
              <img
                src={imageObj.url} // Access the .url property of each object
                alt={`Game ${index}`}
                className="w-full h-auto object-fill"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
