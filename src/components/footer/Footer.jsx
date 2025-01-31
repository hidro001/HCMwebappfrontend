import React from "react";

const Footer = () => {
  return (
    <footer className="dark:bg-gray-800 dark:text-white w-full py-2">
 <div className="max-w-screen-xl mx-auto flex justify-center items-center space-x-3">
        {/* Company Name + Copyright */}
        <span>
          © {new Date().getFullYear()} Razor Infotech Pvt. Ltd
        </span>

        {/* Separator */}
        <span className="select-none">||</span>

        {/* Privacy Policy */}
        <a href="#" className="hover:text-gray-700">
          Privacy Policy
        </a>

        {/* Separator */}
        <span className="select-none">||</span>

        {/* Terms of Service */}
        <a href="#" className="hover:text-gray-700">
          Terms of Service
        </a>
      </div>
    </footer>
  );
};

export default Footer;

