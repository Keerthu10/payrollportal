// import React from "react";
// import { Box } from "@mui/material";

// const AuthContent = ({ children }) => {
//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: 450,
//         p: 5,
//         borderRadius: 5,

//         backdropFilter: "blur(20px)",
//         backgroundColor: "rgba(255,255,255,0.75)",
//         border: "1px solid rgba(255,255,255,0.3)",
//         boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
//       }}
//     >
//       {children}
//     </Box>
//   );
// };

// export default AuthContent;

import React from "react";
import { Box, Typography } from "@mui/material";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import logo from "../../src/assets/cloude.png";

const AuthContent = ({ children }) => {
  return (
    <Box
      sx={{
        width: "90%",
        maxWidth: "1250px",
        minHeight: "720px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 6,
      }}
    >
      {/* LEFT SIDE */}
      <Box
        sx={{
          width: "52%",
          color: "#fff",
          pr: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 5,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Cloute"
            sx={{
              width: 60,
            }}
          />

          <Typography
            sx={{
              letterSpacing: 4,
              fontWeight: 600,
              fontSize: 16,
              color: "rgba(255,255,255,.75)",
            }}
          >
            CLOUTE TECHNOLOGIES
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: {
              xs: 35,
              md: 45,
            },
            fontWeight: 700,
            lineHeight: 1.1,
            mb: 3,
          }}
        >
          Welcome to Payroll Portal
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,.7)",
            fontSize: 16,
            lineHeight: 1.8,
            maxWidth: "520px",
            mb: 6,
          }}
        >
          Manage payroll, employees, salary disbursements and reports
          efficiently in one place.
        </Typography>

        {/* Employee Management */}
        {/* Employee Management */}
        <Box
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
              bgcolor: "rgba(255,255,255,.1)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <PeopleAltOutlinedIcon />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 600,
                color: "#fff",
              }}
            >
              Employee Management
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                color: "rgba(255,255,255,.7)",
                fontSize: 15,
              }}
            >
              Manage employee details and records easily.
            </Typography>
          </Box>
        </Box>

        {/* Payroll Processing */}
        <Box
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
              bgcolor: "rgba(255,255,255,.1)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <PaymentsOutlinedIcon />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 600,
                color: "#fff",
              }}
            >
              Payroll Processing
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                color: "rgba(255,255,255,.7)",
                fontSize: 15,
              }}
            >
              Process salaries and payroll efficiently.
            </Typography>
          </Box>
        </Box>

        {/* Reports & Analytics */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,.1)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <BarChartOutlinedIcon />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 600,
                color: "#fff",
              }}
            >
              Reports & Analytics
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                color: "rgba(255,255,255,.7)",
                fontSize: 15,
              }}
            >
              View reports and track insights.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* RIGHT SIDE CARD */}
      <Box
        sx={{
          width: 500,
          position: "relative",
          overflow: "hidden",

          background: "rgba(255,255,255,.94)",
          backdropFilter: "blur(20px)",

          border: "1px solid rgba(255,255,255,.2)",

          borderRadius: "32px",

          px: 7,
          py: 7,

          boxShadow: "0 25px 60px rgba(15,23,42,.18)",

          "&::before": {
            content: '""',
            position: "absolute",
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "rgba(69,215,255,.15)",
            filter: "blur(100px)",
            bottom: -100,
            right: -100,
          },

          "&::after": {
            content: '""',
            position: "absolute",
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "rgba(109,93,251,.12)",
            filter: "blur(80px)",
            top: -80,
            left: -80,
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
