// import React, { useState } from "react";
// import { Box, CssBaseline } from "@mui/material";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import TopToolbar from "../components/TopToolbar";

// const AdminLayout = () => {
//   const [open, setOpen] = useState(true);
//   return (
//     <>
//       <CssBaseline />
//       <TopToolbar open={open} setOpen={setOpen} />
//       <Box sx={{ display: "flex" }}>
//         <Sidebar open={open} />
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,

//             p: 3,

//             marginLeft: open ? "260px" : "88px",

//             transition: "all 0.3s ease",

//             marginTop: "70px",

//             background: "linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)",

//             minHeight: "100vh",

//             overflowX: "hidden",
//           }}
//         >
//           <Outlet />
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default AdminLayout;

import React, { useState } from "react";

import { Box, CssBaseline } from "@mui/material";

import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import TopToolbar from "../components/TopToolbar";

const AdminLayout = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <CssBaseline />

      {/* MAIN LAYOUT */}
      <Box
        sx={{
          display: "flex",

          minHeight: "100vh",

          background: "#F8FAFC",
        }}
      >
        {/* SIDEBAR */}
        <Sidebar open={open} />

        {/* RIGHT SIDE */}
        <Box
          sx={{
            flexGrow: 1,

            marginLeft: open ? "220px" : "88px",

            transition: "margin-left 0.25s ease",

            display: "flex",

            flexDirection: "column",

            minHeight: "100vh",
          }}
        >
          {/* TOP TOOLBAR */}
          <TopToolbar open={open} setOpen={setOpen} />

          {/* PAGE CONTENT */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,

              px: 3,

              py: 2,

              mt: "80px",

              background: "#F8FAFC",

              overflowX: "hidden",

              display: "flex",

              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",

                maxWidth: "1500px",
              }}
            >
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AdminLayout;
