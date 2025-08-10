import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Tooltip,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Dashboard,
  LocalShipping,
  ReceiptLong,
  SupportAgent,
  AddShoppingCart,
  Logout,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";

import { NavLink, useNavigate, useLocation } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const drawerWidth = 240;

const navItems = [
  { text: "Dashboard", path: "/customer/dashboard", icon: <Dashboard /> },
  { text: "Track Order", path: "/customer/track", icon: <LocalShipping /> },
  { text: "Invoices", path: "/customer/invoices", icon: <ReceiptLong /> },
  { text: "Support", path: "/customer/support", icon: <SupportAgent /> },
  { text: "Place Order", path: "/customer/place-order", icon: <AddShoppingCart /> },
];

const CustomerNavbar = () => {
  const { auth, logout } = useAuth();
  const userRole = auth?.role;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [username, setUsername] = useState("Customer");
  const [activeIndex, setActiveIndex] = useState(0);
  const [shipNowAnchorEl, setShipNowAnchorEl] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Load username from localStorage or API
  const loadUsername = () => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName.charAt(0).toUpperCase() + storedName.slice(1));
    } else {
      API.get("/customer/")
        .then((res) => {
          if (res.data?.name) {
            const properName =
              res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1);
            setUsername(properName);
            localStorage.setItem("username", properName);
          }
        })
        .catch(() => setUsername("Customer"));
    }
  };

  useEffect(() => {
    loadUsername();

    // Update active nav item based on URL path
    const currentIndex = navItems.findIndex((item) =>
      location.pathname.toLowerCase().includes(item.path.toLowerCase())
    );
    if (currentIndex !== -1) setActiveIndex(currentIndex);
  }, [location]);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  // Ship Now Menu Handlers
  const handleShipNowOpen = (event) => setShipNowAnchorEl(event.currentTarget);
  const handleShipNowClose = () => setShipNowAnchorEl(null);

  // First letter for avatar
  const initial = username.charAt(0).toUpperCase();

  // Ship Now dropdown options
  const shipNowOptions = (
    <>
      <MenuItem
        onClick={() => {
          handleShipNowClose();
          navigate("/customer/place-order");
        }}
      >
        Place Order
      </MenuItem>
      <MenuItem onClick={handleShipNowClose}>Schedule a Pickup</MenuItem>
    </>
  );

  // Drawer content (sidebar style)
  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "#fff",
      }}
    >
      {/* User Info */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Avatar
          sx={{
            bgcolor: "green",
            width: 64,
            height: 64,
            fontSize: 28,
            mb: 1,
            cursor: "default",
          }}
          alt={username}
        >
          {initial}
        </Avatar>
        <Typography variant="h6" fontWeight="bold">
          Hello, {username}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Welcome back!
        </Typography>
      </Box>

      {/* Navigation */}
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item, index) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.path}
            selected={activeIndex === index}
            onClick={() => {
              setActiveIndex(index);
              if (isMobile) toggleDrawer();
            }}
            sx={{
              mx: 2,
              my: 0.5,
              borderRadius: 1,
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
                color: activeIndex === index ? "white" : theme.palette.text.secondary,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: activeIndex === index ? "bold" : "normal",
                fontSize: 14,
              }}
            />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      {/* Ship Now button */}
      {userRole === "ROLE_CUSTOMER" && (
        <Box sx={{ px: 2, py: 1 }}>
          <Button
            variant="contained"
            fullWidth
            endIcon={<KeyboardArrowDownIcon />}
            onClick={handleShipNowOpen}
            sx={{ textTransform: "none" }}
          >
            Ship Now
          </Button>
          <Menu
            anchorEl={shipNowAnchorEl}
            open={Boolean(shipNowAnchorEl)}
            onClose={handleShipNowClose}
          >
            {shipNowOptions}
          </Menu>
        </Box>
      )}

      {/* Logout */}
      {userRole && (
        <>
          <Divider />
          <ListItemButton
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("username");
              setUsername("Customer");
              logout();
              navigate("/login");
              if (isMobile) toggleDrawer();
            }}
            sx={{
              mx: 2,
              my: 1,
              borderRadius: 1,
              "&:hover": { bgcolor: theme.palette.action.hover },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: theme.palette.text.secondary }}>
              <Logout />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{ fontSize: 14 }}
            />
          </ListItemButton>
        </>
      )}

      {/* Footer */}
      <Box
        sx={{
          py: 2,
          textAlign: "center",
          fontSize: 12,
          color: theme.palette.text.disabled,
        }}
      >
        © 2025 MoveBiz
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "#0b0c0e", boxShadow: "none", zIndex: theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff" }}>
            MoveBiz
          </Typography>

          {/* Desktop Nav Buttons */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              {navItems.map((item, index) => (
                <Button
                  key={item.text}
                  component={NavLink}
                  to={item.path}
                  sx={{
                    color: activeIndex === index ? "#22c55e" : "#fff",
                    fontWeight: activeIndex === index ? "bold" : "normal",
                    textTransform: "none",
                  }}
                  onClick={() => setActiveIndex(index)}
                >
                  {item.text}
                </Button>
              ))}

              {/* Ship Now dropdown */}
              {userRole === "ROLE_CUSTOMER" && (
                <>
                  <Button
                    variant="contained"
                    onClick={handleShipNowOpen}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{
                      backgroundColor: "#fff",
                      color: "#000",
                      fontWeight: "bold",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                  >
                    Ship Now
                  </Button>
                  <Menu
                    anchorEl={shipNowAnchorEl}
                    open={Boolean(shipNowAnchorEl)}
                    onClose={handleShipNowClose}
                  >
                    {shipNowOptions}
                  </Menu>
                </>
              )}

              {/* Logout button */}
              {userRole && (
                <Button onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("username");
                  setUsername("Customer");
                  logout();
                  navigate("/login");
                }} sx={{ color: "#fff" }}>
                  Logout
                </Button>
              )}
            </Box>
          )}

          {/* Mobile Hamburger */}
          {isMobile && (
            <IconButton color="inherit" edge="end" onClick={toggleDrawer} aria-label="open drawer">
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default CustomerNavbar;
