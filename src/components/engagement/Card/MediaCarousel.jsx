import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const getMediaType = (url) => {
  if (/\.(jpeg|jpg|png|gif|webp|svg)$/i.test(url)) return "image";
  if (/\.(mp4|webm|ogg|mov)$/i.test(url)) return "video";
  return "unknown";
};

const MediaCarousel = ({ media = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const PrevArrow = (props) => (
        <div
            onClick={props.onClick}
            className="absolute z-20 left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 text-gray-700 dark:text-white rounded-full p-2 shadow cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
        >
            <FaChevronLeft size={16} />
        </div>
  );

  const NextArrow = (props) => (
    <div
        onClick={props.onClick}
        className="absolute z-20 right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 text-gray-700 dark:text-white rounded-full p-2 shadow cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
    >
        <FaChevronRight size={16} />
    </div>
  )

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setCurrentIndex(index),
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  useEffect(() => {
    setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
  }, []);          

  if (!Array.isArray(media) || media.length === 0) return null;

  return (
    <div className="relative w-full max-w-lg mx-auto mt-6 rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
    
      <div className="absolute top-2 right-2 z-20 bg-gray/70 backdrop-blur-md text-gray-800 dark:text-white text-xs px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 shadow">
        {currentIndex + 1} / {media.length}
      </div>

      <Slider {...settings}>
        {media.map((url, idx) => {
          const mediaType = getMediaType(url);
          return (
           <div
            key={idx}
            className="relative w-auto h-[60vh] aspect-[4/5] bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
            >

              {mediaType === "image" ? (
                // <img
                //   src={url}
                //   alt={`media-${idx}`}
                //   className="object-contain max-h-full w-auto max-w-full rounded-lg shadow"
                // />
                <img
                    src={url}
                    alt={`media-${idx}`}
                    className="object-contain  w-full h-full rounded-lg shadow"
                    />

              ) : mediaType === "video" ? (
                // <video
                //   src={url}
                //   controls
                //   className="max-h-full max-w-full rounded-lg shadow"
                // />

                <video
                src={url}
                controls
                className="object-contain w-full h-full rounded-lg shadow"
                />
              ) : (
                <p className="text-red-500 text-sm">Unsupported media</p>
              )}
            </div>
          );
        })}
      </Slider>
    </div>
  );
};


export default MediaCarousel;
