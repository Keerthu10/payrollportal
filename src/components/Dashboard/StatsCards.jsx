// import React from "react";

// import { Box, Typography } from "@mui/material";

// import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
// import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
// import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

// const StatsCards = ({ dashboardStats }) => {
//   // const stats = [
//   //   {
//   //     label: "Last Payroll Processed",
//   //     value: dashboardStats?.lastRun?.payMonth
//   //       ? new Date(
//   //           dashboardStats.lastRun.payYear,
//   //           dashboardStats.lastRun.payMonth - 1,
//   //         ).toLocaleString("default", { month: "long" })
//   //       : "-",
//   //     icon: <GroupsRoundedIcon sx={{ color: "#fff", fontSize: 28 }} />,
//   //     gradient: "linear-gradient(135deg,#8B5CF6 0%,#4F46E5 100%)",
//   //     subStats: [
//   //       {
//   //         label: "Employees Processed",
//   //         value: dashboardStats?.lastRun?.totalEmployees || 0,
//   //       },
//   //       { label: "Total runs", value: dashboardStats?.totalRuns || 0 },
//   //     ],
//   //   },

//   //   {
//   //     label: "Payslips Sent",
//   //     value: dashboardStats?.totalRuns || 0,
//   //     icon: <DescriptionRoundedIcon sx={{ color: "#fff", fontSize: 28 }} />,
//   //     gradient: "linear-gradient(135deg,#4ADE80 0%,#22C55E 100%)",
//   //     subStats: [
//   //       // { label: "Total runs", value: dashboardStats?.totalRuns || 0 },
//   //     ],
//   //   },

//   //   {
//   //     label: "Failed Emails",
//   //     value: dashboardStats?.emailsSent || 0,
//   //     icon: <EmailRoundedIcon sx={{ color: "#fff", fontSize: 28 }} />,
//   //     gradient: "linear-gradient(135deg,#FB923C 0%,#F43F5E 100%)",
//   //     subStats: [
//   //       { label: "Failed", value: dashboardStats?.emailsSent || 0 },
//   //       { label: "Unresolved", value: dashboardStats?.emailsFailed || 0 },
//   //     ],
//   //   },
//   // ];
//   const stats = [
//     {
//       label: "Last Payroll Processed",
//       value: dashboardStats?.lastRun?.payMonth
//         ? new Date(
//             dashboardStats.lastRun.payYear,
//             dashboardStats.lastRun.payMonth - 1,
//           ).toLocaleString("default", { month: "long" })
//         : "-",
//       icon: <GroupsRoundedIcon sx={{ color: "#fff", fontSize: 28 }} />,
//       gradient: "linear-gradient(135deg,#8B5CF6 0%,#4F46E5 100%)",
//       subStats: [
//         {
//           label: "Employees",
//           value: dashboardStats?.lastRun?.totalEmployees || 0,
//         },
//         {
//           label: "Status",
//           value: dashboardStats?.lastRun?.status || "-",
//         },
//       ],
//     },

//     {
//       label: "Payroll Runs",
//       value: dashboardStats?.totalRuns || 0,
//       icon: <DescriptionRoundedIcon sx={{ color: "#fff", fontSize: 28 }} />,
//       gradient: "linear-gradient(135deg,#4ADE80 0%,#22C55E 100%)",
//       subStats: [
//         {
//           label: "This Month",
//           value:
//             dashboardStats?.monthlyTrend?.find((item) => item.month === "Jun")
//               ?.runs || 0,
//         },
//       ],
//     },

//     {
//       label: "Emails Sent",
//       value: dashboardStats?.emailsSent || 0,
//       icon: <EmailRoundedIcon sx={{ color: "#fff", fontSize: 28 }} />,
//       gradient: "linear-gradient(135deg,#FB923C 0%,#F43F5E 100%)",
//       subStats: [
//         {
//           label: "Failed",
//           value: dashboardStats?.emailsFailed || 0,
//         },
//         {
//           label: "Success",
//           value: dashboardStats?.emailsSent || 0,
//         },
//       ],
//     },
//   ];
//   return (
//     <Box sx={{ mb: 4 }}>
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: {
//             xs: "1fr",
//             md: "repeat(3, 1fr)",
//           },
//           gap: 3,
//         }}
//       >

//         {stats.map((stat) => (
//           <Box
//             key={stat.label}
//             sx={{
//               borderRadius: "20px",
//               p: 2.2,
//               background: "#FFFFFF",
//               border: "1px solid #E5E7EB",
//               boxShadow: "0 8px 24px rgba(15,23,42,0.05)",
//               transition: "all 0.25s ease",
//               "&:hover": {
//                 transform: "translateY(-4px)",
//                 boxShadow: "0 12px 30px rgba(15,23,42,0.10)",
//               },
//             }}
//           >
//             {/* ICON */}
//             <Box
//               sx={{
//                 width: 44,
//                 height: 44,
//                 borderRadius: "14px",
//                 background: stat.gradient,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
//                 mb: 2,
//               }}
//             >
//               {stat.icon}
//             </Box>

//             {/* LABEL */}
//             <Typography
//               sx={{ fontSize: 13, fontWeight: 600, color: "#475569", mb: 0.5 }}
//             >
//               {stat.label}
//             </Typography>

//             {/* VALUE */}
//             <Typography
//               sx={{
//                 fontSize: 22,
//                 fontWeight: 700,
//                 color: "#0F172A",
//                 lineHeight: 1,
//                 mb: 1.2,
//               }}
//             >
//               {stat.value}
//             </Typography>

//             {/* DIVIDER */}
//             <Box
//               sx={{
//                 height: "1px",
//                 background: "rgba(148,163,184,0.18)",
//                 mb: 1.2,
//               }}
//             />

//             {/* SUB STATS */}
//             <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//               {stat.subStats.map((item) => (
//                 <Box key={item.label}>
//                   <Typography sx={{ fontSize: 12, color: "#64748B", mb: 0.3 }}>
//                     {item.label}
//                   </Typography>
//                   <Typography
//                     sx={{ fontSize: 16, fontWeight: 700, color: "#111827" }}
//                   >
//                     {item.value}
//                   </Typography>
//                 </Box>
//               ))}
//             </Box>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default StatsCards;

import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

const statusColor = (status) => {
  if (!status) return { bg: "#F1F5F9", color: "#64748B" };
  if (status === "COMPLETED") return { bg: "#DCFCE7", color: "#16A34A" };
  if (status === "FAILED") return { bg: "#FEE2E2", color: "#DC2626" };
  return { bg: "#FEF9C3", color: "#CA8A04" };
};

const StatsCards = ({ dashboardStats }) => {
  // Derive month name from payMonth number
  const lastRunMonth = dashboardStats?.lastRun?.payMonth
    ? new Date(
        dashboardStats.lastRun.payYear,
        dashboardStats.lastRun.payMonth - 1,
      ).toLocaleString("default", { month: "long", year: "numeric" })
    : "—";

  const runStatus = dashboardStats?.lastRun?.status || null;
  const sc = statusColor(runStatus);

  // Find this month's trend
  const now = new Date();
  const currentMonthShort = now.toLocaleString("default", { month: "short" });
  const currentMonthTrend = dashboardStats?.monthlyTrend?.find(
    (t) => t.month === currentMonthShort,
  );

  const stats = [
    {
      id: "employees",
      label: "Total Employees Processed",
      value: dashboardStats?.lastRun?.emailsSent ?? "—",
      icon: <GroupsRoundedIcon sx={{ color: "#fff", fontSize: 22 }} />,
      gradient: "linear-gradient(135deg,#8B5CF6 0%,#4F46E5 100%)",
      shadowColor: "rgba(139,92,246,0.28)",
      subStats: [{ label: "Last Payroll", value: lastRunMonth }],
      badge: runStatus
        ? { label: runStatus, bg: sc.bg, color: sc.color }
        : null,
    },
    {
      id: "sent",
      label: "Payroll Sent",
      value: dashboardStats?.emailsSent ?? 0,
      icon: <MarkEmailReadRoundedIcon sx={{ color: "#fff", fontSize: 22 }} />,
      gradient: "linear-gradient(135deg,#4ADE80 0%,#22C55E 100%)",
      shadowColor: "rgba(74,222,128,0.25)",
      subStats: [
        {
          label: "Total Runs",
          value: dashboardStats?.totalRuns ?? 0,
          suffix: "runs",
        },
      ],
      badge: null,
    },
    {
      id: "failed",
      label: "Emails Failed",
      value: dashboardStats?.emailsFailed ?? 0,
      icon: <ErrorOutlineRoundedIcon sx={{ color: "#fff", fontSize: 22 }} />,
      gradient: "linear-gradient(135deg,#FB923C 0%,#F43F5E 100%)",
      shadowColor: "rgba(251,146,60,0.25)",
      subStats: [
        {
          label: "Success Rate",
          value:
            (dashboardStats?.emailsSent || 0) +
              (dashboardStats?.emailsFailed || 0) >
            0
              ? `${Math.round(
                  ((dashboardStats?.emailsSent || 0) /
                    ((dashboardStats?.emailsSent || 0) +
                      (dashboardStats?.emailsFailed || 0))) *
                    100,
                )}%`
              : "—",
        },
      ],
      badge: null,
    },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 3,
        }}
      >
        {stats.map((stat) => (
          <Box
            key={stat.id}
            sx={{
              borderRadius: "20px",
              p: "22px 24px",
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              boxShadow: `0 4px 20px ${stat.shadowColor}, 0 1px 4px rgba(0,0,0,0.04)`,
              transition: "all 0.25s ease",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: `0 12px 32px ${stat.shadowColor}, 0 2px 8px rgba(0,0,0,0.06)`,
              },
              // subtle tinted top border accent
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: stat.gradient,
                borderRadius: "20px 20px 0 0",
              },
            }}
          >
            {/* TOP ROW: icon + badge */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "14px",
                  background: stat.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 6px 16px ${stat.shadowColor}`,
                }}
              >
                {stat.icon}
              </Box>

              {stat.badge && (
                <Box
                  sx={{
                    px: 1.4,
                    py: 0.4,
                    borderRadius: "8px",
                    background: stat.badge.bg,
                    color: stat.badge.color,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.badge.label}
                </Box>
              )}
            </Box>

            {/* LABEL */}
            <Typography
              sx={{
                fontSize: 12.5,
                fontWeight: 600,
                color: "#64748B",
                mb: 0.5,
              }}
            >
              {stat.label}
            </Typography>

            {/* VALUE */}
            <Typography
              sx={{
                fontSize: 36,
                fontWeight: 800,
                color: "#0F172A",
                lineHeight: 1,
                mb: 2,
                letterSpacing: "-1px",
              }}
            >
              {stat.value}
            </Typography>

            {/* DIVIDER */}
            <Box
              sx={{
                height: "1px",
                background: "#F1F5F9",
                mb: 1.8,
              }}
            />

            {/* SUB STATS */}
            <Box sx={{ display: "flex", gap: 4 }}>
              {stat.subStats.map((item) => (
                <Box key={item.label}>
                  <Typography
                    sx={{
                      fontSize: 11.5,
                      color: "#94A3B8",
                      mb: 0.3,
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 15, fontWeight: 700, color: "#334155" }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StatsCards;
