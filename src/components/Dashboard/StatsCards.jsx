// import React from "react";

// import { Box, Paper, Typography } from "@mui/material";

// import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
// import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
// import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
// import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";

// const StatsCards = ({ dashboardStats,onCardClick }) => {
//   const statsCards = [
//     // {
//     //   title: "Total Employees",
//     //   value: 50 ?? dashboardStats?.emailsSent + dashboardStats?.emailsFailed,
//     //   subtitle: "Processed This Month",
//     //   icon: <GroupsRoundedIcon sx={{ fontSize: 28 }} />,
//     // },
//     // {
//     //   title: "Payslip Sent",
//     //   value: dashboardStats?.emailsSent ?? 0,
//     //   subtitle: "Successfully Delivered",
//     //   icon: <CheckCircleRoundedIcon sx={{ fontSize: 28 }} />,
//     // },
//     // {
//     //   title: "Email Failed",
//     //   value: dashboardStats?.emailsFailed ?? 0,
//     //   subtitle: "Delivery Failed",
//     //   icon: <CancelRoundedIcon sx={{ fontSize: 28 }} />,
//     // },
//     // {
//     //   title: "Total Runs",
//     //   value: dashboardStats?.totalRuns ?? 0,
//     //   subtitle: "Payroll Executions",
//     //   icon: <ApartmentRoundedIcon sx={{ fontSize: 28 }} />,
//     // },

//     {
//       title: "Total Employees",
//       value: dashboardStats?.overall?.totalEmployeesProcessed ?? 0,
//       subtitle: "Processed This Month",
//       icon: <GroupsRoundedIcon sx={{ fontSize: 28 }} />,
//       color: "#8B5CF6",
//       lightBg: "rgba(139,92,246,0.08)",
//       shadowColor: "rgba(139,92,246,0.18)",
//     },
//     {
//       title: "Payslip Sent",
//       value: dashboardStats?.overall?.totalDelivered ?? 0,
//       subtitle: "Successfully Delivered",
//       icon: <CheckCircleRoundedIcon sx={{ fontSize: 28 }} />,
//       color: "#22C55E",
//       lightBg: "rgba(34,197,94,0.08)",
//       shadowColor: "rgba(34,197,94,0.18)",
//     },
//     {
//       title: "Email Failed",
//       value:
//         dashboardStats?.overall?.totalFailed +
//           dashboardStats?.overall?.totalBounced ?? 0,
//       subtitle: "Delivery Failed",
//       icon: <CancelRoundedIcon sx={{ fontSize: 28 }} />,
//       color: "#F43F5E",
//       lightBg: "rgba(244,63,94,0.08)",
//       shadowColor: "rgba(244,63,94,0.18)",
//     },
//     {
//       title: "Email Pending",
//       value: dashboardStats?.overall?.totalPending,
//       subtitle: "Payroll Executions",
//       icon: <ApartmentRoundedIcon sx={{ fontSize: 28 }} />,
//       color: "#3B82F6",
//       lightBg: "rgba(59,130,246,0.08)",
//       shadowColor: "rgba(59,130,246,0.18)",
//     },

//     // {
//     //   title: "Total Runs",
//     //   value: dashboardStats?.overall?.totalRuns ?? 0,
//     //   subtitle: "Payroll Executions",
//     //   icon: <ApartmentRoundedIcon sx={{ fontSize: 28 }} />,
//     //   color: "#3B82F6",
//     //   lightBg: "rgba(59,130,246,0.08)",
//     //   shadowColor: "rgba(59,130,246,0.18)",
//     // },
//   ];

//   return (
//     <Box
//       sx={{
//         display: "grid",
//         gridTemplateColumns: {
//           xs: "repeat(2, 1fr)",
//           sm: "repeat(2, 1fr)",
//           md: "repeat(4, 1fr)",
//         },
//         gap: { xs: 2, md: 3 },
//         mb: 4,
//         width: "100%",
//       }}
//     >
//       {statsCards.map((card, index) => (
//         <Paper
//           key={index}
//           onClick={()=>onCardClick(card.type)}
//           elevation={0}
//           sx={{
//             p: { xs: 2, md: 3 },
//             height: { xs: "auto", md: 150 },
//             minHeight: { xs: 120, md: "auto" },
//             borderRadius: "24px",

//             background: "#FFFFFF",

//             border: "1px solid #E5E7EB",

//             boxShadow: `0 8px 24px ${card.shadowColor}`,

//             position: "relative",

//             overflow: "hidden",

//             transition: "all .25s ease",

//             "&::before": {
//               content: '""',
//               position: "absolute",
//               top: 0,
//               left: 0,
//               right: 0,
//               height: "5px",
//               background: card.color,
//             },

//             "&:hover": {
//               transform: "translateY(-4px)",
//               boxShadow: `0 14px 32px ${card.shadowColor}`,
//             },
//           }}
//         >
//           <Box
//             sx={{
//               height: "100%",

//               display: "flex",

//               justifyContent: "space-between",

//               alignItems: "flex-start",
//             }}
//           >
//             <Box>
//               <Typography
//                 sx={{
//                   fontSize: 14,
//                   fontWeight: 600,
//                   color: "rgba(40, 35, 35, 0.85)",
//                 }}
//               >
//                 {card.title}
//               </Typography>

//               <Typography
//                 sx={{
//                   fontSize: 34,
//                   fontWeight: 700,
//                   color: "#262222ff",
//                   mt: 1,
//                 }}
//               >
//                 {card.value}
//               </Typography>

//               <Typography
//                 sx={{
//                   fontSize: 13,
//                   color: "rgba(15, 14, 14, 0.65)",
//                   mt: 0.5,
//                 }}
//               >
//                 {card.subtitle}
//               </Typography>
//             </Box>

//             <Box
//               sx={{
//                 width: 54,
//                 height: 54,
//                 borderRadius: "16px",

//                 background: card.lightBg,

//                 color: card.color,

//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",

//                 border: `1px solid ${card.lightBg}`,
//               }}
//             >
//               {card.icon}
//             </Box>
//           </Box>
//         </Paper>
//       ))}
//     </Box>
//   );
// };

// export default StatsCards;

import React from "react";

import { Box, Paper, Typography } from "@mui/material";

import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";

const StatsCards = ({ dashboardStats, onCardClick }) => {
  const statsCards = [
    {
      title: "Total Employees",
      value: dashboardStats?.currentMonth?.employeesProcessed ?? 0,
      subtitle: "Processed This Month",
      icon: <GroupsRoundedIcon sx={{ fontSize: 28 }} />,
      color: "#8B5CF6",
      lightBg: "rgba(139,92,246,0.08)",
      shadowColor: "rgba(139,92,246,0.18)",
    },
    {
      title: "Payslip Sent",
      value: dashboardStats?.currentMonth?.totalDelivered ?? 0,
      subtitle: "Successfully Delivered",
      icon: <CheckCircleRoundedIcon sx={{ fontSize: 28 }} />,
      color: "#22C55E",
      lightBg: "rgba(34,197,94,0.08)",
      shadowColor: "rgba(34,197,94,0.18)",
    },
    {
      title: "Email Failed",
      value:
        (dashboardStats?.currentMonth?.totalFailed ?? 0) +
        (dashboardStats?.currentMonth?.totalBounced ?? 0),
      subtitle: "Delivery Failed",
      icon: <CancelRoundedIcon sx={{ fontSize: 28 }} />,
      color: "#F43F5E",
      lightBg: "rgba(244,63,94,0.08)",
      shadowColor: "rgba(244,63,94,0.18)",
    },
    {
      title: "Email Pending",
      value: dashboardStats?.currentMonth?.totalPending ?? 0,
      subtitle: "Payroll Executions",
      icon: <ApartmentRoundedIcon sx={{ fontSize: 28 }} />,
      color: "#3B82F6",
      lightBg: "rgba(59,130,246,0.08)",
      shadowColor: "rgba(59,130,246,0.18)",
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gap: { xs: 2, md: 3 },
        mb: 4,
        width: "100%",
      }}
    >
      {statsCards.map((card, index) => (
        <Paper
          key={index}
          elevation={0}
          onClick={() => onCardClick?.(card)}
          sx={{
            p: { xs: 2, md: 3 },
            height: { xs: "auto", md: 150 },
            minHeight: { xs: 120, md: "auto" },
            borderRadius: "24px",
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            boxShadow: `0 8px 24px ${card.shadowColor}`,
            position: "relative",
            overflow: "hidden",
            transition: "all .25s ease",
            cursor: "pointer",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "5px",
              background: card.color,
            },
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: `0 14px 32px ${card.shadowColor}`,
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgba(40, 35, 35, 0.85)",
                }}
              >
                {card.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: 34,
                  fontWeight: 700,
                  color: "#262222ff",
                  mt: 1,
                }}
              >
                {card.value}
              </Typography>

              <Typography
                sx={{ fontSize: 13, color: "rgba(15, 14, 14, 0.65)", mt: 0.5 }}
              >
                {card.subtitle}
              </Typography>
            </Box>

            <Box
              sx={{
                width: 54,
                height: 54,
                borderRadius: "16px",
                background: card.lightBg,
                color: card.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${card.lightBg}`,
              }}
            >
              {card.icon}
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default StatsCards;
