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
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",

        background: `
          linear-gradient(
            135deg,
            #15123F 0%,
            #28256E 20%,
            #4338CA 55%,
            #5B4CF5 75%,
            #45D7FF 100%
          )
        `,

        // Top Left Glow
        "&::before": {
          content: '""',
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "rgba(109,93,251,.35)",
          filter: "blur(150px)",
          top: -250,
          left: -250,
        },

        // Bottom Right Glow
        "&::after": {
          content: '""',
          position: "absolute",
          width: 650,
          height: 650,
          borderRadius: "50%",
          background: "rgba(69,215,255,.25)",
          filter: "blur(140px)",
          bottom: -250,
          right: -250,
        },
      }}
    >
      {/* Center Glow */}
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(255,255,255,.08)",
          filter: "blur(120px)",
          top: "15%",
          left: "35%",
        }}
      />

      {/* Bottom Glow */}
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(255,255,255,.05)",
          filter: "blur(100px)",
          bottom: "8%",
          left: "60%",
        }}
      />

      {/* Accent Purple Blob */}
      <Box
        sx={{
          position: "absolute",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "rgba(130,90,255,.3)",
          filter: "blur(90px)",
          top: "60%",
          left: "20%",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;