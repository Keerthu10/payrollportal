// import React from "react";

// import {
//   Box,
//   Typography,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";

// import { Link,useLocation } from "react-router-dom";

// import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
// import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
// import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
// import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
// import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
// import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
// import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

// const menuStyle = {
//   borderRadius: "14px",

//   mb: 1,

//   py: 1.2,

//   px: 1,

//   color: "#E2E8F0",

//   transition: "0.3s ease",

//   "&:hover": {
//     background: "rgba(255,255,255,0.08)",
//     transform: "translateX(4px)",
//   },
// };

// const iconStyle = {
//   color: "#CBD5E1",

//   minWidth: "40px",
// };

// const Sidebar = ({ open }) => {
//   return (
//     <Box
//       sx={{
//         width: open ? "260px" : "88px",

//         transition: "0.3s",

//         overflowX: "hidden",

//         overflowY: "auto",

//         "&::-webkit-scrollbar": {
//           display: "none",
//         },

//         background:
//           "linear-gradient(180deg, rgba(2,6,23,0.96) 0%, rgba(15,23,42,0.92) 100%)",

//         backdropFilter: "blur(18px)",

//         WebkitBackdropFilter: "blur(18px)",

//         borderRight: "1px solid rgba(255,255,255,0.05)",

//         boxShadow: "8px 0 30px rgba(0,0,0,0.24)",

//         color: "white",

//         padding: "24px 16px",

//         marginTop: "70px",

//         height: "calc(100vh - 70px)",

//         position: "fixed",

//         left: 0,

//         top: 0,

//         display: "flex",

//         flexDirection: "column",
//       }}
//     >
//       {/* LOGO */}
//       {open && (
//         <Box sx={{ mb: 5 }}>
//           <Typography
//             sx={{
//               fontSize: "22px",

//               fontWeight: 700,

//               letterSpacing: 1,
//             }}
//           >
//             ADMIN
//           </Typography>

//           <Typography
//             sx={{
//               color: "#94A3B8",

//               fontSize: 13,

//               mt: 0.5,
//             }}
//           >
//             Cloute Technologies
//           </Typography>
//         </Box>
//       )}

//       {/* MAIN */}
//       {open && (
//         <Typography
//           sx={{
//             color: "#64748B",

//             fontSize: 12,

//             mb: 2,

//             letterSpacing: 1.5,
//           }}
//         >
//           MAIN
//         </Typography>
//       )}

//       <List disablePadding sx={{ mb: 4 }}>
//         {/* ACTIVE MENU */}
//         {/* <ListItemButton
//           sx={{
//             ...menuStyle,

//             background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",

//             boxShadow: "0 4px 14px rgba(37,99,235,0.35)",

//             "&:hover": {
//               background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
//             },
//           }}
//         >
//           <ListItemIcon
//             sx={{
//               color: "white",

//               minWidth: "40px",
//             }}
//           >
//             <DashboardOutlinedIcon />
//           </ListItemIcon>

//           {open && <ListItemText primary="Dashboard" />}
//         </ListItemButton> */}

//         <ListItemButton
//           component={Link}
//           to="/dashboard"
//           sx={{
//             ...menuStyle,

//             background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",

//             boxShadow: "0 4px 14px rgba(37,99,235,0.35)",

//             "&:hover": {
//               background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
//             },

//             ...(location.pathname === "/dashboard" && activeMenu),
//           }}
//         >
//           <ListItemIcon
//             sx={{
//               color: location.pathname === "/dashboard" ? "white" : "#CBD5E1",

//               minWidth: "40px",
//             }}
//           >
//             <DashboardOutlinedIcon />
//           </ListItemIcon>

//           {open && <ListItemText primary="Dashboard" />}
//         </ListItemButton>

//         {/* RUN PAYROLL */}
//         {/* <ListItemButton sx={menuStyle}>
//           <ListItemIcon sx={iconStyle}>
//             <UploadFileOutlinedIcon />
//           </ListItemIcon>

//           {open && <ListItemText primary="Run Payroll" />}
//         </ListItemButton> */}

//         <ListItemButton
//           component={Link}
//           to="/run-payroll"
//           sx={{
//             ...menuStyle,

//             ...(location.pathname === "/run-payroll" && activeMenu),
//           }}
//         >
//           <ListItemIcon
//             sx={{
//               color: location.pathname === "/run-payroll" ? "white" : "#CBD5E1",

//               minWidth: "40px",
//             }}
//           >
//             <UploadFileOutlinedIcon />
//           </ListItemIcon>

//           {open && <ListItemText primary="Run Payroll" />}
//         </ListItemButton>

//         {/* PAYSLIPS */}
//         <ListItemButton sx={menuStyle}>
//           <ListItemIcon sx={iconStyle}>
//             <ReceiptLongOutlinedIcon />
//           </ListItemIcon>

//           {open && <ListItemText primary="Payslips" />}
//         </ListItemButton>

//         {/* HISTORY */}
//         <ListItemButton sx={menuStyle}>
//           <ListItemIcon sx={iconStyle}>
//             <HistoryOutlinedIcon />
//           </ListItemIcon>

//           {open && <ListItemText primary="History" />}
//         </ListItemButton>
//       </List>

//       {/* REPORTS */}
//       {open && (
//         <Typography
//           sx={{
//             color: "#64748B",

//             fontSize: 12,

//             mb: 2,

//             letterSpacing: 1.5,
//           }}
//         >
//           REPORTS
//         </Typography>
//       )}

//       <List disablePadding sx={{ mb: 4 }}>
//         {/* EMAIL LOGS */}
//         <ListItemButton sx={menuStyle}>
//           <ListItemIcon sx={iconStyle}>
//             <MailOutlineOutlinedIcon />
//           </ListItemIcon>

//           {open && <ListItemText primary="Email Logs" />}
//         </ListItemButton>

//         {/* RETRY QUEUE */}
//         <ListItemButton sx={menuStyle}>
//           <ListItemIcon sx={iconStyle}>
//             <AutorenewOutlinedIcon />
//           </ListItemIcon>

//           {open && <ListItemText primary="Retry Queue" />}
//         </ListItemButton>

//         {/* ANALYTICS */}
//         <ListItemButton sx={menuStyle}>
//           <ListItemIcon sx={iconStyle}>
//             <AnalyticsOutlinedIcon />
//           </ListItemIcon>

//           {open && <ListItemText primary="Analytics" />}
//         </ListItemButton>
//       </List>

//       {/* SYSTEM */}
//       {open && (
//         <Typography
//           sx={{
//             color: "#64748B",

//             fontSize: 12,

//             mb: 2,

//             letterSpacing: 1.5,
//           }}
//         >
//           SYSTEM
//         </Typography>
//       )}

//       <List disablePadding>
//         {/* ROLES */}
//         <ListItemButton sx={menuStyle}>
//           <ListItemIcon sx={iconStyle}>
//             <AdminPanelSettingsOutlinedIcon />
//           </ListItemIcon>

//           {open && <ListItemText primary="Roles" />}
//         </ListItemButton>

//         {/* SETTINGS */}
//         <ListItemButton sx={menuStyle}>
//           <ListItemIcon sx={iconStyle}>
//             <SettingsOutlinedIcon />
//           </ListItemIcon>

//           {open && <ListItemText primary="Settings" />}
//         </ListItemButton>
//       </List>
//     </Box>
//   );
// };

// export default Sidebar;

import React from "react";

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import {
  DashboardOutlined,
  GroupsOutlined,
  AccountBalanceWalletOutlined,
  ReceiptLongOutlined,
  AccessTimeOutlined,
  EventNoteOutlined,
  AssessmentOutlined,
  TaskAltOutlined,
  PaymentsOutlined,
  AccountBalanceOutlined,
  SettingsOutlined,
  LogoutOutlined,
} from "@mui/icons-material";

import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ open }) => {
  const location = useLocation();

  const navigate = useNavigate();

  // ACTIVE MENU STYLE
  const activeMenu = {
    background: "linear-gradient(135deg, #5B3DF5 0%, #7C5CFA 100%)",

    color: "#fff",

    boxShadow: "0 8px 20px rgba(91,61,245,0.35)",

    "& .MuiListItemIcon-root": {
      color: "#fff",
    },

    "&:hover": {
      background: "linear-gradient(135deg, #5B3DF5 0%, #7C5CFA 100%)",
    },
  };

  // COMMON MENU STYLE
  const menuStyle = {
    borderRadius: "14px",

    mb: 1,

    py: 1.1,

    px: 1.5,

    color: "#64748B",

    transition: "0.2s ease",

    "&:hover": {
      background: "#F3F4F6",
    },
  };

  const iconStyle = {
    color: "#64748B",

    minWidth: "40px",
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: open ? "220px" : "88px",

        transition: "width 0.25s ease",

        overflowX: "hidden",

        overflowY: "hidden",

        "&::-webkit-scrollbar": {
          display: "none",
        },

        background: "#FFFFFF",

        borderRight: "1px solid #E5E7EB",

        boxShadow: "4px 0 20px rgba(0,0,0,0.03)",

        padding: "24px 16px",

        height: "100vh",

        position: "fixed",

        left: 0,

        top: 0,

        zIndex: 1300,

        display: "flex",

        flexDirection: "column",
      }}
    >
      {/* LOGO */}
      {open && (
        <Box sx={{ mb: 5 }}>
          <Typography
            sx={{
              fontSize: "28px",

              fontWeight: 700,

              color: "#111827",
            }}
          >
            PayRoll
          </Typography>

          <Typography
            sx={{
              color: "#94A3B8",

              fontSize: "13px",

              mt: 0.5,
            }}
          >
            Payroll Management
          </Typography>
        </Box>
      )}

      {/* MAIN */}
      {open && (
        <Typography
          sx={{
            color: "#94A3B8",

            fontSize: "12px",

            mb: 2,

            letterSpacing: 1.5,

            fontWeight: 600,
          }}
        >
          MAIN
        </Typography>
      )}

      <List disablePadding sx={{ mb: 4 }}>
        {/* DASHBOARD */}
        <ListItemButton
          component={Link}
          to="/dashboard"
          sx={{
            ...menuStyle,

            ...(location.pathname === "/dashboard" && activeMenu),
          }}
        >
          <ListItemIcon sx={iconStyle}>
            <DashboardOutlined />
          </ListItemIcon>

          {open && <ListItemText primary="Dashboard" />}
        </ListItemButton>

        {/* EMPLOYEES
        <ListItemButton
          component={Link}
          to="/employees"
          sx={{
            ...menuStyle,

            ...(location.pathname === "/employees" && activeMenu),
          }}
        >
          <ListItemIcon sx={iconStyle}>
            <GroupsOutlined />
          </ListItemIcon>

          {open && <ListItemText primary="Employees" />}
        </ListItemButton> */}

        {/* PAYROLL */}
        <ListItemButton
          component={Link}
          to="/payroll"
          sx={{
            ...menuStyle,

            ...(location.pathname === "/payroll" && activeMenu),
          }}
        >
          <ListItemIcon sx={iconStyle}>
            <AccountBalanceWalletOutlined />
          </ListItemIcon>

          {open && <ListItemText primary="Payroll" />}
        </ListItemButton>

        {/* PAYSLIPS */}
        <ListItemButton
          component={Link}
          to="/payslips"
          sx={{
            ...menuStyle,

            ...(location.pathname === "/payslips" && activeMenu),
          }}
        >
          <ListItemIcon sx={iconStyle}>
            <ReceiptLongOutlined />
          </ListItemIcon>

          {open && <ListItemText primary="Payslips" />}
        </ListItemButton>

        {/* ATTENDANCE */}
        {/* <ListItemButton
          component={Link}
          to="/attendance"
          sx={{
            ...menuStyle,

            ...(location.pathname === "/attendance" && activeMenu),
          }}
        >
          <ListItemIcon sx={iconStyle}>
            <AccessTimeOutlined />
          </ListItemIcon>

          {open && <ListItemText primary="Attendance" />}
        </ListItemButton> */}

        {/* LEAVE */}
        {/* <ListItemButton
          component={Link}
          to="/leave"
          sx={{
            ...menuStyle,

            ...(location.pathname === "/leave" && activeMenu),
          }}
        >
          <ListItemIcon sx={iconStyle}>
            <EventNoteOutlined />
          </ListItemIcon>

          {open && <ListItemText primary="Leave" />}
        </ListItemButton> */}
        <ListItemButton
          component={Link}
          to="/reports"
          sx={{
            ...menuStyle,

            ...(location.pathname === "/reports" && activeMenu),
          }}
        >
          <ListItemIcon sx={iconStyle}>
            <AssessmentOutlined />
          </ListItemIcon>

          {open && <ListItemText primary="Reports" />}
        </ListItemButton>
        <ListItemButton
          component={Link}
          to="/settings"
          sx={{
            ...menuStyle,

            ...(location.pathname === "/settings" && activeMenu),
          }}
        >
          <ListItemIcon sx={iconStyle}>
            <SettingsOutlined />
          </ListItemIcon>

          {open && <ListItemText primary="Settings" />}
        </ListItemButton>
      </List>

      {/* REPORTS */}
      {/* {open && (
        <Typography
          sx={{
            color: "#94A3B8",

            fontSize: "12px",

            mb: 2,

            letterSpacing: 1.5,

            fontWeight: 600,
          }}
        >
          REPORTS
        </Typography>
      )} */}

      {/* <List disablePadding sx={{ mb: 4 }}> */}

      {/* APPROVALS */}
      {/* <ListItemButton
          component={Link}
          to="/approvals"
          sx={{
            ...menuStyle,

            ...(location.pathname === "/approvals" && activeMenu),
          }}
        >
          <ListItemIcon sx={iconStyle}>
            <TaskAltOutlined />
          </ListItemIcon>

          {open && <ListItemText primary="Approvals" />}
        </ListItemButton> */}

      {/* EXPENSES */}
      {/* <ListItemButton
          component={Link}
          to="/expenses"
          sx={{
            ...menuStyle,

            ...(location.pathname === "/expenses" && activeMenu),
          }}
        >
          <ListItemIcon sx={iconStyle}>
            <PaymentsOutlined />
          </ListItemIcon>

          {open && <ListItemText primary="Expenses" />}
        </ListItemButton> */}

      {/* TAX */}
      {/* <ListItemButton
          component={Link}
          to="/tax"
          sx={{
            ...menuStyle,

            ...(location.pathname === "/tax" && activeMenu),
          }}
        >
          <ListItemIcon sx={iconStyle}>
            <AccountBalanceOutlined />
          </ListItemIcon>

          {open && <ListItemText primary="Tax" />}
        </ListItemButton> */}
      {/* </List> */}

      {/* SYSTEM */}
      {/* {open && (
        <Typography
          sx={{
            color: "#94A3B8",

            fontSize: "12px",

            mb: 2,

            letterSpacing: 1.5,

            fontWeight: 600,
          }}
        >
          SYSTEM
        </Typography>
      )} */}

      {/* <List disablePadding> */}
        {/* SETTINGS */}
        {/* <ListItemButton
          component={Link}
          to="/settings"
          sx={{
            ...menuStyle,

            ...(location.pathname === "/settings" && activeMenu),
          }}
        >
          <ListItemIcon sx={iconStyle}>
            <SettingsOutlined />
          </ListItemIcon>

          {open && <ListItemText primary="Settings" />}
        </ListItemButton> */}
      {/* </List> */}

      {/* LOGOUT */}
      <Box sx={{ mt: "auto", pt: 3 }}>
        <Divider sx={{ mb: 2 }} />

        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: "14px",

            py: 1.1,

            px: 1.5,

            color: "#EF4444",

            "&:hover": {
              background: "#FEF2F2",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: "#EF4444",

              minWidth: "40px",
            }}
          >
            <LogoutOutlined />
          </ListItemIcon>

          {open && <ListItemText primary="Logout" />}
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default Sidebar;
