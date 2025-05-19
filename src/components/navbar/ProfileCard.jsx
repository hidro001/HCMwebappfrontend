import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoClose } from 'react-icons/io5';
import { motion } from "framer-motion";
import useAuthStore from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileSidebar = ({ onClose }) => {
  const authStore = useAuthStore();
  const userAvatar =
    authStore.userAvatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png";
  const userName = authStore.userName || "John Doe";
  const userID = authStore.employeeId || "RI0000";
  const userEmail = authStore.workingEmail || "john.doe@example.com";
  const userDepart = authStore.department || "Work";
  const userDesignation = authStore.designation || "john.doe";

  const navigate = useNavigate();


  // Sign out
  const handleSignOut = () => {
    authStore.logout();
    toast.success("Signed out successfully!");
    navigate("/");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="rounded-lg  w-[360px] h-[auto] bg-white dark:bg-gray-700 shadow-xl z-50"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 font-medium cursor-pointer hover:text-red-600"
        >
          <IoClose size={24} />
        </button>

        <div className="p-2 flex justify-around items-center">
          <img
            src={userAvatar}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-md text-gray-800">
              {userName}
            </h3>
            <span className="text-sm">User ID: {userID}</span>
            <span className="text-sm truncate max-w-[200px]">
              {userEmail}
            </span>
            <span className="text-sm">Department: {userDepart}</span>
            <span className="text-sm truncate max-w-[210px]">Designation: { userDesignation}</span>
          </div>
        </div>

        <div className="mx-4 flex justify-between items-center">
     
          <Link to={"/dashboard/my-profile"} className="text-black flex items-center cursor-pointer font-medium hover:text-blue-900" >
            <FaUserCircle /> <p className="pl-1">My Account</p>
          </Link>
        
          <button onClick={handleSignOut} className="text-red-600 flex items-center cursor-pointer font-medium hover:bg-red-600 hover:text-white rounded-md px-2 py-1 my-2">
            <FiLogOut /> <p className="pl-1">Sign Out</p>
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default ProfileSidebar;
