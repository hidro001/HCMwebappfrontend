// import  { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { fetchCompanyInfo, resetPassword } from "../../../service/service"; // Import the service functions
// import CircularProgress from "@mui/material/CircularProgress"; // Material UI loading spinner

// const ResetPassword = () => {
//   const { resetToken } = useParams();
//   const navigate = useNavigate();
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [companyLogo, setCompanyLogo] = useState("");
//   const [logoLoading, setLogoLoading] = useState(true); // State for logo loading

//   // Fetch Company Logo
//   useEffect(() => {
//     const getCompanyLogo = async () => {
//       try {
//         const companyData = await fetchCompanyInfo();
//         if (companyData && companyData.length > 0) {
//           setCompanyLogo(companyData[0].logo);
//         } else {
//           setCompanyLogo("https://ems11.s3.amazonaws.com/logo-HM+(1).png");
//         }
//       } catch (error) {
//         console.error("Error fetching company logo:", error);
//         setCompanyLogo("https://ems11.s3.amazonaws.com/logo-HM+(1).png");
//       } finally {
//         setLogoLoading(false);
//       }
//     };

//     getCompanyLogo();
//   }, []);

//   const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

//   const handleResetPassword = async (e) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match.");
//       return;
//     }

//     setLoading(true);
//     try {
//       await resetPassword(resetToken, newPassword, confirmPassword);
//       toast.success("Password reset successful. Redirecting to login...");
//       navigate("/");
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
//         {/* Logo with loading spinner */}
//         <div className="flex justify-center mb-6">
//           {logoLoading ? (
//             <CircularProgress color="primary" />
//           ) : (
//             <img
//               src={companyLogo}
//               alt="Company Logo"
//               className="w-20 h-auto"
//               onLoad={() => setLogoLoading(false)} // Ensure spinner hides after logo is loaded
//             />
//           )}
//         </div>

//         {/* Header */}
//         <h2 className="text-center text-2xl font-bold text-gray-800">
//           Set New Password
//         </h2>
//         <p className="text-center text-sm text-gray-600 mb-6">
//           Enter your new password below
//         </p>

//         {/* Form */}
//         <form onSubmit={handleResetPassword} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               New Password
//             </label>
//             <div className="relative">
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 placeholder="Enter new password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//                 className="w-full mt-1 p-3 border rounded-lg text-sm text-gray-700 focus:ring focus:ring-blue-500 focus:outline-none"
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//               >
//                 {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Confirm New Password
//             </label>
//             <div className="relative">
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 placeholder="Confirm new password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 className="w-full mt-1 p-3 border rounded-lg text-sm text-gray-700 focus:ring focus:ring-blue-500 focus:outline-none"
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//               >
//                 {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 focus:outline-none shadow-lg transition duration-300"
//           >
//             {loading ? "Resetting..." : "Reset Password"}
//           </button>
//         </form>

//         <div className="text-center mt-6 text-sm text-gray-500">
//           <p>&copy; Razor Infotech Pvt. Ltd. | Privacy Policy | Terms of Service</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCompanyInfo, resetPassword } from "../../../service/service";
import CircularProgress from "@mui/material/CircularProgress";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companyLogo, setCompanyLogo] = useState("");
  const [logoLoading, setLogoLoading] = useState(true);

  // Fetch Company Logo
  useEffect(() => {
    const getCompanyLogo = async () => {
      try {
        const companyData = await fetchCompanyInfo();
        if (companyData && companyData.length > 0) {
          setCompanyLogo(companyData[0].logo);
        } else {
          setCompanyLogo("https://ems11.s3.amazonaws.com/logo-HM+(1).png");
        }
      } catch (error) {
        console.error("Error fetching company logo:", error);
        setCompanyLogo("https://ems11.s3.amazonaws.com/logo-HM+(1).png");
      } finally {
        setLogoLoading(false);
      }
    };

    getCompanyLogo();
  }, []);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(resetToken, newPassword, confirmPassword);
      toast.success("Password reset successful. Redirecting to login...");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl dark:bg-gray-800 dark:shadow-lg">
        {/* Logo with loading spinner */}
        <div className="flex justify-center mb-6">
          {logoLoading ? (
            <CircularProgress color="primary" />
          ) : (
            <img
              src={companyLogo}
              alt="Company Logo"
              className="w-20 h-auto"
              onLoad={() => setLogoLoading(false)}
            />
          )}
        </div>

        {/* Header */}
        <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-gray-100">
          Set New Password
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6 dark:text-gray-400">
          Enter your new password below
        </p>

        {/* Form */}
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              New Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full mt-1 p-3 border rounded-lg text-sm text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full mt-1 p-3 border rounded-lg text-sm text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 focus:outline-none shadow-lg transition duration-300 disabled:opacity-70"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>
            &copy; Razor Infotech Pvt. Ltd. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
