import React from "react";

import { Box, Typography, Stack, Button } from "@mui/material";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

const DashboardHeader = () => {
  return (
    <Box
      sx={{
        background: "#FFFFFF",

        border: "1px solid #E2E8F0",

        borderRadius: "18px",

        p: 3,

        mb: 1,

        boxShadow: "0 2px 10px rgba(15,23,42,0.03)",
      }}
    >
      {/* TOP SECTION */}
      <Stack
        direction={{
          xs: "column",
          lg: "row",
        }}
        justifyContent="space-between"
        alignItems={{
          xs: "flex-start",
          lg: "center",
        }}
        spacing={2}
      >
        {/* LEFT SIDE */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#0F172A",
              mb: 1,
            }}
          >
            Good Morning, Admin! 👋
          </Typography>

          <Typography
            sx={{
              fontSize: "14px",
              color: "#64748B",
            }}
          >
            Here's what's happening with your payroll today.
          </Typography>
        </Box>

        {/* RIGHT SIDE */}
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{ ml: "auto" }}
        >
          {/* RUN PAYROLL */}
          <Button
            variant="contained"
            startIcon={<PlayArrowRoundedIcon />}
            sx={{
              height: "42px",

              minWidth: "145px",

              background: "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)",

              borderRadius: "10px",

              textTransform: "none",

              fontWeight: 600,

              fontSize: "14px",

              whiteSpace: "nowrap",

              boxShadow: "0 6px 14px rgba(99,102,241,0.18)",

              "&:hover": {
                background: "linear-gradient(135deg, #6D28D9 0%, #4338CA 100%)",
              },
            }}
          >
            Run Payroll
          </Button>

          {/* UPLOAD EXCEL */}
          <Button
            variant="outlined"
            startIcon={<UploadFileRoundedIcon />}
            sx={{
              height: "42px",

              minWidth: "145px",

              borderRadius: "10px",

              textTransform: "none",

              fontWeight: 600,

              fontSize: "14px",

              whiteSpace: "nowrap",

              borderColor: "#D1D5DB",

              color: "#0F172A",

              "&:hover": {
                borderColor: "#6366F1",
                background: "#EEF2FF",
              },
            }}
          >
            Upload Excel
          </Button>

          {/* GENERATE PAYSLIPS */}
          <Button
            variant="outlined"
            startIcon={<DescriptionRoundedIcon />}
            sx={{
              height: "42px",

              minWidth: "145px",

              borderRadius: "10px",

              textTransform: "none",

              fontWeight: 600,

              fontSize: "14px",

              whiteSpace: "nowrap",

              borderColor: "#D1D5DB",

              color: "#0F172A",

              "&:hover": {
                borderColor: "#6366F1",
                background: "#EEF2FF",
              },
            }}
          >
            Generate Payslips
          </Button>

          {/* DATE BUTTON */}
          <Button
            variant="outlined"
            startIcon={<CalendarTodayOutlinedIcon />}
            sx={{
              height: "42px",
              minWidth: "170px",
              fontSize: "14px",
              whiteSpace: "nowrap",
              borderRadius: "10px",

              textTransform: "none",

              fontWeight: 600,

              borderColor: "#D1D5DB",

              color: "#0F172A",

              "&:hover": {
                borderColor: "#6366F1",
                background: "#EEF2FF",
              },
            }}
          >
            May 20 - May 26, 2026
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DashboardHeader;
