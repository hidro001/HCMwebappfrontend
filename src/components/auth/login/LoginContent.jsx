import React from "react";
import Stack from "@mui/material/Stack";
import useAuthStore from '../../../store/store';

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
          className="hm-logo-img "
        />
        
      </div>
    </Stack>
  );
}
