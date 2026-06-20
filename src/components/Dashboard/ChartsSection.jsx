// src/components/Dashboard/ChartsSection.jsx

import React from "react";

import { Grid, Paper, Typography, Box } from "@mui/material";

const ChartsSection = () => {
  return (
    <Grid container spacing={3}>
      {/* PAYROLL TREND */}
      <Grid item xs={12} lg={8}>
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
          <Box
            sx={{
              display: "flex",

              alignItems: "center",

              justifyContent: "space-between",

              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: 18,

                fontWeight: 700,

                color: "#0F172A",
              }}
            >
              Monthly Payroll Trend
            </Typography>

            <Typography
              sx={{
                fontSize: 13,

                fontWeight: 600,

                color: "#2563EB",

                cursor: "pointer",
              }}
            >
              See Details
            </Typography>
          </Box>

          {/* FAKE CHART */}
          <Box
            sx={{
              height: 320,

              borderRadius: "18px",

              background: "linear-gradient(180deg,#EFF6FF 0%,#DBEAFE 100%)",

              position: "relative",

              overflow: "hidden",

              p: 3,
            }}
          >
            {/* BARS */}
            <Box
              sx={{
                display: "flex",

                alignItems: "flex-end",

                justifyContent: "space-between",

                height: "100%",
              }}
            >
              {[50, 80, 60, 90, 70, 95].map((height, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "12%",

                    height: `${height}%`,

                    borderRadius: "14px 14px 0 0",

                    background:
                      "linear-gradient(180deg,#3B82F6 0%,#2563EB 100%)",
                  }}
                />
              ))}
            </Box>
          </Box>
        </Paper>
      </Grid>

      {/* EMAIL ANALYTICS */}
      <Grid item xs={12} lg={4}>
        <Paper
          elevation={0}
          sx={{
            p: 3,

            borderRadius: "24px",

            background: "rgba(255,255,255,0.75)",

            backdropFilter: "blur(14px)",

            border: "1px solid rgba(255,255,255,0.2)",

            boxShadow: "0 10px 32px rgba(15,23,42,0.06)",

            height: "100%",
          }}
        >
          {/* HEADER */}
          <Typography
            sx={{
              fontSize: 18,

              fontWeight: 700,

              color: "#0F172A",

              mb: 4,
            }}
          >
            Email Analytics
          </Typography>

          {/* DONUT */}
          <Box
            sx={{
              width: 220,

              height: 220,

              borderRadius: "50%",

              mx: "auto",

              background:
                "conic-gradient(#16A34A 0% 78%, #F59E0B 78% 90%, #DC2626 90% 100%)",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              position: "relative",
            }}
          >
            <Box
              sx={{
                width: 130,

                height: 130,

                borderRadius: "50%",

                background: "white",

                display: "flex",

                flexDirection: "column",

                alignItems: "center",

                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: 32,

                  fontWeight: 700,
                }}
              >
                93%
              </Typography>

              <Typography
                sx={{
                  fontSize: 13,

                  color: "#64748B",
                }}
              >
                Success
              </Typography>
            </Box>
          </Box>

          {/* STATS */}
          <Box sx={{ mt: 4 }}>
            <Typography sx={{ mb: 1 }}>🟢 Sent — 318</Typography>

            <Typography sx={{ mb: 1 }}>🟠 Pending — 7</Typography>

            <Typography>🔴 Failed — 22</Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ChartsSection;
