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
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentsIcon from "@mui/icons-material/Payments";
import ReceiptIcon from "@mui/icons-material/Receipt";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import LocationOnIcon from "@mui/icons-material/LocationOn"; // Tracking icon
import TrackChangesIcon from "@mui/icons-material/TrackChanges"; // Original Jobs icon
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";

const drawerWidth = 260;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "dashboard" },
  { text: "Trucks", icon: <LocalShippingIcon />, path: "trucks" },
  { text: "Jobs", icon: <TrackChangesIcon />, path: "jobs" }, // Reverted Jobs icon
  { text: "Tracking", icon: <LocationOnIcon />, path: "tracking", nested: true }, // Updated Tracking icon
  { text: "Payments", icon: <PaymentsIcon />, path: "payments" },
  { text: "Payment Receipts", icon: <ReceiptIcon />, path: "payment-receipts" },
  { text: "Complience", icon: <FolderOpenIcon />, path: "file-uploads" },
  { text: "Customer Management", icon: <GroupIcon />, path: "Customermanagement" },
  { text: "Driver Management", icon: <PersonIcon />, path: "driver" },
];

// Example Order IDs (can be fetched from API)
const orderIds = ["45216", "45217", "45218"];

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Sync active menu item with URL
  useEffect(() => {
    const currentIndex = menuItems.findIndex((item) =>
      location.pathname.includes(item.path)
    );
    if (currentIndex !== -1) setActiveIndex(currentIndex);
  }, [location.pathname]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid #f0f0f0",
          background: "#ffffff",
          borderRadius:5,
       
        },
      }}
      open
    >
      {/* Header */}
      <Toolbar sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
        <Avatar sx={{ bgcolor: "#1976d2", mb: 1, width: 50, height: 50 }}>A</Avatar>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Admin
        </Typography>
      </Toolbar>

      {/* Menu List */}
      <List sx={{ mt: 2 }}>
        {menuItems.map((item, index) => (
          <React.Fragment key={item.text}>
            <ListItemButton
              selected={activeIndex === index}
              onClick={() => {
                if (item.nested) {
                  setTrackingOpen(!trackingOpen);
                } else {
                  setActiveIndex(index);
                  if (item.path !== "#") navigate(`/admin/${item.path}`);
                }
              }}
              sx={{
                mx: 1,
                mb: 1,
                borderRadius: "8px",
                "&.Mui-selected": {
                  bgcolor: "#22c55e",
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
              {item.nested && (trackingOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>

            {/* Nested Tracking Orders */}
            {item.nested && (
              <Collapse in={trackingOpen} timeout="auto" unmountOnExit>
                {orderIds.map((orderId) => (
                  <ListItemButton
                    key={orderId}
                    sx={{
                      pl: 8,
                      borderRadius: "6px",
                      mx: 1,
                      mb: 0.5,
                      "&:hover": {
                        bgcolor: "#f0fdf4",
                      },
                    }}
                    onClick={() => navigate(`/admin/tracking/${orderId}`)}
                  >
                    <ListItemText
                      primary={`Order #${orderId}`}
                      primaryTypographyProps={{
                        fontSize: "13px",
                      }}
                    />
                  </ListItemButton>
                ))}
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}
