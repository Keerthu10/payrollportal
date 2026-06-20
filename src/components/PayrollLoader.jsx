import React from "react";
import { Backdrop, Box, Typography, CircularProgress } from "@mui/material";

const PayrollLoader = ({ open, progress = 0, total = 0, current = 0 }) => {
  const getMessage = () => {
    if (progress <= 30) return "Processing Payroll Details...";

    if (progress <= 70) return "Generating Payslips...";

    return "Sending Emails...";
  };

  return (
    <Backdrop
      open={open}
      sx={{
        position: "absolute",
        zIndex: 99999,
        background: "rgba(2,6,23,0.72)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Box
        sx={{
          width: 360,
          borderRadius: "24px",
          p: 5,
          textAlign: "center",

          background: "linear-gradient(135deg,#0f172a,#1e293b)",

          border: "1px solid rgba(255,255,255,0.08)",

          boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
            mb: 3,
          }}
        >
          <CircularProgress
            variant="determinate"
            value={progress}
            size={120}
            thickness={4}
            sx={{
              color: "#6366F1",
            }}
          />

          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: "28px",
                fontWeight: 700,
              }}
            >
              {progress}%
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            color: "#fff",
            fontSize: "22px",
            fontWeight: 700,
            mb: 1,
          }}
        >
          {getMessage()}
        </Typography>

        <Typography
          sx={{
            color: "#94A3B8",
            fontSize: "14px",
          }}
        >
          Processed {current} / {total}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default PayrollLoader;
