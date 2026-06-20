import React from "react";

import { Box, Typography, Button, Paper } from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

const EmployeeHeader = ({ onAddEmployee, onUploadEmployee,onDownloadTemplate }) => {
  
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
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 3,

          position: "relative",
          zIndex: 2,
        }}
      >
        {/* LEFT SIDE */}
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,

                borderRadius: "18px",

                background: "linear-gradient(135deg,#3B82F6 0%,#2563EB 100%)",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                boxShadow: "0 8px 25px rgba(59,130,246,0.35)",
              }}
            >
              <GroupsRoundedIcon
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
                Employee Management
              </Typography>

              <Typography
                sx={{
                  mt: 1,

                  color: "rgba(255,255,255,0.75)",

                  fontSize: "16px",
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
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<DownloadRoundedIcon />}
            onClick={onDownloadTemplate}
            sx={{
              height: 52,
              px: 3,
              borderRadius: "14px",
              color: "#fff",
              borderColor: "rgba(255,255,255,0.15)",
              textTransform: "none",
              fontWeight: 600,

              "&:hover": {
                borderColor: "#fff",
                background: "rgba(255,255,255,0.05)",
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
              height: 52,

              px: 3,

              borderRadius: "14px",

              color: "#fff",

              borderColor: "rgba(255,255,255,0.15)",

              textTransform: "none",

              fontWeight: 600,

              "&:hover": {
                borderColor: "#fff",
                background: "rgba(255,255,255,0.05)",
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
            Add Employee
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default EmployeeHeader;
