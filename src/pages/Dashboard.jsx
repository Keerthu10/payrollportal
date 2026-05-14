// import React, { useEffect, useState, useRef } from "react";
// import { Box, Typography } from "@mui/material";
// import { GlobalSessionTimeoutModal } from "../ui/GlobalModal";
// import StatsCards from "../components/Dashboard/StatsCards";

// const Dashboard = () => {
//   const inactivityTimerRef = useState(null);
//   const [openSessionModal, setOpenSessionModal] = useState(false);
//   const [countdown, setCountdown] = useState(30);
//   const startInactivityTimer = () => {
//     clearTimeout(inactivityTimerRef.current);
//     inactivityTimerRef.current = setTimeout(() => {
//       setOpenSessionModal(true);
//     }, 300000);
//   };
//   useEffect(() => {
//     startInactivityTimer();

//     return () => clearTimeout(inactivityTimerRef.current);
//   }, []);
//   useEffect(() => {
//     let timer;
//     if (openSessionModal && countdown > 0) {
//       timer = setInterval(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);
//     }
//     if (countdown === 0) {
//       handleLogout();
//     }
//     return () => clearInterval(timer);
//   }, [openSessionModal, countdown]);

//   const handleContinue = () => {
//     setOpenSessionModal(false);
//     setCountdown(30);
//     startInactivityTimer();
//   };
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   };
//   return (
//     <>
//       <Box sx={{ p: 3, width: "100%" }}>
//         <Typography
//           sx={{ fontSize: "28px", fontWeight: "700", color: "#0F172A", mb: 2 }}
//         >
//           Dashboard
//         </Typography>
//         <Typography sx={{ color: "#64748B" }}>
//           Welcome to Payroll Portal Dashboard
//         </Typography>
//         <StatsCards />
//       </Box>

//       <GlobalSessionTimeoutModal
//         open={openSessionModal}
//         countdown={countdown}
//         onContinue={handleContinue}
//         onLogout={handleLogout}
//       />
//     </>
//   );
// };

// export default Dashboard;

import React from "react";

import { Box, Grid } from "@mui/material";

import DashboardHeader from "../components/Dashboard/DashboardHeader";

import StatsCards from "../components/Dashboard/StatsCards";

import PayrollOverview from "../components/Dashboard/PayrollOverview";

import ChartsSection from "../components/Dashboard/ChartsSection";
import DepartmentDistribution from "../components/Dashboard/DepartmentDistribution";
import UpcomingPayroll from "../components/Dashboard/UpcomingPayroll";
import PendingApprovals from "../components/Dashboard/PendingApprovals";
import TopEarners from "../components/Dashboard/TopEarners";
import RecentActivities from "../components/Dashboard/RecentActivities";
// import AuditPreview from "../components/dashboard/AuditPreview";
// import QuickActions from "../components/dashboard/QuickActions";

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: "flex",

        flexDirection: "column",

        gap: 2,

        px: 1,

        mt: 2,
      }}
    >
      {/* FILTER BAR */}
      <DashboardHeader />
      {/* KPI CARDS */}
      <StatsCards />
      {/* CHARTS */}
      {/* <ChartsSection /> */}
      {/* AUDIT + QUICK ACTIONS */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} lg={4}>
          <PayrollOverview />
        </Grid>

        <Grid item xs={12} lg={4}>
          <DepartmentDistribution />
        </Grid>
        <Grid item xs={12} lg={4}>
          <UpcomingPayroll />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} lg={5}>
          <PendingApprovals />
        </Grid>

        <Grid item xs={12} lg={5}>
          <TopEarners />
        </Grid>

        <Grid item xs={12} lg={2}>
          <RecentActivities />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
