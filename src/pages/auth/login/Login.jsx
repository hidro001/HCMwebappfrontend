// src/pages/Login.js
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import { LoginCard, Footer, LoginContent } from "../../../components";
import { useTheme } from "@mui/material";

export default function Login(props) {
  const theme = useTheme();

  // Define background images for light and dark themes
  const lightBackgroundImage =
    "https://humanmaximizer.com/assets/img/ail_home/hero-bg.png";
  const darkBackgroundImage =
    "https://files.oaiusercontent.com/file-XiSUZfWFbZpMLDSMpyD439?se=2024-12-17T07%3A07%3A52Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dc18c7350-ffad-40d5-aaf7-56b865f94dcb.webp&sig=Ijrs24gWPo2irrZxy8n//xAo5FFHVxd75gUQ0/1mm8c%3D";

  // Select the appropriate background image based on the theme
  const backgroundImage =
    theme.palette.mode === "dark" ? darkBackgroundImage : lightBackgroundImage;

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
          background: `url("${backgroundImage}") no-repeat center/cover`,
          backgroundSize: "cover", // Adjusted for better coverage
          backgroundBlendMode: "overlay",
          animation: "gradientShift 40s ease-in-out infinite",
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
      <Footer />
    </>
  );
}
