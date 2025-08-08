import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import {
  Dashboard,
  LocalShipping,
  ReceiptLong,
  SupportAgent,
  AddShoppingCart,
  Logout,
  Menu as MenuIcon
} from "@mui/icons-material";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";

const drawerWidth = 240;

const navItems = [
  { text: "Dashboard", path: "/customer/dashboard", icon: <Dashboard /> },
  { text: "Track Order", path: "/customer/track", icon: <LocalShipping /> },
  { text: "Invoices", path: "/customer/invoices", icon: <ReceiptLong /> },
  { text: "Support", path: "/customer/support", icon: <SupportAgent /> },
  { text: "Place Order", path: "/customer/place-order", icon: <AddShoppingCart /> },
];

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [name, setName] = useState("Customer");
  const [activeIndex, setActiveIndex] = useState(0);

  // Dropdown menu state for mobile
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const loadUsername = () => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setName(storedName.charAt(0).toUpperCase() + storedName.slice(1));
    } else {
      API.get("/customer/")
        .then((res) => {
          if (res.data?.name) {
            const properName =
              res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1);
            setName(properName);
            localStorage.setItem("username", properName);
          }
        })
        .catch(() => setName("Customer"));
    }
  };

  useEffect(() => {
    loadUsername();
    const handleUsernameUpdate = () => loadUsername();
    window.addEventListener("usernameUpdated", handleUsernameUpdate);
    return () => {
      window.removeEventListener("usernameUpdated", handleUsernameUpdate);
    };
  }, []);

  useEffect(() => {
    loadUsername();
    const currentIndex = navItems.findIndex((item) =>
      location.pathname.toLowerCase().includes(item.path.toLowerCase())
    );
    if (currentIndex !== -1) setActiveIndex(currentIndex);
  }, [location]);

  const initial = name.charAt(0).toUpperCase();

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* User Info */}
      <Toolbar sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
        <Avatar
          sx={{
            bgcolor: "green",
            width: 56,
            height: 56,
            mb: 1,
            fontSize: 24,
            transition: "0.3s",
            "&:hover": {
              bgcolor: "#2e7d32",
              transform: "rotate(10deg) scale(1.1)",
            },
          }}
        >
          {initial}
        </Avatar>
        <Typography variant="body1" fontWeight="bold">
          Hello, {name}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Welcome back!
        </Typography>
      </Toolbar>

      <Divider sx={{ my: 1 }} />

      {/* Navigation List */}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <List sx={{ mt: 1 }}>
          {navItems.map((item, index) => (
            <ListItemButton
              key={item.text}
              component={NavLink}
              to={item.path}
              selected={activeIndex === index}
              onClick={() => {
                setActiveIndex(index);
                if (isMobile) handleDrawerToggle?.();
              }}
              sx={{
                mx: 1,
                mb: 1,
                borderRadius: "8px",
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
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Divider />

      {/* Logout */}
      <ListItemButton
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          setName("Customer");
          navigate("/login");
        }}
        sx={{
          mx: 1,
          mb: 1,
          borderRadius: "8px",
          transition: "all 0.2s",
          "&:hover": {
            bgcolor: theme.palette.action.hover,
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 40, color: "#6b7280" }}>
          <Logout />
        </ListItemIcon>
        <ListItemText
          primary="Logout"
          primaryTypographyProps={{
            fontSize: "14px",
            fontWeight: "normal",
          }}
        />
      </ListItemButton>

      <Divider />

      {/* Footer */}
      <Box
        sx={{
          py: 2,
          textAlign: "center",
          fontSize: "12px",
          color: "#9ca3af",
        }}
      >
        © 2025 MoveBiz
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          {/* Dropdown Menu Trigger */}
          <IconButton
            color="inherit"
            onClick={handleMenuClick}
            sx={{ ml: 1 }}

          >
            <MenuIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
            {navItems.map((item, index) => (
              <MenuItem
                key={item.text}
                onClick={() => {
                  navigate(item.path);
                  setActiveIndex(index);
                  handleMenuClose();
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
              </MenuItem>
            ))}
            <Divider />
            <MenuItem
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                setName("Customer");
                navigate("/login");
                handleMenuClose();
              }}
            >
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </>
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
      )}
    </>
  );
};

export default Sidebar;
