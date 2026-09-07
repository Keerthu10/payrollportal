import React, { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

import { Legend } from "recharts";
import { getDashboardStats } from "../services/dashboard";
import { getEmployeeHistory } from "../services/employeeService";

import EmailStatusPie from "../components/Dashboard/EmailStatusPie";
import StatDetailModal from "../ui/StatsDetailModal";

import {
  ResponsiveContainer,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";
import DashboardHeader from "../components/Dashboard/DashboardHeader";

const CARD_COLUMNS = {
  "Total Employees": [
    { key: "employeeId", label: "Employee ID" },
    { key: "employeeName", label: "Employee Name" },
    { key: "email", label: "Email" },
    { key: "designation", label: "Designation" },
  ],
  "Payslip Sent": [
    { key: "employeeId", label: "Employee ID" },
    { key: "employeeName", label: "Employee Name" },
    { key: "email", label: "Email" },
    { key: "emailSentAt", label: "Sent Date" },
  ],
  "Email Failed": [
    { key: "employeeId", label: "Employee ID" },
    { key: "employeeName", label: "Employee Name" },
    { key: "email", label: "Email" },
    { key: "emailError", label: "Failure Reason" },
    {key:"emailSentAt",label:"Date & Time"}
  ],
  "Email Pending": [
    { key: "employeeId", label: "Employee ID" },
    { key: "employeeName", label: "Employee Name" },
    { key: "email", label: "Email" },
    { key: "deliveryStatus", label: "Status" },
  ],
};

const Dashboard = () => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());

  const [selectedCard, setSelectedCard] = useState(null);
  const [tableColumns, setTableColumns] = useState(null);
  const [tableRows, setTableRows] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [tableNotAvailable, setTableNotAvailable] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const totalEmployeesProcessed = dashboardStats?.overall?.totalEmployeesProcessed || 0;

  const currentMonthIndex = Number(selectedMonth.format("M")); // 1–12

//  const chartData =
//    dashboardStats?.monthlyTrend
//      ?.map((item, idx) => ({
//        month: item.month,
//        successfulPayrolls: item.delivered || 0,
//        pendingPayrolls: item.pending || 0,
//        failedPayrolls: item.failed || 0,
//        monthIndex: idx + 1,
//      }))
//      .filter(
//        (item) =>
//          item.monthIndex <= currentMonthIndex &&
//          item.monthIndex > currentMonthIndex - 6,
//      ) || [];

  const chartData =
    dashboardStats?.monthlyTrend?.map((item, idx) => ({
      month: item.month,
      successfulPayrolls: item.delivered || 0,
      pendingPayrolls: item.pending || 0,
      failedPayrolls: item.failed || 0,
      monthIndex: idx + 1,
    })) || [];

  const fetchDashboardStats = async (month, year) => {
    try {
      const response = await getDashboardStats(month, year);
      setDashboardStats(response.data);
    } catch (error) {
      console.log("Dashboard Stats Error:", error);
    }
  };

  const fetchEmployeeHistory = async (card, pageNo = 0) => {
    setTableLoading(true);

    try {
      const month = Number(selectedMonth.format("MM"));
      const year = Number(selectedMonth.format("YYYY"));
      const payload = {
        month,
        year,
        page: pageNo,
        size: rowsPerPage,
      };

      switch (card.title) {
        case "Payslip Sent":
          payload.status = "DELIVERED";
          break;

        case "Email Failed":
          payload.status = "FAILED";
          break;

        case "Email Pending":
          payload.status = "PENDING";
          break;

        default:
          break;
      }

      console.log("Employee History Payload:", payload);

      const response = await getEmployeeHistory(payload);

      const data = response.data;

      setTableRows(data.content || []);
      setPage(data.pageNumber || 0);
      setTotalCount(data.totalElements || 0);
    } catch (error) {
      console.log("Employee History Error:", error);
      setTableRows([]);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    const month = Number(selectedMonth.format("MM"));
    const year = Number(selectedMonth.format("YYYY"));
    console.log("Selected Month:", selectedMonth.format("MM/YYYY"));

    // Refresh dashboard
    fetchDashboardStats(month, year);

    // If modal is open, refresh modal data also
    if (selectedCard) {
      fetchEmployeeHistory(selectedCard, 0);
    }
  }, [selectedMonth, selectedCard]);

  const handleCardClick = async (card) => {
    setSelectedCard(card);
    setTableColumns(CARD_COLUMNS[card.title] || []);
    setTableNotAvailable(false);
    setPage(0);

    fetchEmployeeHistory(card, 0);
  };

  const handleModalClose = () => {
    setSelectedCard(null);
    setTableColumns(null);
    setTableRows(null);
    setTableNotAvailable(false);
  };

  const handleManualRefresh = () => {
    const month = Number(selectedMonth.format("MM"));
    const year = Number(selectedMonth.format("YYYY"));
    fetchDashboardStats(month, year);
    if (selectedCard) {
      fetchEmployeeHistory(selectedCard, page);
    }
  };

  

  return (
    <>
      <Box
        sx={{
          p: {
            xs: 1,
            sm: 2,
            md: 3,
          },
          background: "#EEF4FA",
          minHeight: "100dvh",
        }}
      >
        {/* ================= HEADER ================= */}
        <DashboardHeader
          dashboardStats={dashboardStats}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          onCardClick={handleCardClick}
          onRefresh={handleManualRefresh}
        />

        {/* ================= CHART SECTION ================= */}
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              lg: "row",
            },

            gap: {
              xs: 2,
              md: 3,
            },

            mt: {
              xs: 2,
              md: 3,
            },

            alignItems: "stretch",
          }}
        >
          <Box
            sx={{
              flex: 3,

              width: "100%",

              p: {
                xs: 2,
                sm: 3,
                md: 4,
              },

              borderRadius: {
                xs: 3,
                md: 6,
              },

              background: "#fff",

              boxShadow: "0 8px 30px rgba(0,0,0,.08)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#0F172A",
                  fontSize: {
                    xs: 16,
                    sm: 18,
                  },
                }}
              >
                Payroll Processing Trend
              </Typography>
            </Box>

            <Box
              sx={{
                width: "100%",
                height: {
                  xs: 220,
                  sm: 250,
                  md: 280,
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
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
                  <YAxis
                    allowDecimals={false}
                    label={{
                      value: "Payrolls",
                      angle: -90,
                      position: "insideLeft",
                      style: { fill: "#64748B", fontSize: 12 },
                    }}
                  />
                  <Tooltip />
                  <Legend />

                  <ReferenceLine
                    y={totalEmployeesProcessed}
                    stroke="#0F172A"
                    strokeDasharray="6 4"
                    strokeWidth={2}
                    ifOverflow="extendDomain"
                    label={{
                      value: `Total Employees (${totalEmployeesProcessed})`,
                      position: "insideBottomLeft", // ← changed from "insideTopRight"
                      fill: "#0F172A",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="successfulPayrolls"
                    name="Successful Payrolls"
                    stroke="#38BDF8"
                    fill="url(#payrollGradient)"
                    strokeWidth={4}
                    isAnimationActive
                    animationDuration={1200}
                    animationEasing="ease-out"
                  />

                  <Bar
                    dataKey="pendingPayrolls"
                    name="Pending Payrolls"
                    fill="#8B5CF6"
                    radius={[4, 4, 0, 0]}
                    isAnimationActive
                    animationDuration={1200}
                    animationEasing="ease-out"
                    animationBegin={200}
                  />
                  <Bar
                    dataKey="failedPayrolls"
                    name="Failed Payrolls"
                    fill="#DC2626"
                    radius={[4, 4, 0, 0]}
                    isAnimationActive
                    animationDuration={1200}
                    animationEasing="ease-out"
                    animationBegin={400}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,

              width: "100%",

              minWidth: {
                xs: "100%",
                lg: 350,
              },

              minHeight: {
                xs: 340,
                sm: 360,
                md: 380,
              },
              height: "auto",

              borderRadius: {
                xs: 3,
                md: 6,
              },

              background: "#fff",

              boxShadow: "0 8px 30px rgba(0,0,0,.08)",
              p: { xs: 2, sm: 2.5, md: 3 },
            }}
          >
            <EmailStatusPie dashboardStats={dashboardStats} />
          </Box>
        </Box>
      </Box>

      {/* ================= STAT CARD DETAIL MODAL ================= */}
      <StatDetailModal
        open={!!selectedCard}
        handleClose={handleModalClose}
        card={selectedCard}
        columns={tableColumns}
        rows={tableRows}
        loading={tableLoading}
        notAvailable={tableNotAvailable}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
        onPageChange={(newPage) => {
          if (selectedCard) {
            fetchEmployeeHistory(selectedCard, newPage);
          }
        }}
      />
    </>
  );
};

export default Dashboard;
