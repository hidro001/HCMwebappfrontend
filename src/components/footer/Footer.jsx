// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="dark:bg-gray-800 dark:text-white w-full py-2 ">
//       <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
//         <p className="text-sm">
//           &copy; {new Date().getFullYear()} Razor Infotech Pvt Ltd. All rights reserved.
//         </p>
//         <ul className="flex space-x-4 mt-1 md:mt-0">
//           <li>
//             <a
//               href="#"
//               className="hover:text-green-500 transition text-sm duration-300"
//             >
//               Privacy Policy
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="hover:text-green-500 transition text-sm duration-300"
//             >
//               Terms of Service
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="hover:text-green-500 transition text-sm duration-300"
//             >
//               Contact Us
//             </a>
//           </li>
//         </ul>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-500 text-sm py-2">
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
