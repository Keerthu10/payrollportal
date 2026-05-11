import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopToolbar from "../components/TopToolbar";

const AdminLayout = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <CssBaseline />
      <TopToolbar open={open} setOpen={setOpen} />
      <Box sx={{ display: "flex" }}>
        <Sidebar open={open} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: "24px",
            marginLeft: open ? "260px" : "80px",
            transition: "0.3s",
            marginTop: "70px",
            background: "linear-gradient(135deg, #E2E8F0 0%, #F8FAFC 100%)",
            minHeight: "100vh",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default AdminLayout;
