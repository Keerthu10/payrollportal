import React from "react";
import { Box, Typography } from "@mui/material";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import CompanyLogo from "../components/CompanyLogo";

const AuthContent = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1250px",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: {
          xs: "center",
          md: "space-between",
        },
        gap: {
          xs: 0,
          md: 8,
        },
        px: {
          xs: 2,
          sm: 3,
          md: 0,
        },
        py: {
          xs: 3,
          sm: 4,
          md: 0,
        },
      }}
    >
      {/* LEFT SIDE */}
      <Box
        sx={{
          width: "48%",
          color: "#fff",
          pr: 4,
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 5,
          }}
        >
          <CompanyLogo size="lg" variant="light" />
        </Box>

        <Typography
          sx={{
            fontWeight: 700,
            lineHeight: 1.1,
            mb: 3,
            fontSize: {
              md: 45,
              lg: 50,
            },
          }}
        >
          Welcome to Payroll Portal
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,.72)",
            fontSize: 16,
            lineHeight: 1.8,
            maxWidth: 520,
            mb: 6,
          }}
        >
          Manage employees, payroll, salary disbursements and reports
          efficiently in one place.
        </Typography>

        {[
          {
            icon: <PeopleAltOutlinedIcon />,
            title: "Employee Management",
            desc: "Manage employee details and records easily.",
          },
          {
            icon: <PaymentsOutlinedIcon />,
            title: "Payroll Processing",
            desc: "Process salaries and payroll efficiently.",
          },
          {
            icon: <BarChartOutlinedIcon />,
            title: "Reports & Analytics",
            desc: "View reports and track insights.",
          },
        ].map((item) => (
          <Box
            key={item.title}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              mb: 4,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: "rgba(255,255,255,.12)",
                border: "1px solid rgba(255,255,255,.15)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              {item.icon}
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                {item.title}
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  color: "rgba(255,255,255,.78)",
                  fontSize: 15,
                }}
              >
                {item.desc}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* RIGHT SIDE */}
      <Box
        sx={{
          width: "100%",
          maxWidth: {
            xs: 420,
            sm: 480,
            md: 520,
          },

          position: "relative",
          overflow: "hidden",

          background: "rgba(255,255,255,.96)",
          backdropFilter: "blur(20px)",

          border: "1px solid rgba(255,255,255,.2)",

          borderRadius: {
            xs: 20,
            sm: 24,
            md: 28,
          },

          px: {
            xs: 2.5,
            sm: 5,
            md: 7,
          },

          py: {
            xs: 3,
            sm: 5,
            md: 7,
          },

          boxShadow: "0 30px 70px rgba(15,23,42,.18)",

          "&::before": {
            content: '""',
            position: "absolute",
            width: {
              xs: 180,
              md: 250,
            },
            height: {
              xs: 180,
              md: 250,
            },
            borderRadius: "50%",
            background: "rgba(56,189,248,.10)",
            filter: "blur(100px)",
            bottom: -80,
            right: -80,
          },

          "&::after": {
            content: '""',
            position: "absolute",
            width: {
              xs: 120,
              md: 180,
            },
            height: {
              xs: 120,
              md: 180,
            },
            borderRadius: "50%",
            background: "rgba(91,76,245,.10)",
            filter: "blur(80px)",
            top: -60,
            left: -60,
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthContent;