// import React from "react";

// import { Box, Paper, Typography } from "@mui/material";

// import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
// import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
// import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
// import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
// import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";

// const EmployeeStats = ({ stats, onCardClick }) => {
//   const statsCards = [
//     {
//       title: "Total Employees",
//       value: stats?.totalEmployees ?? 0,
//       icon: <GroupsRoundedIcon sx={{ fontSize: 28 }} />,
//     },
//     {
//       title: "Active Employees",
//       value: stats?.activeEmployees ?? 0,
//       icon: <CheckCircleRoundedIcon sx={{ fontSize: 28 }} />,
//     },
//     {
//       title: "Inactive Employees",
//       value: stats?.inactiveEmployees ?? 0,
//       icon: <CancelRoundedIcon sx={{ fontSize: 28 }} />,
//     },
//     {
//       title: "Unverified Employees",
//       value: stats?.unverifiedEmployees ?? 0,
//       icon: <VerifiedUserRoundedIcon sx={{ fontSize: 28 }} />,
//       type: "unverified",
//     },
//     {
//       title: "New Employees",
//       value: stats?.newEmployees ?? 0,
//       icon: <ApartmentRoundedIcon sx={{ fontSize: 28 }} />,
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         gap: 3,
//         mb: 3,
//         width: "100%",
//       }}
//     >
//       {statsCards.map((card, index) => (
//         <Paper
//           key={index}
//           onClick={() => onCardClick(card.type)}
//           elevation={0}
//           sx={{
//             flex: 1,

//             p: 3,

//             height: 150,

//             borderRadius: "24px",

//             background: "linear-gradient(135deg,#1E1B6D 0%, #2B256F 100%)",

//             color: "#fff",

//             border: "1px solid rgba(255,255,255,0.08)",

//             boxShadow: "0 8px 24px rgba(15,23,42,0.08)",

//             transition: "all .25s ease",

//             "&:hover": {
//               transform: "translateY(-4px)",
//               boxShadow: "0 14px 30px rgba(15,23,42,0.12)",
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
//                   color: "rgba(255,255,255,0.85)",
//                 }}
//               >
//                 {card.title}
//               </Typography>

//               <Typography
//                 sx={{
//                   fontSize: 34,
//                   fontWeight: 700,
//                   color: "#FFFFFF",
//                   mt: 1,
//                 }}
//               >
//                 {card.value}
//               </Typography>

//               {/* <Typography
//                 sx={{
//                   fontSize: 13,
//                   color: "rgba(255,255,255,0.65)",
//                   mt: 0.5,
//                 }}
//               >
//                 {card.subtitle}
//               </Typography> */}
//             </Box>

//             <Box
//               sx={{
//                 width: 52,
//                 height: 52,

//                 borderRadius: "14px",

//                 background: "rgba(255,255,255,0.12)",

//                 color: "#FFFFFF",

//                 border: "1px solid rgba(255,255,255,0.08)",

//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
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

// export default EmployeeStats;

import React from "react";

import { Box, Paper, Typography } from "@mui/material";

import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";

const EmployeeStats = ({ stats, onCardClick }) => {
  const statsCards = [
    {
      title: "Total Employees",
      value: stats?.totalEmployees ?? 0,
      icon: <GroupsRoundedIcon sx={{ fontSize: 28 }} />,
    },
    {
      title: "Active Employees",
      value: stats?.activeEmployees ?? 0,
      icon: <CheckCircleRoundedIcon sx={{ fontSize: 28 }} />,
    },
    {
      title: "Inactive Employees",
      value: stats?.inactiveEmployees ?? 0,
      icon: <CancelRoundedIcon sx={{ fontSize: 28 }} />,
    },
    {
      title: "Unverified Employees",
      value: stats?.unverifiedEmployees ?? 0,
      icon: <VerifiedUserRoundedIcon sx={{ fontSize: 28 }} />,
      type: "unverified",
    },
    {
      title: "New Employees",
      value: stats?.newEmployees ?? 0,
      icon: <ApartmentRoundedIcon sx={{ fontSize: 28 }} />,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr 1fr",
          sm: "1fr 1fr 1fr",
          md: "repeat(5, 1fr)",
        },
        gap: { xs: 2, sm: 3 },
        mb: 3,
        width: "100%",
      }}
    >
      {statsCards.map((card, index) => (
        <Paper
          key={index}
          onClick={() => onCardClick(card.type)}
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },

            height: { xs: 120, sm: 150 },

            borderRadius: { xs: "18px", sm: "24px" },

            background: "linear-gradient(135deg,#1E1B6D 0%, #2B256F 100%)",

            color: "#fff",

            border: "1px solid rgba(255,255,255,0.08)",

            boxShadow: "0 8px 24px rgba(15,23,42,0.08)",

            transition: "all .25s ease",

            cursor: "pointer",

            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 14px 30px rgba(15,23,42,0.12)",
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
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: { xs: 12, sm: 14 },
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.3,
                }}
              >
                {card.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: 24, sm: 34 },
                  fontWeight: 700,
                  color: "#FFFFFF",
                  mt: 1,
                }}
              >
                {card.value}
              </Typography>

              {/* <Typography
                sx={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.65)",
                  mt: 0.5,
                }}
              >
                {card.subtitle}
              </Typography> */}
            </Box>

            <Box
              sx={{
                width: { xs: 38, sm: 52 },
                height: { xs: 38, sm: 52 },

                borderRadius: { xs: "10px", sm: "14px" },

                background: "rgba(255,255,255,0.12)",

                color: "#FFFFFF",

                border: "1px solid rgba(255,255,255,0.08)",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                flexShrink: 0,

                "& svg": {
                  fontSize: { xs: 20, sm: 28 },
                },
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

export default EmployeeStats;