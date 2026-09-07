import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";

const MasterHeader = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 5,
        mb: 4,
        borderRadius: "32px",
        background: "linear-gradient(135deg,#1E1B6D 0%, #2B256F 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blur Effect */}
      <Box
        sx={{
          position: "absolute",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "rgba(124,58,237,0.20)",
          filter: "blur(100px)",
          top: -100,
          right: -50,
        }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "18px",
            background: "linear-gradient(135deg,#7C3AED,#2563EB)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 25px rgba(59,130,246,0.35)",
          }}
        >
          <BusinessRoundedIcon
            sx={{
              color: "#fff",
              fontSize: 32,
            }}
          />
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: "15px",
                md: "22px",
              },
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
            }}
          >
            Master Management
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "rgba(255,255,255,0.75)",
              fontSize: "16px",
            }}
          >
            Configure designation, employment types, and business rules
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default MasterHeader;
