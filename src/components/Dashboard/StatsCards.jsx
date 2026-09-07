import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";

const StatsCards = ({ dashboardStats, onCardClick }) => {
  const statsCards = [
    {
      title: "Total Employees",
      value: dashboardStats?.currentMonth?.employeesProcessed ?? 0,
      subtitle: "Processed This Month",
      icon: (
        <GroupsRoundedIcon
          sx={{
            fontSize: {
              xs: 24,
              sm: 28,
            },
          }}
        />
      ),
      color: "#8B5CF6",
      lightBg: "rgba(139,92,246,0.08)",
      shadowColor: "rgba(139,92,246,0.18)",
    },
    {
      title: "Payslip Sent",
      value: dashboardStats?.currentMonth?.totalDelivered ?? 0,
      subtitle: "Successfully Delivered",
      icon: (
        <CheckCircleRoundedIcon
          sx={{
            fontSize: {
              xs: 24,
              sm: 28,
            },
          }}
        />
      ),
      color: "#22C55E",
      lightBg: "rgba(34,197,94,0.08)",
      shadowColor: "rgba(34,197,94,0.18)",
    },
    {
      title: "Email Failed",
      value:
        (dashboardStats?.currentMonth?.totalFailed ?? 0) +
        (dashboardStats?.currentMonth?.totalBounced ?? 0),
      subtitle: "Delivery Failed",
      icon: (
        <CancelRoundedIcon
          sx={{
            fontSize: {
              xs: 24,
              sm: 28,
            },
          }}
        />
      ),
      color: "#F43F5E",
      lightBg: "rgba(244,63,94,0.08)",
      shadowColor: "rgba(244,63,94,0.18)",
    },
    {
      title: "Email Pending",
      value: dashboardStats?.currentMonth?.totalPending ?? 0,
      subtitle: "Payroll Executions",
      icon: (
        <ApartmentRoundedIcon
          sx={{
            fontSize: {
              xs: 24,
              sm: 28,
            },
          }}
        />
      ),
      color: "#3B82F6",
      lightBg: "rgba(59,130,246,0.08)",
      shadowColor: "rgba(59,130,246,0.18)",
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: { xs: 2, sm: 2.5, md: 3 },
        mb: 4,
        width: "100%",
      }}
    >
      {statsCards.map((card, index) => (
        <Paper
          key={index}
          elevation={0}
          onClick={() => onCardClick?.(card)}
          sx={{
            p: { xs: 2, sm: 2.5, md: 3 },
            height: { xs: "auto", md: 150 },
            minHeight: { xs: 110, sm: 120, md: "auto" },
            borderRadius: {
              xs: 3,
              md: 4,
            },
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            boxShadow: `0 8px 24px ${card.shadowColor}`,
            position: "relative",
            overflow: "hidden",
            transition: "all .25s ease",
            cursor: "pointer",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "5px",
              background: card.color,
            },
            "@media (hover: hover)": {
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: `0 14px 32px ${card.shadowColor}`,
              },
              "&:active": {
                transform: "scale(0.98)",
              },
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: 13,
                    sm: 14,
                  },
                  fontWeight: 600,
                  color: "rgba(40, 35, 35, 0.85)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {card.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: 26,
                    sm: 30,
                    md: 34,
                  },
                  fontWeight: 700,
                  color: "#262222ff",
                  mt: 1,
                  lineHeight: 1.1,
                }}
              >
                {card.value}
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: 12,
                    sm: 13,
                  },
                  color: "rgba(15, 14, 14, 0.65)",
                  mt: 0.5,
                }}
              >
                {card.subtitle}
              </Typography>
            </Box>

            <Box
              sx={{
                width: {
                  xs: 46,
                  sm: 54,
                },
                height: {
                  xs: 46,
                  sm: 54,
                },
                borderRadius: "16px",
                background: card.lightBg,
                color: card.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${card.lightBg}`,
                flexShrink: 0,
              }}
            >
              {card.icon}
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default StatsCards;
