// src/components/ThemeToggleButton.js
import  { useContext } from "react";
import { ThemeContext } from "../../hooks/ThemeContext"; // Corrected import path
import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="text-gray-300 hover:text-white focus:outline-none"
      aria-label="Toggle Dark Mode"
    >
      {theme === "light" ? (
        <MdOutlineDarkMode className="text-gray-800 w-6 h-6" />
      ) : (
        <MdLightMode className="text-yellow-400 w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
