import React, { useEffect, useState, useRef } from "react";
import { GlobalSessionTimeoutModal } from "../ui/GlobalModal";

const Dashboard = () => {
  const inactivityTimerRef = useState(null);
  const [openSessionModal, setOpenSessionModal] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const startInactivityTimer = () => {
    clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      setOpenSessionModal(true);
    }, 10000);
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
      <div>Dashboard</div>
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
