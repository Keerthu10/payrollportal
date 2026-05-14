// RecentActivities.jsx

import React from "react";

import { Box, Typography, Stack, Avatar } from "@mui/material";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

const activities = [
  {
    title: "Payroll processed for May 2026",
    time: "Today, 10:30 AM",
    icon: <PaymentsOutlinedIcon fontSize="small" />,
    bg: "#DCFCE7",
    color: "#16A34A",
  },

  {
    title: "Payslips generated for 980 employees",
    time: "Today, 09:15 AM",
    icon: <DescriptionOutlinedIcon fontSize="small" />,
    bg: "#DBEAFE",
    color: "#2563EB",
  },

  {
    title: "Excel file uploaded by Admin",
    time: "Yesterday, 04:45 PM",
    icon: <UploadFileOutlinedIcon fontSize="small" />,
    bg: "#FEF3C7",
    color: "#D97706",
  },

  {
    title: "New employee John Doe joined",
    time: "May 24, 2026",
    icon: <PersonAddAltOutlinedIcon fontSize="small" />,
    bg: "#FEE2E2",
    color: "#DC2626",
  },
];

const RecentActivities = () => {
  return (
    <Box
      sx={{
        background: "#FFFFFF",
        borderRadius: "18px",
        border: "1px solid #E2E8F0",
        p: 3,
        height: "100%",
        boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#0F172A",
          }}
        >
          Recent Activities
        </Typography>

        <Typography
          sx={{
            fontSize: "13px",
            color: "#7C3AED",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          View All
        </Typography>
      </Box>

      {/* ACTIVITIES */}
      <Stack spacing={3}>
        {activities.map((item) => (
          <Box
            key={item.title}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
            }}
          >
            {/* ICON */}
            <Avatar
              sx={{
                width: 38,
                height: 38,
                background: item.bg,
                color: item.color,
              }}
            >
              {item.icon}
            </Avatar>

            {/* TEXT */}
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#0F172A",
                  lineHeight: 1.4,
                }}
              >
                {item.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#64748B",
                  mt: 0.3,
                }}
              >
                {item.time}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default RecentActivities;
