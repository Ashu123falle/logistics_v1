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
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API } from "../../utilities/api";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/driver/dashboard" },
  { text: "Deliveries", icon: <LocalShippingIcon />, path: "/driver/deliveries" },
  { text: "Profile", icon: <PersonIcon />, path: "/driver/profile" },
];

const DriverSidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle, isMobile }) => {
  const { auth, logout } = useAuth();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const driverId = auth?.userId;
  const navigate = useNavigate();
  const location = useLocation(); // <-- used for active item detection



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

        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          logout();
          navigate("/unauthorized");
        }
      } finally {
        setLoading(false);
      }
    };

    if (driverId) fetchData();
  }, [driverId, logout, navigate]);

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

          <Avatar sx={{ width: 64, height: 64, margin: "0 auto" }}>
            {`${driver?.firstName?.[0] || ""}${driver?.lastName?.[0] || ""}`.toUpperCase()}

          </Avatar>

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
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <ListItem
                key={item.text}
                button
                component={Link}
                to={item.path}
                sx={{
                  backgroundColor: isActive ? "green" : "transparent",
                  color: isActive ? "white" : "inherit",
                  borderRadius: 1,
                  mb: 0.5,
                  "&:hover": {
                    backgroundColor: isActive ? "green" : "rgba(0,0,0,0.04)",
                    color: isActive ? "white" : "inherit",
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? "white" : "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            );
          })}
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

  return isMobile ? (
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
  );
};

export default DriverSidebar;
