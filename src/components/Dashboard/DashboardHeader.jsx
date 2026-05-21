import React from "react";

import { Box, Typography, Stack, Button } from "@mui/material";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

const DashboardHeader = () => {
  const today = new Date();

  const hour = today.getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
        ? "Good Afternoon"
        : hour < 21
          ? "Good Evening"
          : "Good Night";

  const formattedDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Box
      sx={{
        background: "transparent",

        border: "none",

        borderRadius: "0",
        boxShadow: "none",

        p: 3,

        mb: 1,
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
              fontSize: "28px",
              fontWeight: 700,
              color: "#fff",
              textShadow: "0 2px 6px rgba(0,0,0,0.25)",
              letterSpacing: "-0.5px",
              mb: 1,
            }}
          >
            Welcome, Admin! <span>👋</span>
          </Typography>

          <Typography
            sx={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.85)",
              fontWeight: 500,
            }}
          >
            Hope you're having a productive day ✨
          </Typography>
        </Box>

        {/* RIGHT SIDE */}
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{ ml: "auto" }}
        >
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

              background: "linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)",

              border: "1px solid #C7D2FE",

              color: "#4338CA",

              boxShadow: "0 4px 12px rgba(99,102,241,0.12)",

              "&:hover": {
                background: "linear-gradient(135deg, #E0E7FF 0%, #EDE9FE 100%)",

                borderColor: "#818CF8",

                transform: "translateY(-1px)",
              },
            }}
          >
            {formattedDate}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DashboardHeader;
