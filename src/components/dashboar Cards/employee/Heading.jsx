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
      <div className="relative w-full h-64 overflow-hidden  shadow-2xl">
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






