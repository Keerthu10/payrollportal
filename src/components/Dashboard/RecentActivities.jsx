// RecentActivities.jsx

import React from "react";

import { Box, Typography, Stack, Avatar } from "@mui/material";

import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";

import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

const activities = [
  {
    title: "Payroll sheet uploaded",
    subtitle: "Admin uploaded May 2026 data",
    time: "10:14 AM",
    bg: "#DCFCE7",
    color: "#16A34A",
    icon: <UploadFileOutlinedIcon fontSize="small" />,
  },

  // {
  //   title: "Preview reviewed",
  //   subtitle: "Breakdown confirmed by admin",
  //   time: "10:18 AM",
  //   bg: "#DBEAFE",
  //   color: "#2563EB",
  //   icon: <VisibilityOutlinedIcon fontSize="small" />,
  // },

  {
    title: "Payslips dispatched",
    subtitle: "5 PDFs sent to all employees",
    time: "10:22 AM",
    bg: "#FEF3C7",
    color: "#D97706",
    icon: <MailOutlineOutlinedIcon fontSize="small" />,
  },

  {
    title: "Apr 2026 completed",
    subtitle: "Payroll closed successfully",
    time: "Apr 30",
    bg: "#DCFCE7",
    color: "#059669",
    icon: <TaskAltOutlinedIcon fontSize="small" />,
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
        {activities.map((item, index) => (
          // <Box
          //   key={item.title}
          //   sx={{
          //     display: "flex",
          //     alignItems: "flex-start",
          //     gap: 1.5,
          //   }}
          // >
          //   {/* ICON */}
          //   <Avatar
          //     sx={{
          //       width: 38,
          //       height: 38,
          //       background: item.bg,
          //       color: item.color,
          //     }}
          //   >
          //     {item.icon}
          //   </Avatar>

          //   {/* TEXT */}
          //   <Box>
          //     <Typography
          //       sx={{
          //         fontSize: "14px",
          //         fontWeight: 600,
          //         color: "#0F172A",
          //         lineHeight: 1.4,
          //       }}
          //     >
          //       {item.title}
          //     </Typography>

          //     <Typography
          //       sx={{
          //         fontSize: "13px",
          //         color: "#64748B",
          //         mt: 0.3,
          //       }}
          //     >
          //       {item.time}
          //     </Typography>
          //   </Box>
          // </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              py: 1.6,

              borderBottom:
                index !== activities.length - 1
                  ? "1px solid rgba(148,163,184,0.14)"
                  : "none",
            }}
          >
            {/* LEFT */}
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
              }}
            >
              {/* ICON */}
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: item.color,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  color: item.iconColor,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                •
              </Box>

              {/* TEXT */}
              <Box>
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#0F172A",
                    lineHeight: 1.2,
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#64748B",
                    mt: 0.3,
                  }}
                >
                  {item.subtitle}
                </Typography>
              </Box>
            </Box>

            {/* TIME */}
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: "#64748B",
                whiteSpace: "nowrap",
              }}
            >
              {item.time}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default RecentActivities;
