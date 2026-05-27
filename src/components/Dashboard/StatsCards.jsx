import React from "react";

import { Box, Typography } from "@mui/material";

import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

const StatsCards = ({ dashboardStats }) => {
  const stats = [
    {
      label: "Total Employees",
      value: dashboardStats?.lastRun?.totalEmployees || 0,
      icon: <GroupsRoundedIcon sx={{ color: "#fff", fontSize: 28 }} />,
      gradient: "linear-gradient(135deg,#8B5CF6 0%,#4F46E5 100%)",
      subStats: [
        {
          label: "Active",
          value: dashboardStats?.lastRun?.totalEmployees || 0,
        },
        { label: "New", value: "0" },
      ],
    },

    {
      label: "Payslips Generated",
      value: dashboardStats?.totalRuns || 0,
      icon: <DescriptionRoundedIcon sx={{ color: "#fff", fontSize: 28 }} />,
      gradient: "linear-gradient(135deg,#4ADE80 0%,#22C55E 100%)",
      subStats: [
        { label: "Generated", value: dashboardStats?.totalRuns || 0 },
        { label: "Pending", value: "0" },
        { label: "Failed", value: dashboardStats?.emailsFailed || 0 },
      ],
    },

    {
      label: "Emails Sent",
      value: dashboardStats?.emailsSent || 0,
      icon: <EmailRoundedIcon sx={{ color: "#fff", fontSize: 28 }} />,
      gradient: "linear-gradient(135deg,#FB923C 0%,#F43F5E 100%)",
      subStats: [
        { label: "Delivered", value: dashboardStats?.emailsSent || 0 },
        { label: "Failed", value: dashboardStats?.emailsFailed || 0 },
      ],
    },
  ];
  return (
    <Box
      sx={{
        display: "grid",

        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          lg: "1fr 1fr 1fr",
        },

        gap: 3,
        mb: 4,
      }}
    >
      {stats.map((stat) => (
        // <Box
        //   key={stat.label}
        //   sx={{
        //     position: "relative",
        //     overflow: "hidden",

        //     borderRadius: "20px",

        //     p: 2.2,

        //     background: "#FFFFFF",

        //     border: "1px solid #E5E7EB",

        //     borderLeft: `4px solid ${stat.accent}`,

        //     boxShadow: "0 8px 24px rgba(15,23,42,0.05)",

        //     transition: "all 0.25s ease",

        //     "&:hover": {
        //       transform: "translateY(-4px)",
        //       boxShadow: "0 12px 30px rgba(15,23,42,0.10)",
        //     },
        //   }}
        // >
        //   {/* TOP */}
        //   <Box
        //     sx={{
        //       display: "flex",
        //       justifyContent: "space-between",
        //       alignItems: "center",
        //       mb: 2,
        //     }}
        //   >
        //     <Typography
        //       sx={{
        //         fontSize: 14,
        //         fontWeight: 600,
        //         color: "#475569",
        //       }}
        //     >
        //       {stat.label}
        //     </Typography>

        //     <Box
        //       sx={{
        //         px: 1.4,
        //         py: 0.4,
        //         borderRadius: "999px",
        //         fontSize: 12,
        //         fontWeight: 700,
        //         background: "#DCFCE7",
        //         color: "#15803D",
        //       }}
        //     >
        //       {stat.badge}
        //     </Box>
        //   </Box>

        //   {/* VALUE */}
        //   <Typography
        //     sx={{
        //       fontSize: 28,
        //       fontWeight: 700,
        //       color: "#0F172A",
        //       lineHeight: 1,
        //       mb: 1.8,
        //     }}
        //   >
        //     {stat.value}
        //   </Typography>

        //   {/* DIVIDER */}
        //   <Box
        //     sx={{
        //       height: "1px",
        //       background: "rgba(148,163,184,0.18)",
        //       mb: 1.2,
        //     }}
        //   />

        //   {/* SUB STATS */}
        //   <Box
        //     sx={{
        //       display: "flex",
        //       justifyContent: "space-between",
        //     }}
        //   >
        //     {stat.subStats.map((item) => (
        //       <Box key={item.label}>
        //         <Typography
        //           sx={{
        //             fontSize: 13,
        //             color: "#64748B",
        //             mb: 0.5,
        //           }}
        //         >
        //           {item.label}
        //         </Typography>

        //         <Typography
        //           sx={{
        //             fontSize: 18,
        //             fontWeight: 700,
        //             color: "#111827",
        //             lineHeight: 1,
        //           }}
        //         >
        //           {item.value}
        //         </Typography>
        //       </Box>
        //     ))}
        //   </Box>
        // </Box>
        <Box
          key={stat.label}
          sx={{
            borderRadius: "20px",
            p: 2.2,
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            boxShadow: "0 8px 24px rgba(15,23,42,0.05)",
            transition: "all 0.25s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 12px 30px rgba(15,23,42,0.10)",
            },
          }}
        >
          {/* ICON */}
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "14px",
              background: stat.gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
              mb: 2,
            }}
          >
            {stat.icon}
          </Box>

          {/* LABEL */}
          <Typography
            sx={{ fontSize: 13, fontWeight: 600, color: "#475569", mb: 0.5 }}
          >
            {stat.label}
          </Typography>

          {/* VALUE */}
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 700,
              color: "#0F172A",
              lineHeight: 1,
              mb: 1.2,
            }}
          >
            {stat.value}
          </Typography>

          {/* DIVIDER */}
          <Box
            sx={{
              height: "1px",
              background: "rgba(148,163,184,0.18)",
              mb: 1.2,
            }}
          />

          {/* SUB STATS */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {stat.subStats.map((item) => (
              <Box key={item.label}>
                <Typography sx={{ fontSize: 12, color: "#64748B", mb: 0.3 }}>
                  {item.label}
                </Typography>
                <Typography
                  sx={{ fontSize: 16, fontWeight: 700, color: "#111827" }}
                >
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default StatsCards;

// import { Box, Typography } from "@mui/material";
// import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
// import DescriptionIcon from "@mui/icons-material/Description";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import EmailIcon from "@mui/icons-material/Email";

// const stats = [
//   {
//     label: "Total Runs",
//     value: "12",
//     icon: <DirectionsRunIcon />,
//     badge: "+2.6%",
//     up: true,
//     gradient: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
//     valueColor: "#1d4ed8",
//     sparkColor: "#3b82f6",
//     dotColor: "#3b82f6",
//     iconBg: "#3b82f6",
//     points: "0,28 20,22 40,26 60,14 80,18 100,10 120,6",
//   },
//   {
//     label: "Payslips Generated",
//     value: "340",
//     icon: <DescriptionIcon />,
//     badge: "-0.1%",
//     up: false,
//     gradient: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
//     valueColor: "#6d28d9",
//     sparkColor: "#8b5cf6",
//     dotColor: "#8b5cf6",
//     iconBg: "#8b5cf6",
//     points: "0,10 20,18 40,12 60,22 80,16 100,24 120,20",
//   },
//   {
//     label: "Total Payout",
//     value: "₹4,20,000",
//     icon: <CurrencyRupeeIcon />,
//     badge: "+2.8%",
//     up: true,
//     gradient: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
//     valueColor: "#15803d",
//     sparkColor: "#22c55e",
//     dotColor: "#22c55e",
//     iconBg: "#22c55e",
//     points: "0,30 20,20 40,24 60,10 80,14 100,8 120,4",
//   },
//   {
//     label: "Emails Sent",
//     value: "318",
//     icon: <EmailIcon />,
//     badge: "+3.6%",
//     up: true,
//     gradient: "linear-gradient(135deg, #ffedd5, #fed7aa)",
//     valueColor: "#c2410c",
//     sparkColor: "#f97316",
//     dotColor: "#f97316",
//     iconBg: "#f97316",
//     points: "0,26 20,30 40,18 60,24 80,12 100,16 120,8",
//   },
// ];

// export default function StatsCards() {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         gap: 2,
//         mt: 3,
//         flexWrap: "wrap",
//       }}
//     >
//       {stats.map((stat) => (
//         <Box
//           key={stat.label}
//           sx={{
//             flex: "1 1 200px", // 👈 this is the magic — grow, shrink, min 200px
//             background: stat.gradient,
//             borderRadius: "16px",
//             p: 2,
//             position: "relative",
//             overflow: "hidden",
//             cursor: "pointer",
//             transition: "transform 0.22s cubic-bezier(.34,1.56,.64,1)",
//             "&:hover": { transform: "translateY(-6px) scale(1.02)" },
//           }}
//         >
//           {/* Decorative dot */}
//           <Box
//             sx={{
//               position: "absolute",
//               width: 90,
//               height: 90,
//               borderRadius: "50%",
//               background: stat.dotColor,
//               opacity: 0.18,
//               top: -20,
//               right: -20,
//             }}
//           />

//           {/* Top row: icon + badge */}
//           <Box
//             sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}
//           >
//             <Box
//               sx={{
//                 width: 42,
//                 height: 42,
//                 borderRadius: "12px",
//                 background: stat.iconBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 20,
//               }}
//             >
//               {stat.icon}
//             </Box>
//             <Typography
//               sx={{
//                 fontSize: 12,
//                 fontWeight: 500,
//                 px: 1,
//                 py: 0.4,
//                 borderRadius: "20px",
//                 background: stat.up
//                   ? "rgba(21,128,61,0.12)"
//                   : "rgba(185,28,28,0.12)",
//                 color: stat.up ? "#15803d" : "#b91c1c",
//               }}
//             >
//               {stat.up ? "↑" : "↓"} {stat.badge}
//             </Typography>
//           </Box>

//           <Typography sx={{ fontSize: 13, color: "#4b5563", mb: 0.5 }}>
//             <strong>{stat.label}</strong>
//           </Typography>
//           <Typography
//             sx={{
//               fontSize: 26,
//               fontWeight: 700,
//               color: stat.valueColor,
//               letterSpacing: "-0.5px",
//               mb: 1,
//             }}
//           >
//             {stat.value}
//           </Typography>

//           {/* Sparkline */}
//           <svg
//             width="100%"
//             height="36"
//             viewBox="0 0 120 36"
//             preserveAspectRatio="none"
//           >
//             <polyline
//               points={stat.points}
//               fill="none"
//               stroke={stat.sparkColor}
//               strokeWidth="2.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </Box>
//       ))}
//     </Box>
//   );
// }
