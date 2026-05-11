import React, { useEffect, useState, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { GlobalSessionTimeoutModal } from "../ui/GlobalModal";
import StatsCards from "../components/Dashboard/StatsCards";

const Dashboard = () => {
  const inactivityTimerRef = useState(null);
  const [openSessionModal, setOpenSessionModal] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const startInactivityTimer = () => {
    clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      setOpenSessionModal(true);
    }, 300000);
  };
  useEffect(() => {
    startInactivityTimer();

    return () => clearTimeout(inactivityTimerRef.current);
  }, []);
  useEffect(() => {
    let timer;
    if (openSessionModal && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    if (countdown === 0) {
      handleLogout();
    }
    return () => clearInterval(timer);
  }, [openSessionModal, countdown]);

  const handleContinue = () => {
    setOpenSessionModal(false);
    setCountdown(30);
    startInactivityTimer();
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <>
      <Box sx={{ p: 3, width: "100%" }}>
        <Typography
          sx={{ fontSize: "28px", fontWeight: "700", color: "#0F172A", mb: 2 }}
        >
          Dashboard
        </Typography>
        <Typography sx={{ color: "#64748B" }}>
          Welcome to Payroll Portal Dashboard
        </Typography>
        <StatsCards />
      </Box>

      <GlobalSessionTimeoutModal
        open={openSessionModal}
        countdown={countdown}
        onContinue={handleContinue}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Dashboard;
