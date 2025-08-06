import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Toolbar,
  Typography,
  Collapse,
  Box,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RouteIcon from "@mui/icons-material/Route";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 260;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/driver" },
  { text: "My Trips", icon: <LocalShippingIcon />, path: "/driver/trips" },
  { text: "Routes", icon: <RouteIcon />, path: "/driver/routes", nested: true },
  { text: "Payments", icon: <AttachMoneyIcon />, path: "/driver/payments" },
  { text: "Documents", icon: <ReceiptLongIcon />, path: "/driver/documents" },
  { text: "Settings", icon: <SettingsIcon />, path: "/driver/settings" },
  { text: "Logout", icon: <LogoutIcon />, path: "/logout" },
];

const activeRoutes = ["Mumbai → Pune", "Pune → Bangalore"];

export default function DriverDashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [routesOpen, setRoutesOpen] = useState(false);

  useEffect(() => {
    const currentIndex = menuItems.findIndex((item) =>
      location.pathname.startsWith(item.path)
    );
    setActiveIndex(currentIndex !== -1 ? currentIndex : 0);
    setRoutesOpen(location.pathname.startsWith("/driver/routes"));
  }, [location.pathname]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f9fafb" }}>
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid #e5e7eb",
            background: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.08)",
          },
        }}
        open
      >
        <Toolbar sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
          <Avatar
            sx={{
              bgcolor: "#16a34a",
              mb: 1,
              width: 56,
              height: 56,
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            D
          </Avatar>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Driver John
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Truck #MH12 AB 4567
          </Typography>
        </Toolbar>

        <List sx={{ mt: 2 }}>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.text}>
              <ListItemButton
                selected={activeIndex === index}
                onClick={() => {
                  setActiveIndex(index);
                  navigate(item.path);
                  if (item.nested) setRoutesOpen(!routesOpen);
                }}
                sx={{
                  mx: 1,
                  mb: 1,
                  borderRadius: "10px",
                  "&.Mui-selected": {
                    bgcolor: "#16a34a",
                    color: "white",
                    "& .MuiListItemIcon-root": {
                      color: "white",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: activeIndex === index ? "white" : "#6b7280",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: "14px",
                    fontWeight: activeIndex === index ? "bold" : "normal",
                  }}
                />
                {item.nested && (routesOpen ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>

              {item.nested && (
                <Collapse in={routesOpen} timeout="auto" unmountOnExit>
                  {activeRoutes.map((route, i) => (
                    <ListItemButton
                      key={i}
                      sx={{
                        pl: 8,
                        borderRadius: "6px",
                        mx: 1,
                        mb: 0.5,
                        "&:hover": {
                          bgcolor: "#f0fdf4",
                        },
                      }}
                      onClick={() =>
                        navigate(`/driver/routes/${route.toLowerCase().replace(/[^a-z0-9]+/gi, "-")}`)
                      }
                    >
                      <ListItemText
                        primary={route}
                        primaryTypographyProps={{ fontSize: "13px" }}
                      />
                    </ListItemButton>
                  ))}
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
