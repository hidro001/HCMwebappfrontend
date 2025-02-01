// import  { useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import useAssetStore from "../../../store/useAssetStore";

// const overlayAnimation = {
//   layout: true,
//   initial: { opacity: 0, scale: 0.95 },
//   animate: { opacity: 1, scale: 1 },
//   exit: { opacity: 0, scale: 0.95 },
//   transition: { duration: 0.2 },
// };

// export default function ViewAssetGroupsModal({ isOpen, onClose }) {
//   const { assetGroups, getAssetGroups, deleteAssetGroup } = useAssetStore();

//   useEffect(() => {
//     if (isOpen) {
//       getAssetGroups();
//       const originalStyle = window.getComputedStyle(document.body).overflow;
//       document.body.style.overflow = "hidden";
//       return () => {
//         document.body.style.overflow = originalStyle;
//       };
//     }
//   }, [isOpen, getAssetGroups]);

//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           // className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
//           className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm backdrop-brightness-75"
//           {...overlayAnimation}
//         >
//           <motion.div
//             layout
//             className="bg-white dark:bg-gray-800 rounded-md p-6 w-full max-w-lg shadow-lg"
//             {...overlayAnimation}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold">View Asset Groups</h2>
//               <button
//                 onClick={onClose}
//                 className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 text-2xl leading-none"
//               >
//                 &times;
//               </button>
//             </div>
//             <div
//               className="space-y-4 max-h-[60vh] overflow-auto pr-3
//                          [&::-webkit-scrollbar]:w-2
//                          [&::-webkit-scrollbar-track]:rounded-full
//                          [&::-webkit-scrollbar-track]:bg-gray-100
//                          dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//                          [&::-webkit-scrollbar-thumb]:rounded-full
//                          [&::-webkit-scrollbar-thumb]:bg-gray-400
//                          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
//                          transition-colors duration-300"
//             >
//               {assetGroups.length > 0 ? (
//                 assetGroups.map((group) => (
//                   <div
//                     key={group._id}
//                     className="border rounded-md p-3 flex items-center justify-between"
//                   >
//                     <div className="text-sm">
//                       <p className="mb-1 font-medium">
//                         Group name: <span className="font-normal">{group.name}</span>
//                       </p>
//                       <p className="text-gray-600 dark:text-gray-300">
//                         Group Description: {group.description || "—"}
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => deleteAssetGroup(group._id)}
//                       className="border border-red-400 text-red-500 px-3 py-1 rounded hover:bg-red-50 transition-colors text-sm"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-sm text-gray-500">No asset groups found.</p>
//               )}
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// import React, { useEffect } from "react";
// import Modal from "react-modal";             
// import { motion } from "framer-motion";      
// import useAssetStore from "../../../store/useAssetStore";


// const overlayAnimation = {
//   layout: true,
//   initial: { opacity: 0, scale: 0.95 },
//   animate: { opacity: 1, scale: 1 },
//   exit: { opacity: 0, scale: 0.95 },
//   transition: { duration: 0.2 },
// };

// export default function ViewAssetGroupsModal({ isOpen, onClose }) {
//   const { assetGroups, getAssetGroups, deleteAssetGroup } = useAssetStore();

  
//   useEffect(() => {
//     if (isOpen) {
//       getAssetGroups();
//       const originalStyle = window.getComputedStyle(document.body).overflow;
//       document.body.style.overflow = "hidden";
//       return () => {
//         document.body.style.overflow = originalStyle;
//       };
//     }
//   }, [isOpen, getAssetGroups]);

//   // If not open, no need to render anything
//   if (!isOpen) return null;

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       contentLabel="View Asset Groups"
  
//       overlayClassName={{
//         // Tailwind classes for the dark/blur overlay:
//         base: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm",
//         afterOpen: "",
//         beforeClose: "",
//       }}
    
//       className={{
       
//         base: "",
//         afterOpen: "",
//         beforeClose: "",
//       }}
     
//     >
   
//       <motion.div
//         layout
//         className="bg-white dark:bg-gray-800 rounded-md p-6 w-full max-w-lg shadow-lg"
//         {...overlayAnimation}
//       >
//         {/* Header area */}
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold">View Asset Groups</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-600 hover:text-gray-800 
//                        dark:text-gray-300 dark:hover:text-gray-100 
//                        text-2xl leading-none"
//           >
//             &times;
//           </button>
//         </div>

//         {/* Body area */}
//         <div
//           className="space-y-4 max-h-[60vh] overflow-auto pr-3
//                      [&::-webkit-scrollbar]:w-2
//                      [&::-webkit-scrollbar-track]:rounded-full
//                      [&::-webkit-scrollbar-track]:bg-gray-100
//                      dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//                      [&::-webkit-scrollbar-thumb]:rounded-full
//                      [&::-webkit-scrollbar-thumb]:bg-gray-400
//                      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
//                      transition-colors duration-300"
//         >
//           {assetGroups.length > 0 ? (
//             assetGroups.map((group) => (
//               <div
//                 key={group._id}
//                 className="border rounded-md p-3 flex items-center justify-between"
//               >
//                 <div className="text-sm">
//                   <p className="mb-1 font-medium">
//                     Group name:{" "}
//                     <span className="font-normal">{group.name}</span>
//                   </p>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     Group Description: {group.description || "—"}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => deleteAssetGroup(group._id)}
//                   className="border border-red-400 text-red-500 
//                              px-3 py-1 rounded 
//                              hover:bg-red-50 
//                              transition-colors 
//                              text-sm"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500">No asset groups found.</p>
//           )}
//         </div>
//       </motion.div>
//     </Modal>
//   );
// }


import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useAssetStore from "../../../store/useAssetStore";

// Import the BaseModal
import BaseModal from "../../common/BaseModal"; 

const overlayAnimation = {
  layout: true,
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2 },
};

export default function ViewAssetGroupsModal({ isOpen, onClose }) {
  const { assetGroups, getAssetGroups, deleteAssetGroup } = useAssetStore();

  useEffect(() => {
    if (isOpen) {
      getAssetGroups();
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen, getAssetGroups]);

  // If not open, no need to render anything
  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
  
      <motion.div
        layout
        className="bg-white dark:bg-gray-800 rounded-md p-6 w-full max-w-lg shadow-lg"
        {...overlayAnimation}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">View Asset Groups</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 
                       dark:text-gray-300 dark:hover:text-gray-100 
                       text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Modal body */}
        <div
          className="space-y-4 max-h-[60vh] overflow-auto pr-3
                     [&::-webkit-scrollbar]:w-2
                     [&::-webkit-scrollbar-track]:rounded-full
                     [&::-webkit-scrollbar-track]:bg-gray-100
                     dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                     [&::-webkit-scrollbar-thumb]:rounded-full
                     [&::-webkit-scrollbar-thumb]:bg-gray-400
                     dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                     transition-colors duration-300"
        >
          {assetGroups.length > 0 ? (
            assetGroups.map((group) => (
              <div
                key={group._id}
                className="border rounded-md p-3 flex items-center justify-between"
              >
                <div className="text-sm">
                  <p className="mb-1 font-medium">
                    Group name:{" "}
                    <span className="font-normal">{group.name}</span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Group Description: {group.description || "—"}
                  </p>
                </div>
                <button
                  onClick={() => deleteAssetGroup(group._id)}
                  className="border border-red-400 text-red-500 
                             px-3 py-1 rounded 
                             hover:bg-red-50 
                             transition-colors 
                             text-sm"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No asset groups found.</p>
          )}
        </div>
      </motion.div>
    </BaseModal>
  );
}


