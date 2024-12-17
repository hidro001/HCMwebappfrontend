import React from "react";

const Footer = () => {
  return (
    <footer className="dark:bg-gray-800 dark:text-white py-3">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
        <ul className="flex space-x-4 mt-2 md:mt-0">
          <li>
            <a
              href="#"
              className="hover:text-green-500 transition duration-300"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-green-500 transition duration-300"
            >
              Terms of Service
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-green-500 transition duration-300"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
