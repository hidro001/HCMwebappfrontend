// import React, { useState, useEffect } from "react";
// import Stack from "@mui/material/Stack";
// import axios from "axios";

// export default function LoginContent() {
//   const [companyInfo, setCompanyInfo] = useState([]);

//   useEffect(() => {
//     fetchCompanyLogo();
//   }, []);
//   console.log(companyInfo);

//   const fetchCompanyLogo = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:6060/api/v1/superadmin/info/getCompanyInfo"
//       );
//       if (response.data.success && response.data.data[0]?.logo) {
//         setCompanyInfo(response.data.data);
//       } else {
//         setCompanyInfo(null);
//       }
//     } catch (error) {
//       console.error("Error fetching company logo:", error.message);
//       toast.error("Failed to load company logo.");
//     }
//   };
//   return (
//     <>
//       <Stack 
//         sx={{
//           flexDirection: "column",
//           alignSelf: "center",
//           gap: 4,
//           maxWidth: 450,
//         }}
//       >
//         <div className="rzrems-logo-container">
//           {/* Dynamically fetched company logo with fallback */}
//           {Array.isArray(companyInfo) && companyInfo.length > 0 ? (
//             companyInfo.map((data, index) => (
//               <img
//                 key={index}
//                 src={
//                   data.logo
//                     ? data.logo
//                     : "https://ems11.s3.amazonaws.com/logo-HM+(1).png"
//                 }
//                 alt="Logo"
//                 className=""
//               />
//             ))
//           ) : (
//             <img
//               src="https://ems11.s3.amazonaws.com/logo-HM+(1).png"
//               alt="Fallback Logo"
//               className="hm-logo-img"
//             />
//           )}
//           <h6 className="text-center">Product Of Razor Infotech</h6>
//         </div>
//       </Stack>
//     </>
//   );
// }


// src/components/LoginContent.js
import React from "react";
import Stack from "@mui/material/Stack";
import useAuthStore from '../../../store/store';
import { toast } from 'react-toastify'; // Import toast for notifications

export default function LoginContent() {
  // Access companyInfo from Zustand store
  const companyInfo = useAuthStore((state) => state.companyInfo);

  // Handle scenarios where companyInfo might not be available
  if (!companyInfo) {
    // Optionally, you can display a loader or placeholder
    return (
      <Stack 
        sx={{
          flexDirection: "column",
          alignSelf: "center",
          gap: 4,
          maxWidth: 450,
        }}
      >
        <div className="rzrems-logo-container">
          <img
            src="https://ems11.s3.amazonaws.com/logo-HM+(1).png"
            alt="Fallback Logo"
            className="hm-logo-img"
          />
          <h6 className="text-center">Product Of Razor Infotech</h6>
        </div>
      </Stack>
    );
  }

  return (
    <Stack 
      sx={{
        flexDirection: "column",
        alignSelf: "center",
        gap: 4,
        maxWidth: 450,
      }}
    >
      <div className="rzrems-logo-container">
        {/* Display company logo with fallback */}
        <img
          src={companyInfo.logo || "https://ems11.s3.amazonaws.com/logo-HM+(1).png"}
          alt="Company Logo"
          className="hm-logo-img"
        />
        
      </div>
    </Stack>
  );
}
