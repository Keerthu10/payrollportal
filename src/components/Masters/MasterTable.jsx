import React from "react";
import { Paper, Box, Typography, Button } from "@mui/material";
import Table from "../../ui/Table";

const MasterTable = ({
  rows,
  columns,
  loading,
  title,
  subtitle,
  buttonText,
  onAddClick,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "20px",
        overflow: "hidden",

        background: "#23255E",

        border: "1px solid rgba(255,255,255,0.08)",

        p: 1,

        boxShadow: "0 12px 24px rgba(0,0,0,0.18), 0 4px 8px rgba(0,0,0,0.12)",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
            {title}
          </Typography>

          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
            {subtitle}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            onClick={onAddClick}
            sx={{
              height: 52,

              px: 4,

              borderRadius: "14px",

              textTransform: "none",

              fontWeight: 600,

              background: "linear-gradient(90deg,#7C3AED,#2563EB)",

              boxShadow: "0 10px 25px rgba(59,130,246,0.35)",

              "&:hover": {
                background: "linear-gradient(90deg,#6D28D9,#1D4ED8)",
              },
            }}
          >
            {buttonText}
          </Button>
        </Box>
      </Box>
      <Table rows={rows} columns={columns} loading={loading} height={650} />
    </Paper>
  );
};

export default MasterTable;
