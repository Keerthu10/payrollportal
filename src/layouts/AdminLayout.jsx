import React, { useEffect, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

import TopToolbar from "../components/TopToolbar";
import { GlobalSessionTimeoutModal } from "../ui/GlobalModal";
import Footer from "../components/Footer";

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
          paddingTop: "env(safe-area-inset-top)",
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
        {/* Top Navigation Bar with Mobile Drawer */}
        <TopToolbar />

        <GlobalSessionTimeoutModal
          open={openTimeoutModal}
          countdown={countdown}
          onContinue={handleContinueSession}
          onLogout={handleLogout}
        />

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            width: "100%",
            maxWidth: "1600px",
            mx: "auto",
            px: { xs: 1.5, sm: 2.5, md: 4 },
            py: { xs: 2, md: 3.5 },
            pt: { xs: "72px", sm: "80px", md: "115px" },
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