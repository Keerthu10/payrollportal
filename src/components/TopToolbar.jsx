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
  ListItemIcon,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfilePopover from "../ui/ProfilePopover";
import CompanyLogo from "./CompanyLogo";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { useLiveDateTime } from "../hooks/useLiveDateTime";

const navLinks = [
  {
    label: "DASHBOARD",
    to: "/dashboard",
    icon: <DashboardOutlinedIcon />,
  },
  {
    label: "PAYROLL",
    to: "/payroll",
    icon: <AccountBalanceWalletOutlinedIcon />,
  },
  {
    label: "EMPLOYEES",
    to: "/employees",
    icon: <GroupsOutlinedIcon />,
  },
  {
    label: "MASTERS",
    to: "/masters",
    icon: <SettingsOutlinedIcon />,
  },
  {
    label: "PAYSLIPS",
    to: "/payslips",
    icon: <ReceiptLongOutlinedIcon />,
  },
];

const TopToolbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentDateTime = useLiveDateTime();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMobileOpen(false);
    navigate("/login");
  };

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  /* ── Mobile Drawer ── */
  const mobileDrawer = (
    <Box
      sx={{
        width: { xs: 270, sm: 300 },
        height: "100%",
        background: "linear-gradient(180deg, #15123F 0%, #28256E 60%, #4338CA 100%)",
        display: "flex",
        flexDirection: "column",
        pt: 2.5,
        pb: 4,
        px: 2,
        paddingTop: "max(16px, env(safe-area-inset-top))",
        paddingBottom: "max(24px, env(safe-area-inset-bottom))",
      }}
    >
      {/* Drawer header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2.5,
          px: 1,
        }}
      >
        <CompanyLogo size="md" variant="light" />
        <IconButton
          onClick={handleDrawerToggle}
          aria-label="close navigation drawer"
          sx={{
            color: "#fff",
            p: 1,
            "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", mb: 2 }} />

      {/* Nav links */}
      <List disablePadding sx={{ flex: 1 }}>
        {navLinks.map((link) => {
          const active = location.pathname === link.to;
          return (
            <ListItemButton
              key={link.to}
              component={Link}
              to={link.to}
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: "14px",
                mb: 1.2,
                px: 2,
                minHeight: 48,
                background: active ? "rgba(255,255,255,0.18)" : "transparent",
                color: active ? "#FFFFFF" : "#E2E8F0",
                border: active ? "1px solid rgba(255,255,255,0.25)" : "1px solid transparent",
                "& .MuiListItemText-primary": {
                  color: active ? "#FFFFFF" : "#E2E8F0",
                  fontWeight: active ? 700 : 500,
                  fontSize: 15,
                },
                "& .MuiListItemIcon-root": {
                  color: active ? "#38BDF8" : "#CBD5E1",
                  minWidth: 40,
                },
                "&:hover": {
                  background: "rgba(255,255,255,0.10)",
                  "& .MuiListItemText-primary": { color: "#FFFFFF" },
                  "& .MuiListItemIcon-root": { color: "#FFFFFF" },
                },
              }}
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.label} />
            </ListItemButton>
          );
        })}
      </List>

      {/* Drawer bottom: Logout */}
      <Box sx={{ mt: "auto", pt: 2 }}>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", mb: 2 }} />
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: "14px",
            px: 2,
            minHeight: 48,
            color: "#FCA5A5",
            background: "rgba(239,68,68,0.10)",
            "& .MuiListItemIcon-root": {
              color: "#F87171",
              minWidth: 40,
            },
            "& .MuiListItemText-primary": {
              color: "#FCA5A5",
              fontWeight: 600,
            },
            "&:hover": {
              background: "rgba(239,68,68,0.20)",
            },
          }}
        >
          <ListItemIcon>
            <LogoutOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="LOGOUT" />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", md: "none" } }}
        PaperProps={{
          sx: {
            border: "none",
            width: { xs: 270, sm: 300 },
          },
        }}
      >
        {mobileDrawer}
      </Drawer>

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: `linear-gradient(
            90deg,
            #15123F 0%,
            #28256E 40%,
            #4338CA 75%,
            #45D7FF 100%
          )`,
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 30px rgba(15,23,42,0.15)",
          color: "#fff",
          borderRadius: { xs: 0, md: "20px" },
          minHeight: { xs: 58, sm: 64, md: 72 },
          top: { xs: 0, md: 16 },
          left: { xs: 0, md: 20 },
          right: { xs: 0, md: 20 },
          width: { xs: "100%", md: "calc(100% - 40px)" },
          maxWidth: "1600px",
          mx: "auto",
          overflowX: "hidden",
          paddingTop: "env(safe-area-inset-top)",
          zIndex: 1200,
        }}
      >
        <Toolbar
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "auto 1fr auto", md: "1fr auto 1fr" },
            alignItems: "center",
            minHeight: { xs: 58, sm: 64, md: 72 },
            px: { xs: 1.5, sm: 2.5, md: 4 },
            columnGap: 2,
          }}
        >
          {/* LEFT ZONE — Hamburger + Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 2, md: 3 },
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              aria-label="open navigation menu"
              sx={{
                display: { xs: "flex", md: "none" },
                color: "#fff",
                width: 44,
                height: 44,
                borderRadius: 2,
                "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" },
              }}
            >
              <MenuIcon />
            </IconButton>

            <CompanyLogo size="md" variant="light" showText={true} />

            <Typography
              component="span"
              sx={{
                display: { xs: "none", sm: "inline-block" },
                fontSize: { sm: 14, md: 18 },
                fontWeight: 700,
                color: "rgba(255,255,255,0.9)",
                letterSpacing: ".5px",
                lineHeight: 1,
                whiteSpace: "nowrap",
                borderLeft: "1px solid rgba(255,255,255,0.2)",
                pl: { sm: 1.5, md: 2 },
              }}
            >
              PAYROLL
            </Typography>
          </Box>

          {/* CENTER ZONE — Desktop Nav links */}
          <Stack
            direction="row"
            spacing={{ md: 2.5, lg: 4 }}
            alignItems="center"
            justifyContent="center"
            sx={{ display: { xs: "none", md: "flex" }, overflow: "hidden" }}
          >
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Typography
                  key={link.to}
                  component={Link}
                  to={link.to}
                  sx={{
                    color: active ? "#FFFFFF" : "#E2E8F0",
                    fontWeight: active ? 700 : 500,
                    fontSize: { md: "14px", lg: "16px" },
                    position: "relative",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    py: 1,
                    transition: "color 0.2s ease",
                    "&:hover": { color: "#FFFFFF" },
                    "&::after": active
                      ? {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          height: "3px",
                          background: "linear-gradient(90deg, #38BDF8, #818CF8)",
                          borderRadius: "2px",
                        }
                      : {},
                  }}
                >
                  {link.label}
                </Typography>
              );
            })}
          </Stack>

          {/* RIGHT ZONE — Live Clock + Profile */}
          <Stack
            direction="row"
            spacing={{ xs: 1, md: 2 }}
            alignItems="center"
            sx={{ justifySelf: "end", height: "100%" }}
          >
            {/* Live Clock Indicator */}
            <Box
              sx={{
                display: { xs: "none", lg: "flex" },
                alignItems: "center",
                gap: 0.8,
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: "#4ADE80",
                  animation: "livePulse 1.5s ease-in-out infinite",
                  "@keyframes livePulse": {
                    "0%": {
                      opacity: 1,
                      boxShadow: "0 0 0 0 rgba(74,222,128,0.6)",
                    },
                    "70%": {
                      opacity: 0.7,
                      boxShadow: "0 0 0 5px rgba(74,222,128,0)",
                    },
                    "100%": {
                      opacity: 1,
                      boxShadow: "0 0 0 0 rgba(74,222,128,0)",
                    },
                  },
                }}
              />
              <Typography
                component="span"
                sx={{
                  color: "#F1F5F9",
                  fontSize: "13px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "0.3px",
                  lineHeight: 1,
                }}
              >
                {currentDateTime}
              </Typography>
            </Box>

            <ProfilePopover />
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopToolbar;
