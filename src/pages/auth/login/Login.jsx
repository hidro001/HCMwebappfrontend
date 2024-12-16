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
          background: `url("https://humanmaximizer.com/assets/img/ail_home/hero-bg.png") no-repeat center/cover`,
          backgroundSize: "200% 200%", // Scaled background for animation effect
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
    </>
  );
}
