import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

import SideBar from "./SideBar";

const drawerWidth = 240;

const AdminDashBoard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f9f9f9",
          minHeight: "100vh",
          p: 3,
          ml: `${drawerWidth}px`,
        }}
      >
        {/* This is where each route will be rendered */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminDashBoard;
