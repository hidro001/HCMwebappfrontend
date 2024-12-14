import React, { useState, useEffect } from "react";
import {
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaHome,
  FaUserCircle,
  FaCloudSun,
  FaTasks,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";
import { motion } from "framer-motion";
import ThemeToggleButton from "../theme toggle button/ThemeToggleButton";

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState("light");
  const [currentDateTime, setCurrentDateTime] = useState({
    date: "",
    time: "",
  });

  // Toggle Profile Dropdown
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // // Toggle Theme
  // const toggleTheme = () =>
  //   setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // Update Date and Time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDateTime({
        date: now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
        time: now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav
      className={
        "light:bg-green-800 dark:text-white dark:bg-gray-800  text-white px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 shadow-md"
      }
    >
      {/* Left Section: Company Branding */}
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold text-white">
          <img
            className="w-24"
            src="https://res.cloudinary.com/du40x9sao/image/upload/v1732964296/company-logos/company-logos/logo1.png"
            alt=""
          />
        </div>
        <div className="hidden sm:block text-xs font-light text-gray-300">
          Empowering Teams, Building Success
        </div>
      </div>

      {/* Center Section */}
      <div className="hidden md:flex items-center space-x-8">
        <a
          href="#dashboard"
          className="flex items-center text-white hover:text-gray-300 space-x-2"
        >
          <FaHome className="text-blue-400" />
          <span className="text-xs">Dashboard</span>
        </a>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        <div className="hidden md:block  text-sm text-center">
          <div className="text-yellow-300 font-semibold text-xs">
            {currentDateTime.date}
          </div>
          <div className="text-blue-300 font-bold text-xs">
            {currentDateTime.time}
          </div>
        </div>

        <div className="relative">
          <FaBell className="text-yellow-400 w-6 h-6 cursor-pointer" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        {/* <button
          onClick={toggleTheme}
          className="text-gray-300 hover:text-white focus:outline-none"
        >
          {theme === "light" ? (
            <MdOutlineDarkMode className="text-white w-6 h-6" />
          ) : (
            <MdLightMode className="text-yellow-400 w-6 h-6" />
          )}
        </button> */}

        <ThemeToggleButton/>

        <div className="relative">
          <button
            className="flex items-center space-x-2 focus:outline-none"
            onClick={toggleDropdown}
          >
            <img
              src="https://res.cloudinary.com/du40x9sao/image/upload/v1733138036/ems-user-avatars/ems-user-avatars/avatar_RI0526.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>

          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-gray-700 text-white rounded-lg shadow-lg z-10"
            >
              <div className="p-4 border-b border-gray-600">
                <p className="text-sm font-semibold">John Cena</p>
                <p className="text-xs text-gray-300">johncena@hcm.com</p>
              </div>
              <ul className="py-2">
                <li>
                  <a
                    href="#dashboard"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-600"
                  >
                    <FaHome className="mr-2 text-blue-400" /> Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#settings"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-600"
                  >
                    <FaCog className="mr-2 text-green-400" /> Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#signout"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-600"
                  >
                    <FaSignOutAlt className="mr-2 text-red-400" /> Sign Out
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
