// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Box,
//   Stack,
//   Badge,
// } from "@mui/material";

// import MenuIcon from "@mui/icons-material/Menu";
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

// import DatePickerComponent from "../ui/DatePicker";
// import ProfilePopover from "../ui/ProfilePopover";

// const TopToolbar = ({ open, setOpen }) => {
//   return (
//     <AppBar
//       position="fixed"
//       elevation={0}
//       sx={{
//         background: "rgba(2, 6, 23, 0.82)",
//         backdropFilter: "blur(18px)",
//         WebkitBackdropFilter: "blur(18px)",
//         borderBottom: "1px solid rgba(255,255,255,0.06)",
//         boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
//         color: "#F8FAFC",
//         zIndex: 1200,
//         height: "70px",
//         justifyContent: "center",
//       }}
//     >
//       <Toolbar
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//       >
//         {/* LEFT SECTION */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 2,
//           }}
//         >
//           {/* Sidebar Toggle */}
//           <IconButton
//             sx={{
//               color: "#E2E8F0",
//               display: { xs: "none", lg: "flex" },
//             }}
//             onClick={() => setOpen((prev) => !prev)}
//           >
//             <MenuIcon />
//           </IconButton>

//           {/* Logo */}
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: 700,
//               letterSpacing: 1,
//             }}
//           >
//             PAYROLL PORTAL
//           </Typography>
//         </Box>

//         {/* RIGHT SECTION */}
//         <Stack direction="row" spacing={1} alignItems="center">
//           {/* Date Picker */}
//           {/* <DatePickerComponent /> */}

//           {/* Notifications */}
//           <IconButton sx={{ color: "#E2E8F0" }}>
//             <Badge badgeContent={3} color="error">
//               <NotificationsNoneOutlinedIcon />
//             </Badge>
//           </IconButton>

//           {/* Settings */}
//           <IconButton sx={{ color: "#E2E8F0" }}>
//             <SettingsOutlinedIcon />
//           </IconButton>

//           {/* Profile */}
//           <ProfilePopover />
//         </Stack>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default TopToolbar;

import React from "react";

import { AppBar, Toolbar, Box, Stack, Avatar, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import ProfilePopover from "../ui/ProfilePopover";
import CloudeLogo from "../assets/cloude.png";

const TopToolbar = () => {
  const location = useLocation();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      // sx={{
      //   background: "linear-gradient(90deg, #0B132B 0%, #111827 100%)",
      //   borderBottom: "1px solid #1F2937",
      //   backdropFilter: "blur(10px)",

      //   color: "#111827",

      //   zIndex: 1200,

      //   height: "68px",

      //   justifyContent: "center",

      //   boxShadow: "none",

      //   left: open ? `${SIDEBAR_WIDTH}px` : `${COLLAPSED_WIDTH}px`,

      //   width: open
      //     ? `calc(100% - ${SIDEBAR_WIDTH}px)`
      //     : `calc(100% - ${COLLAPSED_WIDTH}px)`,

      //   transition: "all 0.25s ease",
      // }}
      sx={{
        background: "rgba(255,255,255,0.12)",

        backdropFilter: "blur(14px)",

        border: "1px solid rgba(255,255,255,0.15)",

        borderRadius: "20px",

        color: "#fff",

        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",

        height: "80px",

        top: 20,

        left: 20,

        right: 20,

        width: "auto",

        zIndex: 1200,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",

          height: "100%",

          px: 4,
        }}
      >
        {/* LEFT SIDE */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            position: "relative",
          }}
        >
          {/* LOGO */}

          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            sx={{ height: "100%" }}
          >
            {/* LOGO */}
            <Box
              component="img"
              src={CloudeLogo}
              alt="Company Logo"
              sx={{
                width: 90,
                height: 50,
                objectFit: "contain",
                filter: "drop-shadow(0 0 6px rgba(255,255,255,0.6))",
              }}
            />

            {/* TITLE */}
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "0.5px",
                lineHeight: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              PAYROLL PORTAL
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={5}
            alignItems="center"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Typography
              component={Link}
              to="/dashboard"
              sx={{
                color: location.pathname === "/dashboard" ? "#fff" : "#E2E8F0",
                fontWeight: location.pathname === "/dashboard" ? 700 : 500,
                fontSize: "17px",
                position: "relative",
                textDecoration: "none",
                "&::after": location.pathname === "/dashboard" && {
                  content: '""',
                  position: "absolute",
                  bottom: -4,
                  left: 0,
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#fff",
                  borderRadius: "2px",
                },
              }}
            >
              DASHBOARD
            </Typography>
            <Typography
              component={Link}
              to="/payroll"
              sx={{
                color: location.pathname === "/payroll" ? "#fff" : "#E2E8F0",
                fontWeight: location.pathname === "/payroll" ? 700 : 500,
                fontSize: "17px",
                textDecoration: "none",
                position: "relative",
                "&::after": location.pathname === "/payroll" && {
                  content: '""',
                  position: "absolute",
                  bottom: -4,
                  left: 0,
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#fff",
                  borderRadius: "2px",
                },
              }}
            >
              PAYROLL
            </Typography>
          </Stack>
        </Box>

        {/* RIGHT SIDE */}
        <Stack direction="row" spacing={2} alignItems="center">
          <ProfilePopover />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopToolbar;
