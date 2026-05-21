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

import React,{useEffect,useState} from "react";

import { Box, CssBaseline } from "@mui/material";

import { Outlet,useNavigate } from "react-router-dom";

import TopToolbar from "../components/TopToolbar";

import { GlobalSessionTimeoutModal } from "../ui/GlobalModal";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [openTimeoutModal, setOpenTimeoutModal] = useState(false);

  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    let inactivityTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);

      inactivityTimer = setTimeout(
        () => {
          setOpenTimeoutModal(true);
        },
        5 * 60 * 1000,
      ); // 5 mins
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
          minHeight: "100vh",

          background:
            "linear-gradient(135deg, #1E3A8A 0%, #6D28D9 55%, #0E7490 100%)",
        }}
      >
        {/* TOP NAVBAR */}

        <TopToolbar />

        <GlobalSessionTimeoutModal
          open={openTimeoutModal}
          countdown={countdown}
          onContinue={handleContinueSession}
          onLogout={handleLogout}
        />

        <Box
          sx={{
            px: 4,

            py: 4,

            pt: "120px",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default AdminLayout;
