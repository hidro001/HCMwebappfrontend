import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import { LoginCard, LoginContent } from "../../../components";

export default function Login(props) {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Stack
        direction={{ xs: "column", md: "row" }} // Responsive direction
        component="main"
        sx={{
          justifyContent: "space-around",
          alignItems: "center",
          minHeight: "100vh", // Use minHeight for better responsiveness
          // background: `url("https://humanmaximizer.com/assets/img/ail_home/hero-bg.png") no-repeat center/cover`,
          // background: `url("https://files.oaiusercontent.com/file-6AbBT4zQm9VeLNBcD4DTHD?se=2024-12-17T07%3A05%3A01Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D0a790793-96c0-496c-adfa-d49eccec2dcc.webp&sig=XqtwIMkL%2BrTbmGLUa6yUCHsHkgS%2BwAHwxAs2OoIY21Q%3D") no-repeat center`,
          background: `url("https://files.oaiusercontent.com/file-XiSUZfWFbZpMLDSMpyD439?se=2024-12-17T07%3A07%3A52Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dc18c7350-ffad-40d5-aaf7-56b865f94dcb.webp&sig=Ijrs24gWPo2irrZxy8n//xAo5FFHVxd75gUQ0/1mm8c%3D") no-repeat center`,
          backgroundSize: "200% 200%", // Scaled background for animation effect
          backgroundBlendMode: "overlay",
          animation: "gradientShift 50s ease-in-out infinite",
          "@keyframes gradientShift": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
          padding: 2, // Add padding for smaller screens
        }}
      >
        {/* Login Content */}
        <LoginContent />
        <LoginCard />
      </Stack>
    </>
  );
}
