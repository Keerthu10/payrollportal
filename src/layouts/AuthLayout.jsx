// import Box from "@mui/material";

// export function AuthLayout({ children }) {
//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         position: "relative",
//         overflow: "hidden",
//         background: "linear-gradien(to right,#edf7ff 50%, #fff5f2 50%)",
//       }}
//     >
//       {children}
//     </Box>
//   );
// }

import React from "react";
import { Box } from "@mui/material";

const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(to right,#edf7ff 50%, #fff5f2 50%)",
      }}
    >
      {children}
    </Box>
  );
};

export default AuthLayout;
