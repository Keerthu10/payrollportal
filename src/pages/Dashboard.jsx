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
import EmailStatusPie from "../components/Dashboard/EmailStatusPie";

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

const Dashboard = () => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());

  const chartData =
    dashboardStats?.monthlyTrend?.map((item) => ({
      month: item.month,
      successfulPayrolls: item.delivered,
      pendingPayrolls: item.pending,
    })) || [];

  const fetchDashboardStats = async (month, year) => {
    try {
      const response = await getDashboardStats(month, year);

      console.log("Dashboard stats:", response.data);

      setDashboardStats(response.data);
    } catch (error) {
      console.log("Dashboard Stats Error:", error);
    }
  };

  useEffect(() => {
    // Load dashboard initially
    fetchDashboardStats(
      selectedMonth.format("MM"),
      selectedMonth.format("YYYY"),
    );

    // Auto refresh every 30 seconds
    const interval = setInterval(() => {
      fetchDashboardStats(
        selectedMonth.format("MM"),
        selectedMonth.format("YYYY"),
      );
    }, 30000); // 30000 ms = 30 seconds

    // Clear interval when component unmounts
    return () => clearInterval(interval);
  }, [selectedMonth]);

  return (
    <>
      <Box
        sx={{
          p: 1,
          background: "#EEF4FA",
          minHeight: "100vh",
        }}
      >
        {/* BLUR EFFECTS */}

        {/* <Box
          sx={{
            position: "absolute",

            zIndex: 0,

            pointerEvents: "none",

            width: 300,
            height: 300,

            borderRadius: "50%",

            background: "rgba(255,255,255,0.08)",

            filter: "blur(120px)",

            top: -100,

            right: -100,
          }}
        /> */}

        {/* <Box
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
        /> */}

        {/* ================= HEADER ================= */}
        <DashboardHeader
          dashboardStats={dashboardStats}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />

        {/* ================= CHART SECTION ================= */}

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            mt: 3,
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              flex: 3,
              p: 4,
              borderRadius: 6,
              background: "#fff",
              boxShadow: "0 8px 30px rgba(0,0,0,.08)",
            }}
          >
            {/* TITLE */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#0F172A",
                  fontSize: "18px",
                }}
              >
                Payroll Processing Trend
              </Typography>
            </Box>

            <ResponsiveContainer width="100%" height={250}>
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
          <Box
            sx={{
              flex: "1 1 28%",
              minWidth: { xs: "100%", md: 350 },
              height: 380,
              borderRadius: 6,
              background: "#fff",
              boxShadow: "0 8px 30px rgba(0,0,0,.08)",
            }}
          >
            <EmailStatusPie dashboardStats={dashboardStats} />
          </Box>
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
