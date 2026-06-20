// src/components/Dashboard/LiveProcess.jsx

import React from "react";

import { Paper, Typography, Box, LinearProgress, Stack } from "@mui/material";

const LiveProcess = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,

        borderRadius: "24px",

        background: "rgba(255,255,255,0.75)",

        backdropFilter: "blur(14px)",

        border: "1px solid rgba(255,255,255,0.2)",

        boxShadow: "0 10px 32px rgba(15,23,42,0.06)",
      }}
    >
      {/* HEADER */}
      <Typography
        sx={{
          fontSize: 18,

          fontWeight: 700,

          color: "#0F172A",

          mb: 3,
        }}
      >
        Live Payroll Process
      </Typography>

      {/* PROGRESS */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",

            justifyContent: "space-between",

            mb: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            Processing Employees
          </Typography>

          <Typography
            sx={{
              fontWeight: 700,

              color: "#2563EB",
            }}
          >
            72%
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={72}
          sx={{
            height: 12,

            borderRadius: "999px",

            background: "#DBEAFE",

            "& .MuiLinearProgress-bar": {
              borderRadius: "999px",

              background: "linear-gradient(90deg,#2563EB,#3B82F6)",
            },
          }}
        />
      </Box>

      {/* EMPLOYEE COUNT */}
      <Box
        sx={{
          p: 2,

          borderRadius: "18px",

          background: "#EFF6FF",

          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: 15,

            color: "#64748B",
          }}
        >
          Employees Processed
        </Typography>

        <Typography
          sx={{
            fontSize: 32,

            fontWeight: 700,

            color: "#0F172A",
          }}
        >
          234 / 340
        </Typography>
      </Box>

      {/* LIVE LOGS */}
      <Stack spacing={2}>
        <Typography>✅ Excel Uploaded</Typography>

        <Typography>✅ Data Validated</Typography>

        <Typography>⏳ Generating PDFs</Typography>

        <Typography>⏳ Sending Emails</Typography>
      </Stack>
    </Paper>
  );
};

export default LiveProcess;
