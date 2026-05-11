// import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
// import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
// import DescriptionIcon from "@mui/icons-material/Description";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import EmailIcon from "@mui/icons-material/Email";

// const stats = [
//   {
//     label: "Total Runs",
//     value: 12,
//     icon: <DirectionsRunIcon fontSize="large" />,
//     color: "#4f46e5",
//   },
//   {
//     label: "Payslips Generated",
//     value: 340,
//     icon: <DescriptionIcon fontSize="large" />,
//     color: "#0891b2",
//   },
//   {
//     label: "Total Payout",
//     value: "₹4,20,000",
//     icon: <CurrencyRupeeIcon fontSize="large" />,
//     color: "#16a34a",
//   },
//   {
//     label: "Emails Sent",
//     value: 318,
//     icon: <EmailIcon fontSize="large" />,
//     color: "#ea580c",
//   },
// ];

// export default function StatsCards() {
//   return (
//     <Grid container spacing={3} sx={{ mt: 2 }}>
//       {stats.map((stat) => (
//         <Grid item xs={12} sm={6} md={3} key={stat.label}>
//           <Card
//             sx={{
//               borderRadius: 3,
//               boxShadow: 3,
//               borderTop: `4px solid ${stat.color}`,
//               transition: "transform 0.2s ease, box-shadow 0.2s ease",
//               "&:hover": {
//                 transform: "translateY(-6px)",
//                 boxShadow: 8,
//                 cursor: "pointer",
//               },
//             }}
//           >
//             <CardContent>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <Box>
//                   <Typography variant="body2" color="text.secondary">
//                     {stat.label}
//                   </Typography>
//                   <Typography variant="h5" fontWeight="bold" sx={{ mt: 0.5 }}>
//                     {stat.value}
//                   </Typography>
//                 </Box>
//                 <Box sx={{ color: stat.color }}>{stat.icon}</Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// }

import { Box, Typography } from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DescriptionIcon from "@mui/icons-material/Description";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import EmailIcon from "@mui/icons-material/Email";

const stats = [
  {
    label: "Total Runs",
    value: "12",
    icon: <DirectionsRunIcon />,
    badge: "+2.6%",
    up: true,
    gradient: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
    valueColor: "#1d4ed8",
    sparkColor: "#3b82f6",
    dotColor: "#3b82f6",
    iconBg: "#3b82f6",
    points: "0,28 20,22 40,26 60,14 80,18 100,10 120,6",
  },
  {
    label: "Payslips Generated",
    value: "340",
    icon: <DescriptionIcon />,
    badge: "-0.1%",
    up: false,
    gradient: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
    valueColor: "#6d28d9",
    sparkColor: "#8b5cf6",
    dotColor: "#8b5cf6",
    iconBg: "#8b5cf6",
    points: "0,10 20,18 40,12 60,22 80,16 100,24 120,20",
  },
  {
    label: "Total Payout",
    value: "₹4,20,000",
    icon: <CurrencyRupeeIcon />,
    badge: "+2.8%",
    up: true,
    gradient: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
    valueColor: "#15803d",
    sparkColor: "#22c55e",
    dotColor: "#22c55e",
    iconBg: "#22c55e",
    points: "0,30 20,20 40,24 60,10 80,14 100,8 120,4",
  },
  {
    label: "Emails Sent",
    value: "318",
    icon: <EmailIcon />,
    badge: "+3.6%",
    up: true,
    gradient: "linear-gradient(135deg, #ffedd5, #fed7aa)",
    valueColor: "#c2410c",
    sparkColor: "#f97316",
    dotColor: "#f97316",
    iconBg: "#f97316",
    points: "0,26 20,30 40,18 60,24 80,12 100,16 120,8",
  },
];

export default function StatsCards() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mt: 3,
        flexWrap: "wrap",
      }}
    >
      {stats.map((stat) => (
        <Box
          key={stat.label}
          sx={{
            flex: "1 1 200px", // 👈 this is the magic — grow, shrink, min 200px
            background: stat.gradient,
            borderRadius: "16px",
            p: 2,
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            transition: "transform 0.22s cubic-bezier(.34,1.56,.64,1)",
            "&:hover": { transform: "translateY(-6px) scale(1.02)" },
          }}
        >
          {/* Decorative dot */}
          <Box
            sx={{
              position: "absolute",
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: stat.dotColor,
              opacity: 0.18,
              top: -20,
              right: -20,
            }}
          />

          {/* Top row: icon + badge */}
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "12px",
                background: stat.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              {stat.icon}
            </Box>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 500,
                px: 1,
                py: 0.4,
                borderRadius: "20px",
                background: stat.up
                  ? "rgba(21,128,61,0.12)"
                  : "rgba(185,28,28,0.12)",
                color: stat.up ? "#15803d" : "#b91c1c",
              }}
            >
              {stat.up ? "↑" : "↓"} {stat.badge}
            </Typography>
          </Box>

          <Typography sx={{ fontSize: 13, color: "#4b5563", mb: 0.5 }}>
            <strong>{stat.label}</strong>
          </Typography>
          <Typography
            sx={{
              fontSize: 26,
              fontWeight: 700,
              color: stat.valueColor,
              letterSpacing: "-0.5px",
              mb: 1,
            }}
          >
            {stat.value}
          </Typography>

          {/* Sparkline */}
          <svg
            width="100%"
            height="36"
            viewBox="0 0 120 36"
            preserveAspectRatio="none"
          >
            <polyline
              points={stat.points}
              fill="none"
              stroke={stat.sparkColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
      ))}
    </Box>
  );
}