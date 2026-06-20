import React from "react";

import { Box, Typography, Stack, Chip } from "@mui/material";

const payrollData = [
  {
    title: "Monthly Payroll",
    date: "May 31, 2026",
    status: "Upcoming",
    color: "#22C55E",
    bg: "#DCFCE7",
  },

  {
    title: "TDS Payment",
    date: "Jun 7, 2026",
    status: "Scheduled",
    color: "#2563EB",
    bg: "#DBEAFE",
  },

  {
    title: "PF Payment",
    date: "Jun 15, 2026",
    status: "Scheduled",
    color: "#2563EB",
    bg: "#DBEAFE",
  },
];

const UpcomingPayroll = () => {
  return (
    <Box
      sx={{
        background: "#FFFFFF",

        height:"100%",
        minWidth:"300px",

        borderRadius: "18px",

        border: "1px solid #E2E8F0",

        p: 3,

        boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
        display:"flex",
        flexDirection:"column",
        gap:2,
      }}
    >
      {/* HEADER */}
      <Typography
        sx={{
          fontSize: "18px",

          fontWeight: 700,

          color: "#0F172A",

          mb: 2.5,
        }}
      >
        Upcoming Payroll
      </Typography>

      {/* PAYROLL ITEMS */}
      <Stack spacing={3}>
        {payrollData.map((item) => (
          <Box
            key={item.title}
            sx={{
              display: "flex",

              alignItems: "flex-start",

              justifyContent: "space-between",
            }}
          >
            {/* LEFT */}
            <Box>
              <Typography
                sx={{
                  fontSize: "15px",

                  fontWeight: 600,

                  color: "#0F172A",

                  mb: 0.5,
                }}
              >
                {item.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: "13px",

                  color: "#64748B",
                }}
              >
                {item.date}
              </Typography>
            </Box>

            {/* STATUS */}
            <Chip
              label={item.status}
              size="small"
              sx={{
                background: item.bg,

                color: item.color,

                fontWeight: 600,

                fontSize: "12px",

                borderRadius: "8px",
              }}
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default UpcomingPayroll;
