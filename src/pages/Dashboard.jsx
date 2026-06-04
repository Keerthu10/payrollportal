// // import React from "react";

// // import { Box, Grid } from "@mui/material";

// // import DashboardHeader from "../components/Dashboard/DashboardHeader";

// // import StatsCards from "../components/Dashboard/StatsCards";

// // import PayrollOverview from "../components/Dashboard/PayrollOverview";

// // import ChartsSection from "../components/Dashboard/ChartsSection";
// // import DepartmentDistribution from "../components/Dashboard/DepartmentDistribution";
// // import UpcomingPayroll from "../components/Dashboard/UpcomingPayroll";
// // import PendingApprovals from "../components/Dashboard/PendingApprovals";
// // import TopEarners from "../components/Dashboard/TopEarners";
// // import RecentActivities from "../components/Dashboard/RecentActivities";
// // // import AuditPreview from "../components/dashboard/AuditPreview";
// // // import QuickActions from "../components/dashboard/QuickActions";

// // const Dashboard = () => {
// //   return (
// //     <Box
// //       sx={{
// //         display: "flex",

// //         flexDirection: "column",

// //         gap: 2,

// //         px: 1,

// //         mt: 2,
// //       }}
// //     >
// //       {/* FILTER BAR */}
// //       <DashboardHeader />
// //       {/* KPI CARDS */}
// //       <StatsCards />
// //       <PayrollOverview />
// //       {/* CHARTS */}
// //       {/* <ChartsSection /> */}
// //       {/* AUDIT + QUICK ACTIONS */}
// //       {/* <Grid container spacing={3} sx={{ mt: 2 }}>
// //         <Grid item xs={12} lg={4}>
// //           <PayrollOverview />
// //         </Grid>

// //         <Grid item xs={12} lg={4}>
// //           <DepartmentDistribution />
// //         </Grid>
// //         <Grid item xs={12} lg={4}>
// //           <RecentActivities />
// //         </Grid>
// //       </Grid> */}
// //       {/* <Grid container spacing={3} sx={{ mt: 1 }}>
// //         <Grid item xs={12} lg={5}>
// //           <PendingApprovals />
// //         </Grid>

// //         <Grid item xs={12} lg={5}>
// //           <TopEarners />
// //         </Grid>

// //         <Grid item xs={12} lg={2}>
// //           <RecentActivities />
// //         </Grid>
// //       </Grid> */}
// //     </Box>
// //   );
// // };

// // export default Dashboard;

import React, { useEffect, useState } from "react";

import {
  Box,
  Grid,
  Stack,
  Typography,
  Avatar,
  MenuItem,
  FormControl,
  Select,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";

import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ApprovalRoundedIcon from "@mui/icons-material/ApprovalRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import { Legend } from "recharts";
import { getDashboardStats } from "../services/dashboard";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import StatsCards from "../components/Dashboard/StatsCards";

const chartData = [
  { month: "Jan", successfulPayrolls: 20, pendingPayrolls: 10 },
  { month: "Feb", successfulPayrolls: 45, pendingPayrolls: 8 },
  { month: "Mar", successfulPayrolls: 25, pendingPayrolls: 18 },
  { month: "Apr", successfulPayrolls: 50, pendingPayrolls: 5 },
  { month: "May", successfulPayrolls: 32, pendingPayrolls: 2 },
  { month: "Jun", successfulPayrolls: 62, pendingPayrolls: 1 },
];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await getDashboardStats();
      console.log("Dashboard stats:", response.data);
      setDashboardStats(response.data);
    } catch (error) {
      console.log("Dashboard Stats Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats(
      selectedMonth.format("MM"),
      selectedMonth.format("YYYY"),
    );
  }, [selectedMonth]);

  return (
    <>
      <Backdrop
        open={loading}
        sx={{
          zIndex: 9999,
          background: "rgba(15,23,42,0.65)",
          backdropFilter: "blur(6px)",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress
          size={70}
          thickness={4}
          sx={{
            color: "#8B5CF6",
          }}
        />

        <Typography
          sx={{
            color: "#fff",
            fontWeight: 600,
            fontSize: "18px",
          }}
        >
          Loading Dashboard...
        </Typography>
      </Backdrop>
      <Box
        sx={{
          position: "relative",

          overflow: "hidden",

          p: 1,

          zIndex: 1,
        }}
      >
        {/* BLUR EFFECTS */}

        <Box
          sx={{
            position: "absolute",

            zIndex: 0,

            pointerEvents: "none",

            width: 400,
            height: 400,

            borderRadius: "50%",

            background: "rgba(255,255,255,0.08)",

            filter: "blur(80px)",

            top: -100,

            right: -100,
          }}
        />

        <Box
          sx={{
            position: "absolute",

            zIndex: 0,

            pointerEvents: "none",

            width: 300,
            height: 300,

            borderRadius: "50%",

            background: "rgba(139,92,246,0.15)",

            filter: "blur(120px)",

            bottom: -100,

            left: -100,
          }}
        />

        {/* ================= HEADER ================= */}
        <DashboardHeader
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />

        {/* ================= STATS CARDS ================= */}

        <StatsCards dashboardStats={dashboardStats} />

        {/* ================= CHART SECTION ================= */}

        <Box
          sx={{
            p: 4,

            borderRadius: "28px",

            background: "rgba(255,255,255,0.92)",

            backdropFilter: "blur(12px)",

            minHeight: "460px",

            border: "1px solid rgba(255,255,255,0.18)",

            boxShadow: "0 10px 30px rgba(15,23,42,0.12)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              mb: 4,
            }}
          >
            {/* TITLE */}

            <Typography
              sx={{
                fontWeight: 700,
                color: "#0F172A",
                fontSize: "26px",
              }}
            >
              Payroll Processing Trend
            </Typography>

            {/* DROPDOWN */}

            <FormControl
              size="small"
              sx={{
                minWidth: 180,
                ml: "auto",
                background: "#fff",
                borderRadius: "14px",

                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                },
              }}
            >
              <Select defaultValue="6months">
                <MenuItem value="6months">Last 6 Months</MenuItem>
                <MenuItem value="12months">Last 12 Months</MenuItem>
                <MenuItem value="year">This Year</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* CHART */}

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id="payrollGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4} />

                  <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E1" />

              <XAxis dataKey="month" />

              <YAxis domain={[0, 70]} tickCount={15} />

              <Tooltip />

              <Legend />

              <Area
                type="monotone"
                dataKey="successfulPayrolls"
                name="Successful Payrolls"
                stroke="#38BDF8"
                fill="url(#payrollGradient)"
                strokeWidth={4}
              />

              <Line
                type="monotone"
                dataKey="pendingPayrolls"
                name="Pending Payrolls"
                stroke="#8B5CF6"
                strokeWidth={4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>

        {/* RIGHT */}

        {/* <Grid item xs={12} lg={4}>
          <Box
            sx={{
              p: 4,

              borderRadius: "28px",

              background: "rgba(255,255,255,0.78)",

              backdropFilter: "blur(12px)",

              minHeight: "460px",

              border: "1px solid rgba(255,255,255,0.18)",

              boxShadow: "0 10px 30px rgba(15,23,42,0.12)",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,

                color: "#0F172A",

                fontSize: "26px",

                mb: 4,
              }}
            >
              Leave Summary
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Box
                  sx={{
                    p: 4,

                    borderRadius: "24px",

                    background:
                      "linear-gradient(135deg,#38BDF8 0%,#4F46E5 100%)",

                    color: "#fff",

                    minHeight: "180px",

                    display: "flex",

                    flexDirection: "column",

                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "64px",

                      fontWeight: 700,
                    }}
                  >
                    7
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    On Leave
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box
                  sx={{
                    p: 4,

                    borderRadius: "24px",

                    background:
                      "linear-gradient(135deg,#A855F7 0%,#7C3AED 100%)",

                    color: "#fff",

                    minHeight: "180px",

                    display: "flex",

                    flexDirection: "column",

                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "64px",

                      fontWeight: 700,
                    }}
                  >
                    3
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    Upcoming
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    p: 3,

                    borderRadius: "24px",

                    background:
                      "linear-gradient(135deg,#10B981 0%,#059669 100%)",

                    color: "#fff",

                    minHeight: "120px",

                    display: "flex",

                    flexDirection: "column",

                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "48px",

                      fontWeight: 700,
                    }}
                  >
                    24
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    Remote Employees
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid> */}
      </Box>
    </>
  );
};

export default Dashboard;