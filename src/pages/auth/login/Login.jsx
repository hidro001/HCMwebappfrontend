// import React from "react";
// import CssBaseline from "@mui/material/CssBaseline";
// import Stack from "@mui/material/Stack";
// import { LoginCard, Footer, LoginContent } from "../../../components";
// import { useTheme } from "@mui/material";

// export default function Login(props) {
//   const theme = useTheme();

//   // Define background images for light and dark themes
//   const lightBackgroundImage =
//     "https://humanmaximizer.com/assets/img/ail_home/hero-bg.png";
//   const darkBackgroundImage =
//     "https://files.oaiusercontent.com/file-XiSUZfWFbZpMLDSMpyD439?se=2024-12-17T08%3A07%3A39Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dc18c7350-ffad-40d5-aaf7-56b865f94dcb.webp&sig=Y6RxEFROq9W7Ivvo8cqATqvCatWAyIX9newkSpGwS/0%3D"

//   // Select the appropriate background image based on the theme
//   const backgroundImage =
//     theme.palette.mode === "dark" ? darkBackgroundImage : lightBackgroundImage;

//   return (
//     <>
//       <CssBaseline enableColorScheme />
//       <Stack
//       className="border border-red-700"
//         direction={{ xs: "column", md: "row" }} // Responsive direction
//         component="main"
//         sx={{
//           justifyContent: "space-around",
//           alignItems: "center",
//           minHeight: "100vh", // Use minHeight for better responsiveness
//           background: `url("${backgroundImage}") no-repeat center`,
//           // backgroundSize: "cover", // Adjusted for better coverage
//           backgroundBlendMode: "overlay",
//           backgroundSize: "200% 200%",
//           animation: "gradientShift 40s ease-in-out infinite",
//           "@keyframes gradientShift": {
//             "0%": { backgroundPosition: "0% 50%" },
//             "50%": { backgroundPosition: "100% 50%" },
//             "100%": { backgroundPosition: "0% 50%" },
//           },
//           padding: 2, // Add padding for smaller screens
//         }}
//       >
//         {/* Login Content */}
//         <div className="border border-green-700" >         <LoginContent   />     </div>
//         <div className="border border-red-700" >          <LoginCard  />    </div>
    
  
//       </Stack>
//       <Footer />
//     </>
//   );
// }

// // src/pages/SomePage/Login/index.jsx
// import React from "react";
// import CssBaseline from "@mui/material/CssBaseline";
// import Box from "@mui/material/Box";
// import { useTheme } from "@mui/material/styles";
// import { LoginCard, Footer, LoginContent } from "../../../components";
// import Sliderbox from "../../../components/auth/login/Sliderbox"; // <-- Your new slider

// export default function Login() {
//   const theme = useTheme();

//   return (
//     <>
//       <CssBaseline enableColorScheme />

//       {/* Main container: full viewport height */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "row",      // side-by-side layout
//           width: "100vw",
//           height: "100vh",
//         }}
//       >
//         {/*
//           Left Side: Blue background + center-aligned slider
//         */}
//         <Box
//           sx={{
//             flex: 1,
//             bgcolor: "#2196F3",       // or any other color
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Sliderbox />
//         </Box>

//         {/*
//           Right Side: White background + 
//           top-right corner => LoginContent 
//           center => LoginCard
//         */}
//         <Box
//           sx={{
//             flex: 1,
//             position: "relative",
//             bgcolor: "#FFFFFF",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {/* Top-right corner - company info */}
//           <Box
//             sx={{
//               position: "absolute",
//               top: 16,
//               right: 16,
//             }}
//           >
//             <LoginContent />
//           </Box>

//           {/* Centered LoginCard */}
//           <LoginCard />
//         </Box>
//       </Box>

//       <Footer />
//     </>
//   );
// }


// // src/pages/SomePage/Login/index.jsx
// import React from "react";
// import CssBaseline from "@mui/material/CssBaseline";
// import Box from "@mui/material/Box";
// import { useTheme } from "@mui/material/styles";
// import { LoginCard, Footer, LoginContent } from "../../../components";
// import Sliderbox from "../../../components/auth/login/Sliderbox"; // <-- your slider

// export default function Login() {
//   const theme = useTheme();

//   // Define different backgrounds for left & right panels for each theme mode
//   const leftPanelBg = theme.palette.mode === "dark" ? "#333333" : "#1198E7";
//   const rightPanelBg = theme.palette.mode === "dark" ? "#1E1E1E" : "#FFFFFF";

//   return (
//     <>
//       <CssBaseline enableColorScheme />

//       {/* Main container: full viewport height */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "row",      // side-by-side layout
//           width: "100vw",
//           height: "100vh",
//         }}
//       >
//         {/* 
//           Left Side: use leftPanelBg for background 
//           + center-aligned slider 
//         */}
//         <Box
//           sx={{
//             flex: 1,
//             bgcolor: leftPanelBg,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Sliderbox />
//         </Box>

//         {/*
//           Right Side: use rightPanelBg for background 
//           + top-right corner => LoginContent 
//           + center => LoginCard
//         */}
//         <Box
//           sx={{
//             flex: 1,
//             position: "relative",
//             bgcolor: rightPanelBg,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {/* Top-right corner - company info */}
//           <Box
//             sx={{
//               position: "absolute",
//               top: 16,
//               right: 16,
//             }}
//           >
//             <LoginContent />
//           </Box>

//           {/* Centered LoginCard */}
//           <LoginCard />

//         </Box>
        
//       </Box>

//       <Footer />
//     </>
//   );
// }

// import React from "react";
// import CssBaseline from "@mui/material/CssBaseline";
// import Box from "@mui/material/Box";
// import { useTheme } from "@mui/material/styles";
// import { LoginCard, Footer, LoginContent } from "../../../components";
// import Sliderbox from "../../../components/auth/login/Sliderbox"; // <-- your slider

// export default function Login() {
//   const theme = useTheme();

//   // Define different backgrounds for left & right panels for each theme mode
//   const leftPanelBg = theme.palette.mode === "dark" ? "#333333" : "#1198E7";
//   const rightPanelBg = theme.palette.mode === "dark" ? "#1E1E1E" : "#FFFFFF";

//   return (
//     <>
//       <CssBaseline enableColorScheme />

//       {/* Main container: full viewport height */}
//       <Box className="overflow-hidden "
//         sx={{
//           display: "flex",
//           flexDirection: "row", // side-by-side layout
//           width: "100%",
//           height: "100vh",
//         }}
//       >
//         {/*
//           LEFT PANEL:
//             - Only show slider on large screens and up (lg)
//             - If you want it on medium (md) as well, use { xs: 'none', md: 'flex' }
//         */}
//         <Box
//           sx={{
//             flex: 1,
//             bgcolor: leftPanelBg,
//             display: {
//               xs: "none", // hide on extra-small
//               md: "flex", // hide on medium and below
//               lg: "flex", // show on large screens and up
//             },
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Sliderbox />
//         </Box>

//         {/*
//           RIGHT PANEL:
//             - Column flex so we can have:
//               1) top-right corner: <LoginContent />
//               2) main center: <LoginCard />
//               3) bottom: <Footer />
//         */}
//         <Box
//           sx={{
//             flex: 1,
//             display: "flex",
//             flexDirection: "column",
//             position: "relative",
//             bgcolor: rightPanelBg,
//           }}
//         >
//           {/* Top-right corner - company info */}
//           <Box
//             sx={{
//               position: "absolute",
//               top: 10,
//               right: 16,
//             }}
//           >
//             <LoginContent />
//           </Box>

//           {/* Main content in center (grow to push Footer to bottom) */}
//           <Box
//             sx={{
//               flex: 1, // This makes it fill remaining vertical space
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               marginTop: "10px",
//               padddingLeft: "5px",
//               padddingRight: "5px",
//             }}
//           >
//             <LoginCard />
//           </Box>

//           {/* Footer pinned at bottom of the right panel */}
//           <Box sx={{ width: "100%" }}>
//             <Footer />
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// }

import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { LoginCard, Footer, LoginContent } from "../../../components";
import Sliderbox from "../../../components/auth/login/Sliderbox";

export default function Login() {
  const theme = useTheme();

  const leftPanelBg = theme.palette.mode === "dark" ? "#333333" : "#1198E6";
  const rightPanelBg = theme.palette.mode === "dark" ? "#1E1E1E" : "#FFFFFF";

  // Your PNG image URL
  const layerUrl =
    "https://s3-alpha-sig.figma.com/img/8c98/31f1/6cf089cc5163ed56595cd347a6e4cc1d?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ht4ClKRXdtJreP2r9cJJUNBe2s4KPOsg9U8qmpjKjiEM0PSKJC8Q9JI~9MiFBNRzbdwzGJv1blLy-~~rT4nwzEFyZejcYpE8iQ79xS1Qq1IqlAwRtl6vA27FSORz0PE-nOIdi~xdtGT5zhbTQWCEEzhOrusLPIAX73W2YTiL7yOBNlAEtuv5kK6DlBe5VbDKRWS2ltbklAgU68ggx48rhqZpq6A2I83LV5ka0VFQ4w0CVTGG~kUOda~srkZtNZTTK2zNI5DOOsow0YDj24a2xS14o3FEKYTqM3HKvmgxhRuH8SETYmmARhdGXIYgPN3PdB66N9RNV03SuIYGhzkLxQ__";

  return (
    <>
      <CssBaseline enableColorScheme />

      {/* Main container: full viewport height */}
      <Box
        className="overflow-hidden"
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100vh",
        }}
      >
        {/* LEFT PANEL */}
        <Box
        className=""
          sx={{
            flex: 1,
            // Add your background color AND the PNG as a background image
            backgroundColor: leftPanelBg,
            backgroundImage: `url('${layerUrl}')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left center", // or "center", etc.
            backgroundSize: "cover", 
                // or "cover", etc.

            display: {
              xs: "none", // hide on extra-small
              md: "flex", // show on medium+
            },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Sliderbox />
        </Box>

        {/* RIGHT PANEL */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            bgcolor: rightPanelBg,
          }}
        >
          {/* Top-right corner */}
          <Box sx={{ position: "absolute", top: 10, right: 16 }}>
            <LoginContent />
          </Box>

          {/* Main content in center */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: "10px",
              px: "5px", // replaces paddingLeft / paddingRight
            }}
          >
            <LoginCard />
          </Box>

          {/* Footer pinned at bottom */}
          <Box sx={{ width: "100%" }}>
            <Footer />
          </Box>
        </Box>
      </Box>
    </>
  );
}

