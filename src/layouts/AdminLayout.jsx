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

//       {/* MAIN LAYOUT */}
//       <Box
//         sx={{
//           display: "flex",

//           minHeight: "100vh",

//           background: "#F1F5F9",
//         }}
//       >
//         {/* SIDEBAR */}
//         <Sidebar open={open} />

//         {/* RIGHT SIDE */}
//         <Box
//           sx={{
//             flexGrow: 1,

//             marginLeft: open ? "240px" : "90px",

//             transition: "margin-left 0.25s ease",

//             display: "flex",

//             flexDirection: "column",

//             minHeight: "100vh",
//           }}
//         >
//           {/* TOP TOOLBAR */}
//           <TopToolbar open={open} setOpen={setOpen} />

//           {/* PAGE CONTENT */}
//           <Box
//             component="main"
//             sx={{
//               flexGrow: 1,

//               px: 3,

//               py: 2,

//               mt: "80px",

//               background: "#F8FAFC",

//               overflowX: "hidden",

//               display: "flex",

//               justifyContent: "center",
//             }}
//           >
//             <Box
//               sx={{
//                 width: "100%",

//                 maxWidth: "1500px",
//               }}
//             >
//               <Outlet />
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default AdminLayout;

import React, { useEffect, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

import TopToolbar from "../components/TopToolbar";
import Sidebar from "../components/Sidebar";
import { GlobalSessionTimeoutModal } from "../ui/GlobalModal";
import Footer from "../components/Footer";

const AdminLayout = () => {
  const navigate = useNavigate();

  const [openTimeoutModal, setOpenTimeoutModal] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let inactivityTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);

      inactivityTimer = setTimeout(
        () => {
          setOpenTimeoutModal(true);
        },
        5 * 60 * 1000,
      );
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, []);

  useEffect(() => {
    if (!openTimeoutModal) return;

    if (countdown === 0) {
      handleLogout();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [openTimeoutModal, countdown]);

  const handleContinueSession = () => {
    setOpenTimeoutModal(false);
    setCountdown(30);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
          paddingBottom: "env(safe-area-inset-bottom)",

          background: `
            radial-gradient(circle at top left,
              rgba(109,93,251,.06), transparent 30%),
            radial-gradient(circle at bottom right,
              rgba(69,215,255,.06), transparent 35%),
            linear-gradient(
              180deg,
              #FFFCF8 0%,
              #FFF9F3 55%,
              #FDF6EE 100%)
          `,
        }}
      >
        {/* Top Navigation */}
        <TopToolbar />

        <GlobalSessionTimeoutModal
          open={openTimeoutModal}
          countdown={countdown}
          onContinue={handleContinueSession}
          onLogout={handleLogout}
        />

        {/* Page Content */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            px: { xs: 1.5, sm: 2, md: 4 },
            py: { xs: 2, md: 4 },
            pt: { xs: "80px", md: "120px" },
          }}
        >
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </>
  );
};

export default AdminLayout;