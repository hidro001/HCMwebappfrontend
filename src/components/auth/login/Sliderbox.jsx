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

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Sliderbox() {

  const generateRandomIds = (count) => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 1000)); // Generate IDs between 0 and 999
  };

  const ids = generateRandomIds(3); // Generate 3 random IDs
  const images = ids.map((id) => `https://via.assets.so/movie.png?id=${id}&q=95&w=360&h=560&fit=cover`);



  const settings = {
    dots: false, // shows pagination dots
    infinite: true, // loops through slides
    speed: 500,
    slidesToShow: 1, // default slides on large screens
    slidesToScroll: 1,
    autoplay: true, // auto-slide
    autoplaySpeed: 3000, // time in ms between each slide
    arrows: false, // hides next/prev arrows

    // Optional: Adjust slides per viewport size
    responsive: [
      {
        breakpoint: 1024, // screens < 1024px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // screens < 768px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    // Full-screen wrapper with a background color
    <div className="flex items-center justify-center w-full  p-4  ">
      <style jsx>{`
        /* Slick Dots Customization */
        .slick-dots {
          bottom: 15px; /* adjust spacing as needed */
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

      <div className="w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-md rounded-lg overflow-hidden ">
        <Slider {...settings}>
        {images.map((url, index) => (
          <div key={index}>
            <img
              src={url}
              alt={`Game ${index}`}
              className="w-full h-auto object-fill "
            />
          </div>
        ))}
        </Slider>
      </div>
    </div>
  );
}
