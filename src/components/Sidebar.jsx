import React from "react";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const Sidebar = ({ open }) => {
  const menuItemStyle = {
    py: 1.5,
    px: 2,
    mb: 1,
    borderRadius: "12px",
    color: "#EFE8F0",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "#334155",
    },
  };

  const iconStyle = {
    color: "#CBD5E1",
    minWidth: "40px",
  };
  return (
    <Box
      sx={{
        width: open ? "260px" : "80px",
        transition: "0.3s",
        overflowX: "hidden",
        background:
          "linear-gradient(180deg, rgba(2,6,23,0.92) 0%, rgba(15,23,42,0.88) 100%)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        color: "white",
        padding: "24px 16px",
        marginTop: "64px",
        height: "calc(100vh - 64px)",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        boxShadow: "8px 0 30px rgba(0,0,0,0.24)",
      }}
    >
      {open && (
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "700",
            mb: 5,
            textAlign: "center",
            letterSpacing: "1px",
          }}
        >
          Payroll
        </Typography>
      )}
      <List>
        <ListItemButton sx={{ ...menuItemStyle, backgroundColor: "#334155" }}>
          <ListItemIcon sx={iconStyle}>
            <DashboardOutlinedIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Dashboard" />}
        </ListItemButton>
        <ListItemButton sx={menuItemStyle}>
          <ListItemIcon sx={iconStyle}>
            <ReceiptLongOutlinedIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Payslips" />}
        </ListItemButton>
        <ListItemButton sx={menuItemStyle}>
          <ListItemIcon sx={iconStyle}>
            <SettingsOutlinedIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Settings" />}
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
