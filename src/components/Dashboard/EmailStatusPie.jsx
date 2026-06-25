import React from "react";
import { Box, Typography } from "@mui/material";

const Ring = ({ radius, progress, color, strokeWidth = 16 }) => {
  const normalizedRadius = radius - strokeWidth / 2;

  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <>
      <circle
        r={normalizedRadius}
        cx="110"
        cy="110"
        fill="transparent"
        stroke="#ECECEC"
        strokeWidth={strokeWidth}
      />

      <circle
        r={normalizedRadius}
        cx="110"
        cy="110"
        fill="transparent"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 110 110)"
      />
    </>
  );
};

const EmailStatusPie = ({ dashboardStats }) => {
  const delivered = dashboardStats?.overall?.totalDelivered || 0;

  const pending = dashboardStats?.overall?.totalPending || 0;

  const failed = dashboardStats?.overall?.totalFailed || 0;

  const bounced = dashboardStats?.overall?.totalBounced || 0;

  const total = delivered + pending + failed + bounced;

  return (
    <Box
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          color: "#0F172A",
          fontSize: "18px",
          mb: 3,
        }}
      >
        Email Status
      </Typography>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <svg width="220" height="220">
          <Ring
            radius={75}
            progress={(delivered / total) * 100}
            color="#10B981"
          />

          <Ring
            radius={55}
            progress={(pending / total) * 100}
            color="#FBBF24"
          />

          <Ring radius={35} progress={(failed / total) * 100} color="#FF7A59" />

          <text
            x="110"
            y="100"
            textAnchor="middle"
            fill="#64748B"
            fontSize="18"
            fontWeight="600"
          >
            Total
          </text>

          <text
            x="110"
            y="135"
            textAnchor="middle"
            fill="#111827"
            fontSize="26"
            fontWeight="700"
          >
            {total}
          </text>
        </svg>
      </Box>

      <Box
        sx={{
          mt:2,
          borderTop: "1px dashed #E5E7EB",
          pt: 3,
          display: "flex",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Legend color="#10B981" label="Delivered" />
        <Legend color="#FBBF24" label="Pending" />
        <Legend color="#FF7A59" label="Failed" />
      </Box>
    </Box>
  );
};

const Legend = ({ color, label }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
    }}
  >
    <Box
      sx={{
        width: 14,
        height: 14,
        borderRadius: "50%",
        bgcolor: color,
      }}
    />

    <Typography>{label}</Typography>
  </Box>
);

export default EmailStatusPie;
