// import React, { useState } from "react";
// import {
//   Avatar,
//   Box,
//   Divider,
//   IconButton,
//   Menu,
//   MenuItem,
//   Typography,
// } from "@mui/material";

// import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import { motion } from "framer-motion";

// const ProfilePopover = () => {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const open = Boolean(anchorEl);

//   const handleOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <IconButton
//         onClick={handleOpen}
//         sx={{
//           transition: "all 0.3s ease",

//           "&:hover": {
//             transform: "scale(1.08)",
//           },
//         }}
//       >
//         <Box
//   sx={{
//     p: 2.5,
//     display: "flex",
//     alignItems: "center",
//     gap: 1.5,
//   }}
// >
//         <Avatar
//           sx={{
//             width: 42,
//             height: 42,

//             background: "linear-gradient(135deg,#3B82F6 0%, #6366F1 100%)",

//             fontWeight: 700,

//             border: "2px solid rgba(255,255,255,0.25)",

//             boxShadow: "0 4px 18px rgba(59,130,246,0.35)",
//           }}
//         >
//           K
//         </Avatar>
//       </IconButton>

//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           sx: {
//             mt: 1.8,

//             width: 280,

//             borderRadius: "22px",

//             background:
//               "linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(30,41,59,0.94) 100%)",

//             backdropFilter: "blur(22px)",
//             WebkitBackdropFilter: "blur(22px)",

//             border: "1px solid rgba(255,255,255,0.08)",

//             color: "white",

//             boxShadow: "0 18px 50px rgba(0,0,0,0.45)",

//             overflow: "hidden",
//           },
//         }}
//       >
//         <Box sx={{ p: 2 }}>
//           <Typography sx={{ fontWeight: 700 }}>Keerthana</Typography>

//           <Typography
//             sx={{
//               fontSize: "14px",
//               color: "#CBD5E1",
//             }}
//           >
//             admin@payroll.com
//           </Typography>
//         </Box>

//         <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

//         <MenuItem
//           sx={{
//             py: 1.5,
//             px: 2,
//             mx: 1,
//             my: 0.5,
//             borderRadius: "12px",

//             transition: "all 0.25s ease",

//             "&:hover": {
//               backgroundColor: "rgba(255,255,255,0.08)",
//               transform: "translateX(4px)",
//             },
//           }}
//         >
//           <PersonOutlineOutlinedIcon sx={{ mr: 1 }} />
//           Profile
//         </MenuItem>

//         <MenuItem sx={{ py: 1.5 }}>
//           <SettingsOutlinedIcon sx={{ mr: 1 }} />
//           Settings
//         </MenuItem>

//         <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

//         <MenuItem
//           sx={{
//             py: 1.5,
//             px: 2,
//             mx: 1,
//             my: 1,

//             borderRadius: "12px",

//             color: "#F87171",

//             transition: "all 0.25s ease",

//             "&:hover": {
//               backgroundColor: "rgba(239,68,68,0.12)",
//               transform: "translateX(4px)",
//             },
//           }}
//         >
//           <LogoutOutlinedIcon sx={{ mr: 1 }} />
//           Logout
//         </MenuItem>
//       </Menu>
//     </>
//   );
// };

// export default ProfilePopover;
import React, { useState } from "react";

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const ProfilePopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* PROFILE BUTTON */}
      <IconButton
        onClick={handleOpen}
        sx={{
          transition: "all 0.3s ease",

          "&:hover": {
            transform: "scale(1.08)",
          },
        }}
      >
        <Avatar
          sx={{
            width: 42,
            height: 42,

            background: "linear-gradient(135deg,#3B82F6 0%, #6366F1 100%)",

            fontWeight: 700,

            border: "2px solid rgba(255,255,255,0.25)",

            boxShadow: "0 4px 18px rgba(59,130,246,0.35)",
          }}
        >
          K
        </Avatar>
      </IconButton>

      {/* MENU */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionProps={{
          timeout: 300,
        }}
        // PaperProps={{
        //   sx: {
        //     mt: 1.8,

        //     width: 280,

        //     borderRadius: "22px",

        //     background:
        //       "linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(30,41,59,0.94) 100%)",

        //     backdropFilter: "blur(22px)",
        //     WebkitBackdropFilter: "blur(22px)",

        //     border: "1px solid rgba(255,255,255,0.08)",

        //     color: "white",

        //     boxShadow: "0 18px 50px rgba(0,0,0,0.45)",

        //     overflow: "hidden",
        //   },
        // }}

        slotProps={{
          paper: {
            elevation: 0,

            sx: {
              mt: 1.8,

              width: 280,

              borderRadius: "22px",

              background:
                "linear-gradient(180deg, rgba(2,6,23,0.96) 0%, rgba(15,23,42,0.94) 100%)",

              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",

              border: "1px solid rgba(255,255,255,0.08)",

              color: "#F8FAFC",

              boxShadow: "0 18px 50px rgba(0,0,0,0.45)",

              overflow: "hidden",

              "& .MuiMenu-list": {
                padding: "8px",
              },
            },
          },
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            p: 2.5,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "18px",
            }}
          >
            Keerthana
          </Typography>

          <Typography
            sx={{
              fontSize: "14px",
              color: "#CBD5E1",
            }}
          >
            admin@payroll.com
          </Typography>
        </Box>

        <Divider
          sx={{
            borderColor: "rgba(255,255,255,0.08)",
          }}
        />

        {/* PROFILE */}
        <MenuItem
          sx={{
            py: 1.5,
            px: 2,

            mx: 1,
            my: 0.5,

            borderRadius: "12px",

            display: "flex",
            alignItems: "center",
            gap: 1.5,

            transition: "all 0.25s ease",

            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.08)",
              transform: "translateX(4px)",
            },
          }}
        >
          <PersonOutlineOutlinedIcon
            sx={{
              color: "#CBD5E1",
            }}
          />
          Profile
        </MenuItem>

        {/* SETTINGS */}
        <MenuItem
          sx={{
            py: 1.5,
            px: 2,

            mx: 1,
            my: 0.5,

            borderRadius: "12px",

            display: "flex",
            alignItems: "center",
            gap: 1.5,

            transition: "all 0.25s ease",

            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.08)",
              transform: "translateX(4px)",
            },
          }}
        >
          <SettingsOutlinedIcon
            sx={{
              color: "#CBD5E1",
            }}
          />
          Settings
        </MenuItem>

        <Divider
          sx={{
            borderColor: "rgba(255,255,255,0.08)",
          }}
        />

        {/* LOGOUT */}
        <MenuItem
          sx={{
            py: 1.5,
            px: 2,

            mx: 1,
            my: 1,

            borderRadius: "12px",

            display: "flex",
            alignItems: "center",
            gap: 1.5,

            color: "#F87171",

            transition: "all 0.25s ease",

            "&:hover": {
              backgroundColor: "rgba(239,68,68,0.12)",
              transform: "translateX(4px)",
            },
          }}
        >
          <LogoutOutlinedIcon />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfilePopover;