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
    {
      url: "/mouse3.gif",
    },
    {
      url: "/mouse4.gif",
    },
    {
      url: "/mouse5.gif",
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
