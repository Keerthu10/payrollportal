import React, { useState } from "react";

import { Box, Typography, Stack, Button, Tooltip } from "@mui/material";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import dayjs, { Dayjs } from "dayjs";
import Business from "../../assets/Business.png";
import StatsCards from "./StatsCards";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

const DashboardHeader = ({
  dashboardStats,
  selectedMonth,
  setSelectedMonth,
  onCardClick,
  onRefresh,
}) => {
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

  const [spinning, setSpinning] = useState(false);

  const handleRefreshClick = () => {
    setSpinning(true);
    onRefresh();
    setTimeout(() => setSpinning(false), 600);
  };

  return (
    <Box
      sx={{
        background: "#fff",
        borderRadius: 6,
        boxShadow: "0 8px 30px rgba(0,0,0,.08)",
        p: 4,
      }}
    >
      {/* TOP SECTION */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: { xs: 3, md: 0 },
          mb: 5,
        }}
      >
        {/* Left */}
        <Box>
          <Typography
            sx={{
              fontSize: { xs: 22, md: 30 },
              fontWeight: 700,
              color: "#0F172A",
              mb: 1,
            }}
          >
            {greeting}, Admin! 👋
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              color: "#64748B",
            }}
          >
            Welcome to Payroll Portal
          </Typography>
        </Box>
        {/* <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 700,
              color: "#0F172A",
              letterSpacing: "-0.5px",
              mb: 1,
            }}
          >
            Welcome, Admin! <span>👋</span>
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              color: "#64748B",
              fontWeight: 500,
            }}
          >
            Hope you're having a productive day ✨
          </Typography>
        </Box> */}

        {/* Right */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Box
            component="img"
            src={Business}
            sx={{
              height: { xs: 60, md: 100 },
              objectFit: "contain",
              display: { xs: "none", sm: "block" },
            }}
          />

          <Tooltip title="Refresh">
            <Button
              variant="outlined"
              onClick={handleRefreshClick}
              sx={{
                minWidth: 0,
                width: 56,
                height: 56,
                borderRadius: "16px",
                background: "#fff",
                border: "1px solid rgba(0,0,0,.12)",
                boxShadow: "0 6px 16px rgba(0,0,0,.08)",
                "&:hover": {
                  background: "#F5F3FF",
                  boxShadow: "0 6px 16px rgba(0,0,0,.12)",
                },
              }}
            >
              <RefreshRoundedIcon
                sx={{
                  color: "#4F46E5",
                  transition: "transform 0.6s ease",
                  transform: spinning ? "rotate(360deg)" : "rotate(0deg)",
                }}
              />
            </Button>
          </Tooltip>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year", "month"]}
              value={selectedMonth}
              onChange={(newValue) => setSelectedMonth(newValue)}
              format="MMMM YYYY"
              disableFuture
              maxDate={dayjs()}
              sx={{
                width: 180,

                "& .MuiPickersInputBase-root": {
                  background: "#fff",
                  borderRadius: "16px",
                  boxShadow: "0 6px 16px rgba(0,0,0,.08)",
                },

                "& .MuiSvgIcon-root": {
                  color: "#4F46E5",
                },
              }}
            />
          </LocalizationProvider>
        </Box>
      </Box>

      {/* BOTTOM SECTION */}
      <StatsCards dashboardStats={dashboardStats} onCardClick={onCardClick} />
    </Box>
  );
};

export default DashboardHeader;
