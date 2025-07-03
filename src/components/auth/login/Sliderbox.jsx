


import React from "react";
import Slider from "react-slick";

// These bring in Slick’s base styling
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Sliderbox() {
  const images = [
    { url: "/mouse.gif" },
    { url: "/mouse2.gif" },
    { url: "/mouse3.gif" },
    { url: "/mouse4.gif" },
    { url: "/mouse5.gif" },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="flex items-center justify-center w-full p-4">
      {/* 
        Render a plain <style> tag (no `jsx` prop) 
        whose contents come from our `sliderCss` constant below. 
      */}
      <style>
        {sliderCss}
      </style>

      <div className="w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-md rounded-lg overflow-hidden">
        <Slider {...settings}>
          {images.map((imageObj, index) => (
            <div key={index}>
              <img
                src={imageObj.url}
                alt={`Slide ${index}`}
                className="w-full h-auto object-fill"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────── */
/* Define your “stylesheet” (CSS text) as a JS constant at the bottom of this file */
const sliderCss = `
  /* Move Slick’s default dots up a bit, so they don’t overlap your images */
  .slick-dots {
    bottom: 15px;
  }

  /* Shrink the dot-size and give it a semi-transparent white */
  .slick-dots li button:before {
    font-size: 0.625rem; /* ~10px */
    color: white;
    opacity: 0.5;
  }

  /* When a dot is “active,” make it fully opaque */
  .slick-dots li.slick-active button:before {
    opacity: 1;
  }
`;
