import React, { useState } from "react";

import { Box, Typography, Stack, Button } from "@mui/material";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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

  const [selectedMonth, setSelectedMonth] = useState(dayjs());

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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year", "month"]}
              value={selectedMonth}
              onChange={(newValue) => setSelectedMonth(newValue)}
              format="MMMM YYYY"
              sx={{
                width: 200,

                "& .MuiPickersInputBase-root": {
                  background: "#FFFFFF !important",
                  borderRadius: "16px",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.12)",

                  transition: "all 0.2s ease",

                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  },
                },

                "& .MuiPickersSectionList-root": {
                  color: "#111827",
                  fontWeight: 600,
                  fontSize: "15px",
                },

                "& .MuiSvgIcon-root": {
                  color: "#4338CA",
                  fontSize: "22px",
                },
              }}
            />
          </LocalizationProvider>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DashboardHeader;
