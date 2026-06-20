// import Box from "@mui/material/Box";

// export function AuthContent({ children }) {
//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: 450,
//         p: 5,
//         borderRadius: 5,

//         backdropFilter: "blur(20px)",
//         backgroundColor: "rgba(255,255,255,0.75)",
//         border: "1px solid rgba(255,255,255,0.3)",
//         boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
//       }}
//     >
//       {children}
//     </Box>
//   );
// }

import React from "react";
import { Box } from "@mui/material";

const AuthContent = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 450,
        p: 5,
        borderRadius: 5,

        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(255,255,255,0.75)",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
      }}
    >
      {children}
    </Box>
  );
};

export default AuthContent;
