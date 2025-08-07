import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DriverSidebar from "./DriverSidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const drawerWidth = 240;

const DriverLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
    {/* <Navbar/> */}
    <Box sx={{ display: "flex" }}>
      {/* AppBar for mobile with menu icon */}
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
              >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Driver Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar Drawer */}
      <DriverSidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          p: 3,
          mt: isMobile ? 7 : 0, // Space below AppBar
        }}
        >
        <Outlet />
      </Box>
    </Box>
        </>
  );
};

export default DriverLayout;
