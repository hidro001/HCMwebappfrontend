import  { useContext } from "react";
import { ThemeContext } from "../../hooks/ThemeContext"; // Corrected import path
import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-green-50 rounded-2xl border border-green-100 hover:bg-green-100 text-gray-300 hover:text-white focus:outline-none"
      aria-label="Toggle Dark Mode"
    >
      {theme === "light" ? (
        <MdOutlineDarkMode className="text-gray-800 w-5 h-5" />
      ) : (
        <MdLightMode className="text-yellow-400 w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
