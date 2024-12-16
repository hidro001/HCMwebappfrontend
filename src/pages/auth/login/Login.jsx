// import React from "react";
// import CssBaseline from "@mui/material/CssBaseline";
// import Stack from "@mui/material/Stack";
// import { LoginCard, LoginContent } from "../../../components";

// export default function Login(props) {
//   return (
//     <>
//       <CssBaseline enableColorScheme />
//       <Stack

//         direction="column"
//         component="main"
//         sx={[
//           {
//             justifyContent: "center",
//             height: "calc((1 - var(--template-frame-height, 0)) * 100%)",
//             marginTop: "max(40px - var(--template-frame-height, 0px), 0px)",
//             minHeight: "100%",
//           },
//           (theme) => ({
//             "&::before": {
//               content: '""',
//               display: "block",
//               position: "absolute",
//               zIndex: -1,
//               inset: 0,
//               backgroundImage:
//                 "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
//               backgroundRepeat: "no-repeat",
//               ...theme.applyStyles("dark", {
//                 backgroundImage:
//                   "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
//               }),
//             },
//           }),
//         ]}
//       >
//         <Stack
//           direction={{ xs: "column-reverse", md: "row" }}
//           sx={{
//             justifyContent: "center",
//             gap: { xs: 6, sm: 12 },
//             p: 2,
//             mx: "auto",
//           }}
//         >
//           <Stack
//             direction={{ xs: "column-reverse", md: "row" }}
//             sx={{
//               justifyContent: "center",
//               gap: { xs: 6, sm: 12 },
//               p: { xs: 2, sm: 4 },
//               m: "auto",
//             }}
//           >
//             <LoginContent />
//             <LoginCard />
//           </Stack>
//         </Stack>
//       </Stack>
//     </>
//   );
// }

// // src/pages/auth/login/Login.js
// import React from "react";
// import CssBaseline from "@mui/material/CssBaseline";
// import Stack from "@mui/material/Stack";
// import { LoginCard, LoginContent } from "../../../components";

// export default function Login(props) {
//   return (
//     <>
//       <CssBaseline enableColorScheme />

//       <Stack
//         direction="row"
//         component="main"
//         sx={{
//           justifyContent: "space-around",
//           alignItems: "center",
//           height: "100vh",
//           background: `url("https://humanmaximizer.com/assets/img/ail_home/hero-bg.png") no-repeat center/cover`,
//           backgroundSize: "cover",
//           backgroundBlendMode: "overlay",
//           animation: "gradient 10s ease infinite",
//           "@keyframes gradient": {
//             "0%": { backgroundPosition: "0% 50%" },
//             "50%": { backgroundPosition: "100% 50%" },
//             "100%": { backgroundPosition: "0% 50%" },
//           },
//         }}
//       >
//         {/* Login Content */}
//         <LoginContent />
//         <LoginCard />
//       </Stack>
//     </>
//   );
// }


// // src/pages/auth/login/Login.js
// import React from "react";
// import CssBaseline from "@mui/material/CssBaseline";
// import Stack from "@mui/material/Stack";
// import { LoginCard, LoginContent } from "../../../components";

// export default function Login(props) {
//   return (
//     <>
//       <CssBaseline enableColorScheme />

//       <Stack
//         direction="row"
//         component="main"
//         sx={{
//           justifyContent: "space-around",
//           alignItems: "center",
//           height: "100vh",
//           background: `url("https://humanmaximizer.com/assets/img/ail_home/hero-bg.png") no-repeat center/cover`,
//           backgroundSize: "200% 200% ", // Scaled background for animation effect
//           // backgroundSize: "cover", // Scaled background for animation effect
//           backgroundBlendMode: "overlay",
//           animation: "gradientShift 40s ease-in-out infinite", // Applying the animation
//           "@keyframes gradientShift": {
//             "0%": { backgroundPosition: "0% 50%" },
//             "50%": { backgroundPosition: "100% 50%" },
//             "100%": { backgroundPosition: "0% 50%" },
//           },
//         }}
//       >
//         {/* Login Content */}
//         <LoginContent />
//         <LoginCard />
//       </Stack>
//     </>
//   );
// }

// src/pages/auth/login/Login.js
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import { Footer, LoginCard, LoginContent } from "../../../components";

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
          <Footer/>
    </>
  );
}
