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

import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  Box,
  Stack,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";
import ProfilePopover from "../ui/ProfilePopover";
import CloudeLogo from "../assets/cloude.png";

const TopToolbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "DASHBOARD", to: "/dashboard" },
    { label: "PAYROLL", to: "/payroll" },
    { label: "EMPLOYEES", to: "/employees" },
    { label: "MASTERS", to: "/masters" },
  ];

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  /* ── Mobile Drawer ── */
  const mobileDrawer = (
    <Box
      sx={{
        width: 260,
        height: "100%",
        background: "linear-gradient(180deg,#15123F 0%,#4338CA 100%)",
        display: "flex",
        flexDirection: "column",
        pt: 2,
        pb: 4,
        px: 2,
      }}
    >
      {/* Drawer header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Box
          component="img"
          src={CloudeLogo}
          alt="Logo"
          sx={{ width: 56, height: 32, objectFit: "contain" }}
        />
        <IconButton onClick={handleDrawerToggle} sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,.15)", mb: 2 }} />

      {/* Nav links */}
      <List disablePadding>
        {navLinks.map((link) => {
          const active = location.pathname === link.to;
          return (
            <ListItemButton
              key={link.to}
              component={Link}
              to={link.to}
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: "12px",
                mb: 1,
                px: 2,
                py: 1.2,
                background: active ? "rgba(255,255,255,.15)" : "transparent",
                "&:hover": { background: "rgba(255,255,255,.10)" },
              }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  sx: {
                    color: active ? "#fff" : "#C7D2FE",
                    fontWeight: active ? 700 : 500,
                    fontSize: 14,
                    letterSpacing: "0.5px",
                  },
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", md: "none" } }}
        PaperProps={{ sx: { border: "none" } }}
      >
        {mobileDrawer}
      </Drawer>

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
        background: `linear-gradient(
    90deg,
    #15123F 0%,
    #28256E 40%,
    #4338CA 75%,
    #45D7FF 100%
  )`,

        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "0 8px 30px rgba(15,23,42,.15)",

        color: "#fff",

        borderRadius: {
          xs: 0,
          md: "20px",
        },

        height: {
          xs: 60,
          md: 72,
        },

        top: {
          xs: 0,
          md: 20,
        },

        left: {
          xs: 0,
          md: 20,
        },

        right: {
          xs: 0,
          md: 20,
        },

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

          px: {
            xs: 2,
            md: 4,
          },
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
          {/* Hamburger — mobile only */}
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              color: "#fff",
              display: { xs: "flex", md: "none" },
              mr: 1,
            }}
            aria-label="open mobile navigation"
          >
            <MenuIcon />
          </IconButton>

          <Stack
            direction="row"
            spacing={{
              xs: 1.5,
              md: 3,
            }}
            alignItems="center"
            sx={{ height: "100%" }}
          >
            {/* LOGO */}
            <Box
              component="img"
              src={CloudeLogo}
              alt="Company Logo"
              sx={{
                width: {
                  xs: 60,
                  md: 90,
                },

                height: {
                  xs: 36,
                  md: 50,
                },

                objectFit: "contain",
                filter: "drop-shadow(0 8px 16px rgba(109,93,251,.25))",
              }}
            />

            {/* TITLE */}
            <Typography
              sx={{
                fontSize: {
                  xs: "15px",
                  md: "20px",
                },
                fontWeight: 700,
                background: "linear-gradient(90deg,#6D5DFB,#45D7FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
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
            spacing={{
              md: 4,
              lg: 5,
            }}
            alignItems="center"
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },

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

                fontWeight: location.pathname === "/dashboard" ? 700 : 600,
                fontSize: {
                  md: "15px",
                  lg: "17px",
                },
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
                fontSize: {
                  md: "15px",
                  lg: "17px",
                },
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
            <Typography
              component={Link}
              to="/employees"
              sx={{
                color: location.pathname === "/employees" ? "#fff" : "#E2E8F0",
                fontWeight: location.pathname === "/employees" ? 700 : 500,
                fontSize: {
                  md: "15px",
                  lg: "17px",
                },
                textDecoration: "none",
                position: "relative",
                "&::after": location.pathname === "/employees" && {
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
              EMPLOYEES
            </Typography>
            <Typography
              component={Link}
              to="/masters"
              sx={{
                color: location.pathname === "/masters" ? "#fff" : "#E2E8F0",
                fontWeight: location.pathname === "/masters" ? 700 : 500,
                fontSize: {
                  md: "15px",
                  lg: "17px",
                },
                textDecoration: "none",
                position: "relative",
                "&::after": location.pathname === "/masters" && {
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
              MASTERS
            </Typography>
          </Stack>
        </Box>

        {/* RIGHT SIDE */}
        <Stack
          direction="row"
          spacing={{
            xs: 1,
            md: 2,
          }}
          alignItems="center"
        >
          <ProfilePopover />
        </Stack>
      </Toolbar>
    </AppBar>
    </>
  );
};

export default TopToolbar;
