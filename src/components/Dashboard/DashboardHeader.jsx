import React, { useState } from "react";

import { Box, Typography, Stack, Button, Tooltip } from "@mui/material";
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

        borderRadius: {
          xs: 3,
          md: 6,
        },

        boxShadow: "0 8px 30px rgba(0,0,0,.08)",

        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      {/* TOP SECTION */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: { xs: 2, md: 0 },
          width: "100%",
          mb: {
            xs: 3,
            md: 5,
          },
        }}
      >
        {/* Left */}
        <Box>
          <Typography
            sx={{
              fontSize: { xs: 22, sm: 26, md: 30 },
              fontWeight: 700,
              color: "#0F172A",
              mb: 1,
            }}
          >
            {greeting}, Admin! 👋
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: 15,
                sm: 16,
                md: 18,
              },
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
        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            justifyContent: {
              xs: "space-between",
              md: "flex-end",
            },

            flexWrap: "wrap",

            width: {
              xs: "100%",
              md: "auto",
            },

            gap: {
              xs: 2,
              sm: 3,
              md: 4,
            },
          }}
        >
          <Box
            component="img"
            src={Business}
            sx={{
              height: { sm: 70, md: 100 },
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
                width: {
                  xs: 48,
                  sm: 56,
                },

                height: {
                  xs: 48,
                  sm: 56,
                },
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
              onChange={(newValue) => {
                if (newValue) {
                  setSelectedMonth(newValue);
                }
              }}
              format="MMMM YYYY"
              disableFuture
              maxDate={dayjs()}
              sx={{
                width: {
                  xs: "100%",
                  sm: 200,
                  md: 180,
                },

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
