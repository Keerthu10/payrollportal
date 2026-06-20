import React from "react";

import { Box, Paper, Typography } from "@mui/material";

import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";

const EmployeeStats = ({ employees = [] }) => {
  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (emp) => emp.status === "Active",
  ).length;

  const inactiveEmployees = employees.filter(
    (emp) => emp.status === "Inactive",
  ).length;

  const departments = new Set(employees.map((emp) => emp.department)).size;

  const statsCards = [
    {
      title: "Total Employees",
      value: totalEmployees,
      subtitle: "Registered Employees",
      icon: <GroupsRoundedIcon sx={{ fontSize: 28 }} />,
      background: "linear-gradient(135deg,#1E1B6D 0%, #2B256F 100%)",
    },
    {
      title: "Active Employees",
      value: activeEmployees,
      subtitle: "Currently Working",
      icon: <CheckCircleRoundedIcon sx={{ fontSize: 28 }} />,
    },
    {
      title: "Inactive Employees",
      value: inactiveEmployees,
      subtitle: "Inactive Records",
      icon: <CancelRoundedIcon sx={{ fontSize: 28 }} />,
    },
    {
      title: "New Employees",
      value: departments,
      subtitle: "New Employees",
      icon: <ApartmentRoundedIcon sx={{ fontSize: 28 }} />,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        mb: 4,
        width: "100%",
      }}
    >
      {statsCards.map((card, index) => (
        <Paper
          key={index}
          elevation={0}
          sx={{
            flex: 1,

            p: 3,

            height: 150,

            borderRadius: "24px",

            background: "linear-gradient(135deg,#1E1B6D 0%, #2B256F 100%)",

            color: "#fff",

            border: "1px solid rgba(255,255,255,0.08)",

            boxShadow: "0 8px 24px rgba(15,23,42,0.08)",

            transition: "all .25s ease",

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
            <Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                {card.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: 34,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  mt: 1,
                }}
              >
                {card.value}
              </Typography>

              <Typography
                sx={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.65)",
                  mt: 0.5,
                }}
              >
                {card.subtitle}
              </Typography>
            </Box>

            <Box
              sx={{
                width: 52,
                height: 52,

                borderRadius: "14px",

                background: "rgba(255,255,255,0.12)",

                color: "#FFFFFF",

                border: "1px solid rgba(255,255,255,0.08)",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
