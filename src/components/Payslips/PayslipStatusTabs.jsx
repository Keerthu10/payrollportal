import React from "react";
import { Box, Chip } from "@mui/material";

const statusTabs = [
  { label: "All", value: "ALL" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Failed", value: "FAILED" },
  { label: "Bounced", value: "BOUNCED" },
  { label: "Pending", value: "PENDING" },
  { label: "Printed", value: "PRINTED" },
];

const PayslipStatusTabs = ({ selectedStatus, onStatusChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        overflowX: "auto",
        whiteSpace: "nowrap",
        pb: 1,
        mb: 3,

        "&::-webkit-scrollbar": {
          display: "none",
        },

        scrollbarWidth: "none",
      }}
    >
      {statusTabs.map((tab) => (
        <Chip
          key={tab.value}
          label={tab.label}
          clickable
          onClick={() => onStatusChange(tab.value)}
          sx={{
            flexShrink:0,
            px: 1,
            borderRadius: "13px",
            fontWeight: 600,
            fontSize: {
              xs: "12px",
              md: "14px",
            },
            height: {
              xs: 34,
              md: 38,
            },

            background:
              selectedStatus === tab.value
                ? "linear-gradient(90deg,#7C3AED,#2563EB)"
                : "#FFFFFF",

            color: selectedStatus === tab.value ? "#FFFFFF" : "#374151",

            border: selectedStatus === tab.value ? "none" : "1px solid #E5E7EB",

            boxShadow:
              selectedStatus === tab.value
                ? "0 8px 20px rgba(124,58,237,0.25)"
                : "none",

            "&:hover": {
              background:
                selectedStatus === tab.value
                  ? "linear-gradient(90deg,#6D28D9,#1D4ED8)"
                  : "#F9FAFB",
            },
          }}
        />
      ))}
    </Box>
  );
};

export default PayslipStatusTabs;
