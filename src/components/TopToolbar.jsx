import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DatePickerComponent from "../ui/DatePicker";
import ProfilePopover from "../ui/ProfilePopover";

const TopToolbar = ({ open, setOpen, mobileOpen, setMobileOpen }) => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "rgba(2, 6, 23, 0.82)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
        color: "#F8FAFC",
        px: 2,
        zIndex: 1200,
        height: "64px",
      }}
    >
      <Toolbar
        sx={{
          height: "64px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* LEFT LOGO */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <IconButton
            sx={{
              color: "#e5e7eb",
              mr: 1,
              display: { xs: "none", lg: "inline-flex" },
            }}
            onClick={() => setOpen((prev) => !prev)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, alignItems: "center" }}
          >
            PAYROLL PORTAL
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DatePickerComponent />

          <IconButton sx={{ color: "#e5e7eb" }}>
            <ProfilePopover />
          </IconButton>

          {/* <IconButton sx={{ color: "#e5e7eb" }}>
            <SettingsOutlinedIcon />
          </IconButton> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopToolbar;
