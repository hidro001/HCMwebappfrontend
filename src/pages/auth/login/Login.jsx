

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

