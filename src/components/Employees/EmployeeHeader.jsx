import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";

const EmployeeHeader = ({
  onAddEmployee,
  onUploadEmployee,
  onDownloadTemplate,
  onExportEmployees,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3.5, md: 4 },
        mb: { xs: 2.5, sm: 3, md: 4 },
        borderRadius: { xs: "20px", sm: "28px", md: "32px" },
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
          width: { xs: 180, md: 250 },
          height: { xs: 180, md: 250 },
          borderRadius: "50%",
          background: "rgba(124,58,237,0.20)",
          filter: "blur(100px)",
          top: -100,
          right: -50,
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2.5, md: 3 },
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* LEFT SIDE */}
        <Box sx={{ width: { xs: "100%", md: "auto" } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: { xs: 48, sm: 56, md: 60 },
                height: { xs: 48, sm: 56, md: 60 },
                borderRadius: { xs: "14px", sm: "18px" },
                background: "linear-gradient(135deg,#3B82F6 0%,#2563EB 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 25px rgba(59,130,246,0.35)",
                flexShrink: 0,
              }}
            >
              <GroupsRoundedIcon
                sx={{
                  color: "#fff",
                  fontSize: { xs: 26, sm: 30, md: 32 },
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: "18px",
                    sm: "22px",
                    md: "24px",
                  },
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.2,
                }}
              >
                Employee Management
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  color: "rgba(255,255,255,0.75)",
                  fontSize: { xs: "13px", sm: "14px", md: "15px" },
                }}
              >
                Manage employee records and payroll details
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* RIGHT SIDE */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            flexWrap: "wrap",
            width: { xs: "100%", md: "auto" },
          }}
        >
          <Button
            variant="outlined"
            startIcon={<DownloadRoundedIcon />}
            onClick={onDownloadTemplate}
            sx={{
              height: { xs: 44, sm: 48, md: 50 },
              px: { xs: 2, sm: 2.5 },
              width: { xs: "100%", sm: "auto" },
              borderRadius: "12px",
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              fontSize: { xs: "13px", sm: "14px" },
              border: "1.5px solid rgba(255,255,255,0.7)",
              "&:hover": {
                borderColor: "#fff",
                background: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Download Template
          </Button>

          <Button
            variant="outlined"
            startIcon={<UploadFileRoundedIcon />}
            onClick={onUploadEmployee}
            sx={{
              height: { xs: 44, sm: 48, md: 50 },
              px: { xs: 2, sm: 2.5 },
              width: { xs: "100%", sm: "auto" },
              borderRadius: "12px",
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              fontSize: { xs: "13px", sm: "14px" },
              border: "1.5px solid rgba(255,255,255,0.7)",
              "&:hover": {
                borderColor: "#fff",
                background: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Upload Excel
          </Button>

          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={onAddEmployee}
            sx={{
              height: { xs: 44, sm: 48, md: 50 },
              px: { xs: 2.5, sm: 3 },
              width: { xs: "100%", sm: "auto" },
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: { xs: "13px", sm: "14px" },
              background: "linear-gradient(90deg,#7C3AED,#2563EB)",
              boxShadow: "0 8px 20px rgba(59,130,246,0.35)",
              "&:hover": {
                background: "linear-gradient(90deg,#6D28D9,#1D4ED8)",
              },
            }}
          >
            Add Employee
          </Button>

          <Button
            variant="outlined"
            startIcon={<FileDownloadRoundedIcon />}
            onClick={onExportEmployees}
            sx={{
              height: { xs: 44, sm: 48, md: 50 },
              px: { xs: 2, sm: 2.5 },
              width: { xs: "100%", sm: "auto" },
              borderRadius: "12px",
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              fontSize: { xs: "13px", sm: "14px" },
              border: "1.5px solid rgba(255,255,255,0.7)",
              "&:hover": {
                borderColor: "#fff",
                background: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Export Employees
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default EmployeeHeader;
