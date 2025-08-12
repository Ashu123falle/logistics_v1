import React, { useState } from "react";
import { Box, CssBaseline, useMediaQuery, useTheme, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const drawerWidth = 240;

const AdminDashBoard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); 
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Sidebar */}
      <SideBar
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
          bgcolor: "#f9f9f9",
          p: { xs: 1.5, sm: 3 },
          ml: { md: `${drawerWidth}px` }, 
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          transition: "margin 0.3s ease, width 0.3s ease",
        }}
      >
        {/* Hamburger icon for mobile */}
        {isMobile && (
          <Box sx={{ mb: 2 }}>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                background: theme.palette.primary.main,
                color: "#fff",
                "&:hover": {
                  background: theme.palette.primary.dark,
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        )}

        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminDashBoard;
