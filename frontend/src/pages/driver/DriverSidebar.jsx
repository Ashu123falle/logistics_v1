import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API } from "../../utilities/api";

const DriverSidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle, isMobile }) => {
  const { auth, logout } = useAuth();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  const driverId = auth?.userId;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get(`/drivers/${driverId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDriver(response.data);
      } catch (err) {
        console.error("Error loading dashboard:", err?.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (driverId) fetchData();
  }, [driverId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    logout();
    navigate("/");
  };

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <Box>
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Avatar sx={{ width: 64, height: 64, margin: "0 auto" }}>D</Avatar>

          {loading ? (
            <Box sx={{ mt: 1 }}>
              <CircularProgress size={20} />
            </Box>
          ) : (
            <>
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                {driver?.firstName} {driver?.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Driver
              </Typography>
            </>
          )}
        </Box>
        <Divider />
        <List>
          <ListItem button component={Link} to="/driver/dashboard">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/driver/deliveries">
            <ListItemIcon><LocalShippingIcon /></ListItemIcon>
            <ListItemText primary="Deliveries" />
          </ListItem>
          <ListItem button component={Link} to="/driver/profile">
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </Box>
      <Box sx={{ p: 2 }}>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default DriverSidebar;
