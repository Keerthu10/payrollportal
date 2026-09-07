// import React from "react";
// import { Box } from "@mui/material";

// const AuthLayout = ({ children }) => {
//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         position: "relative",
//         overflow: "hidden",
//         background: "linear-gradient(to right,#edf7ff 50%, #fff5f2 50%)",
//       }}
//     >
//       {children}
//     </Box>
//   );
// };

// export default AuthLayout;

// import React from "react";
// import { Box } from "@mui/material";

// const AuthLayout = ({ children }) => {
//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         overflow: "hidden",
//         position: "relative",

//         background:
//           "linear-gradient(135deg, #1B164F 0%, #29256E 50%, #4338CA 100%)",

//         // Top Left Glow
//         "&::before": {
//           content: '""',
//           position: "absolute",
//           width: 600,
//           height: 600,
//           borderRadius: "50%",
//           background: "rgba(255,255,255,.08)",
//           filter: "blur(140px)",
//           top: -250,
//           left: -250,
//         },

//         // Bottom Right Glow
//         "&::after": {
//           content: '""',
//           position: "absolute",
//           width: 500,
//           height: 500,
//           borderRadius: "50%",
//           background: "rgba(69,215,255,.12)",
//           filter: "blur(120px)",
//           bottom: -180,
//           right: -180,
//         },
//       }}
//     >
//       {/* Center Glow */}
//       <Box
//         sx={{
//           position: "absolute",
//           width: 350,
//           height: 350,
//           borderRadius: "50%",
//           background: "rgba(255,255,255,.04)",
//           filter: "blur(100px)",
//           top: "15%",
//           left: "35%",
//         }}
//       />

//       {/* Bottom Glow */}
//       <Box
//         sx={{
//           position: "absolute",
//           width: 300,
//           height: 300,
//           borderRadius: "50%",
//           background: "rgba(255,255,255,.03)",
//           filter: "blur(90px)",
//           bottom: "10%",
//           left: "60%",
//         }}
//       />

//       {/* Small Accent Glow */}
//       <Box
//         sx={{
//           position: "absolute",
//           width: 220,
//           height: 220,
//           borderRadius: "50%",
//           background: "rgba(109,93,251,.18)",
//           filter: "blur(80px)",
//           top: "55%",
//           left: "20%",
//         }}
//       />

//       {/* Content */}
//       <Box
//         sx={{
//           position: "relative",
//           zIndex: 2,
//           width: "100%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         {children}
//       </Box>
//     </Box>
//   );
// };

// export default AuthLayout;

import React from "react";
import { Box } from "@mui/material";

const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",

        overflow:"hidden",

        px: { xs: 2, sm: 3, md: 4 },
        // py: { xs: 3, sm: 4, md: 6 },

        // paddingTop: "env(safe-area-inset-top)",
        // paddingBottom: "env(safe-area-inset-bottom)",

        background: `
          radial-gradient(circle at top left, rgba(255,255,255,.08), transparent 35%),
          radial-gradient(circle at bottom right, rgba(56,189,248,.15), transparent 40%),
          linear-gradient(
            135deg,
            #15123F 0%,
            #262261 25%,
            #4338CA 55%,
            #5B4CF5 75%,
            #38BDF8 100%
          )
        `,

        "&::before": {
          content: '""',
          position: "absolute",
          width: { xs: 420, sm: 520, md: 700 },
          height: { xs: 420, sm: 520, md: 700 },
          borderRadius: "50%",
          background: "rgba(91,76,245,.30)",
          filter: "blur(150px)",
          top: { xs: -180, md: -250 },
          left: { xs: -180, md: -250 },
          pointerEvents: "none",
        },

        "&::after": {
          content: '""',
          position: "absolute",
          width: { xs: 380, sm: 500, md: 650 },
          height: { xs: 380, sm: 500, md: 650 },
          borderRadius: "50%",
          background: "rgba(56,189,248,.18)",
          filter: "blur(140px)",
          bottom: { xs: -180, md: -250 },
          right: { xs: -180, md: -250 },
          pointerEvents: "none",
        },
      }}
    >
      {/* Center Glow */}
      <Box
        sx={{
          position: "absolute",
          width: { xs: 220, sm: 300, md: 400 },
          height: { xs: 220, sm: 300, md: 400 },
          borderRadius: "50%",
          background: "rgba(255,255,255,.12)",
          filter: "blur(120px)",
          top: { xs: "12%", md: "15%" },
          left: { xs: "50%", md: "35%" },
          transform: { xs: "translateX(-50%)", md: "none" },
          pointerEvents: "none",
        }}
      />

      {/* Bottom Glow */}
      <Box
        sx={{
          position: "absolute",
          width: { xs: 180, sm: 240, md: 300 },
          height: { xs: 180, sm: 240, md: 300 },
          borderRadius: "50%",
          background: "rgba(255,255,255,.08)",
          filter: "blur(100px)",
          bottom: { xs: "4%", md: "8%" },
          left: { xs: "50%", md: "60%" },
          transform: { xs: "translateX(-50%)", md: "none" },
          pointerEvents: "none",
        }}
      />

      {/* Accent Purple Blob */}
      <Box
        sx={{
          position: "absolute",
          width: { xs: 160, sm: 200, md: 250 },
          height: { xs: 160, sm: 200, md: 250 },
          borderRadius: "50%",
          background: "rgba(91,76,245,.22)",
          filter: "blur(90px)",
          top: { xs: "65%", md: "60%" },
          left: { xs: "10%", md: "20%" },
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;