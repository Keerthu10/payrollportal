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
      icon: <GroupsRoundedIcon />,
    },
    {
      title: "Active Employees",
      value: stats?.activeEmployees ?? 0,
      icon: <CheckCircleRoundedIcon />,
    },
    {
      title: "Inactive Employees",
      value: stats?.inactiveEmployees ?? 0,
      icon: <CancelRoundedIcon />,
    },
    {
      title: "Unverified Employees",
      value: stats?.unverifiedEmployees ?? 0,
      icon: <VerifiedUserRoundedIcon />,
      type: "unverified",
    },
    {
      title: "New Employees",
      value: stats?.newEmployees ?? 0,
      icon: <ApartmentRoundedIcon />,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(5, 1fr)",
        },
        gap: { xs: 1.5, sm: 2, md: 3 },
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
            p: { xs: 2, sm: 2.5 },
            height: { xs: "auto", sm: 130, md: 140 },
            minHeight: { xs: 100, sm: "auto" },
            borderRadius: { xs: "16px", sm: "20px" },
            background: "linear-gradient(135deg,#1E1B6D 0%, #2B256F 100%)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
            transition: "all .25s ease",
            cursor: "pointer",
            "@media (hover: hover)": {
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 14px 30px rgba(15,23,42,0.16)",
              },
              "&:active": {
                transform: "scale(0.98)",
              },
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 1.5,
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: { xs: 13, sm: 14 },
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.3,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {card.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: 24, sm: 28, md: 32 },
                  fontWeight: 700,
                  color: "#FFFFFF",
                  mt: 1,
                  lineHeight: 1.1,
                }}
              >
                {card.value}
              </Typography>
            </Box>

            <Box
              sx={{
                width: { xs: 40, sm: 46 },
                height: { xs: 40, sm: 46 },
                borderRadius: { xs: "12px", sm: "14px" },
                background: "rgba(255,255,255,0.12)",
                color: "#FFFFFF",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                "& svg": {
                  fontSize: { xs: 22, sm: 24 },
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