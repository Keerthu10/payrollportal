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

import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Stack,
  Badge,
  InputBase,
  Avatar,
  Typography,
} from "@mui/material";

import {
  Menu as MenuIcon,
  NotificationsNoneOutlined,
  MailOutlineOutlined,
  Search,
} from "@mui/icons-material";
import ProfilePopover from "../ui/ProfilePopover";

const TopToolbar = ({ open, setOpen }) => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "#FFFFFF",

        borderBottom: "1px solid #E5E7EB",

        color: "#111827",

        zIndex: 1400,

        height: "88px",

        justifyContent: "center",

        boxShadow: "none",

        left: open ? "240px" : "88px",

        width: open ? "calc(100% - 240px)" : "calc(100% - 88px)",

        transition: "left 0.25s ease, width 0.25s ease",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",

          justifyContent: "space-between",
        }}
      >
        {/* LEFT SIDE */}
        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: 2,
          }}
        >
          {/* SIDEBAR TOGGLE */}
          <IconButton
            onClick={() => setOpen((prev) => !prev)}
            sx={{
              color: "#64748B",

              display: { xs: "none", lg: "flex" },
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* SEARCH BAR */}
          {/* <Box
            sx={{
              display: "flex",

              alignItems: "center",

              background: "#F8FAFC",

              border: "1px solid #E5E7EB",

              borderRadius: "14px",

              px: 2,

              width: "320px",

              height: "44px",
            }}
          >
            <Search
              sx={{
                color: "#94A3B8",

                mr: 1,
              }}
            />

            <InputBase
              placeholder="Search here..."
              sx={{
                flex: 1,

                fontSize: "14px",

                color: "#111827",
              }}
            />
          </Box> */}
        </Box>

        {/* RIGHT SIDE */}
        <Stack direction="row" spacing={2} alignItems="center">
          {/* NOTIFICATIONS */}
          <IconButton
            sx={{
              color: "#64748B",
            }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsNoneOutlined />
            </Badge>
          </IconButton>

          {/* MAIL */}
          <IconButton
            sx={{
              color: "#64748B",
            }}
          >
            <Badge badgeContent={2} color="error">
              <MailOutlineOutlined />
            </Badge>
          </IconButton>

          {/* PROFILE */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            {/* <Avatar
              src="https://i.pravatar.cc/150?img=12"
              sx={{
                width: 42,

                height: 42,
              }}
            /> */}

            <ProfilePopover />

            {/* <Box>
              <Typography
                sx={{
                  fontSize: "14px",

                  fontWeight: 600,

                  color: "#111827",

                  lineHeight: 1.2,
                }}
              >
                Admin
              </Typography>

              <Typography
                sx={{
                  fontSize: "12px",

                  color: "#94A3B8",
                }}
              >
                Super Admin
              </Typography>
            </Box> */}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopToolbar;
