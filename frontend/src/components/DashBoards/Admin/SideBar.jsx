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
  Box,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentsIcon from "@mui/icons-material/Payments";
import ReceiptIcon from "@mui/icons-material/Receipt";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const drawerWidth = 260;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "dashboard" },
  { text: "Trucks", icon: <LocalShippingIcon />, path: "trucks" },
  { text: "Jobs", icon: <TrackChangesIcon />, path: "jobs" },
  { text: "Tracking", icon: <LocationOnIcon />, path: "tracking" },
  { text: "Payments", icon: <PaymentsIcon />, path: "payments" },
  { text: "Payment Receipts", icon: <ReceiptIcon />, path: "payment-receipts" },
  { text: "Compliance", icon: <FolderOpenIcon />, path: "file-uploads" },
  { text: "Driver Management", icon: <PersonIcon />, path: "driver" },
];

export default function Sidebar({ isMobile, mobileOpen, handleDrawerToggle }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [username, setUsername] = useState("Admin");
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

 
  const isSmallHeight = useMediaQuery("(max-height: 600px)");
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));


  useEffect(() => {
    const currentIndex = menuItems.findIndex((item) =>
      location.pathname.toLowerCase().includes(item.path.toLowerCase())
    );
    if (currentIndex !== -1) setActiveIndex(currentIndex);
  }, [location.pathname]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* User Info */}
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 2,
          mb: 1,
          px: 1,
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#22c55e",
            mb: 1,
            width: isSmallHeight ? 40 : 56,
            height: isSmallHeight ? 40 : 56,
            fontSize: isSmallHeight ? "1rem" : "1.2rem",
          }}
        >
          {username?.[0]?.toUpperCase() || "A"}
        </Avatar>
        <Typography
          variant="body1"
          fontWeight="bold"
          fontSize={isSmallHeight ? "0.85rem" : "1rem"}
          textAlign="center"
        >
          {username || "Admin"}
        </Typography>
      </Toolbar>

      <Divider sx={{ my: 1 }} />

      {/* Menu List */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", px: 0.5 }}>
        <List>
          {menuItems.map((item, index) => (
            <ListItemButton
              key={item.text}
              selected={activeIndex === index}
              onClick={() => {
                setActiveIndex(index);
                if (isMobile) handleDrawerToggle?.();
                navigate(`/admin/${item.path}`);
              }}
              sx={{
                mx: 0.5,
                mb: 0.5,
                borderRadius: "8px",
                minHeight: isSmallHeight ? 36 : 44,
                transition: "all 0.2s",
                "&.Mui-selected": {
                  bgcolor: "#22c55e",
                  color: "white",
                  "& .MuiListItemIcon-root": { color: "white" },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: isSmallHeight ? 32 : 40,
                  color: activeIndex === index ? "white" : "#6b7280",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: isSmallHeight ? "0.8rem" : "0.9rem",
                  fontWeight: activeIndex === index ? "bold" : "normal",
                  noWrap: true,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Divider />

      {/* Logout */}
      <ListItemButton
        onClick={handleLogout}
        sx={{
          mx: 0.5,
          mb: 1,
          borderRadius: "8px",
          minHeight: isSmallHeight ? 36 : 44,
          "&:hover": { bgcolor: theme.palette.action.hover },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: isSmallHeight ? 32 : 40,
            color: "#6b7280",
          }}
        >
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText
          primary="Logout"
          primaryTypographyProps={{
            fontSize: isSmallHeight ? "0.8rem" : "0.9rem",
          }}
        />
      </ListItemButton>

      {/* Footer */}
      {!isSmallHeight && (
        <Box
          sx={{
            py: 1.5,
            textAlign: "center",
            fontSize: "12px",
            color: "#9ca3af",
          }}
        >
          © 2025 MoveBiz Admin
        </Box>
      )}
    </Box>
  );

  return isMobile || isTablet ? (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      {drawerContent}
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      open
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
