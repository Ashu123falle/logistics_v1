import React from "react";
import { Box, Toolbar } from "@mui/material";
import DriverDashboardSidebar from "./DriverDashboardSidebar";
import { Outlet } from "react-router-dom";

const drawerWidth = 260;

const DriverDashboardLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f9fafb" }}>
      <DriverDashboardSidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DriverDashboardLayout;
