// src/components/Navbar.jsx
import React, { useContext, useState } from "react";
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
  ListItem,
  ListItemText
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  // const { userRole, logout } = useContext(AuthContext);
  const { auth, logout } = useAuth();
const userRole = auth.role;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const navItemsByRole = {
    public: ["Services", "Solutions", "Track", "Support"],
    ROLE_CUSTOMER: ["Dashboard", "Track Orders", "Place Order"],
    ROLE_ADMIN: ["Dashboard", "Manage Users", "Manage Orders", "Drivers"],
    ROLE_DRIVER: ["My Deliveries", "Profile"],
  };

  const shipNowOptions = (
    <>
      <MenuItem onClick={handleMenuClose}>Schedule a Pickup</MenuItem>
      <MenuItem onClick={handleMenuClose}>Create Shipment</MenuItem>
    </>
  );

  const navItems = navItemsByRole[userRole || "public"];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#0b0c0e", boxShadow: "none" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff" }}>
            P2PLogistics
          </Typography>

          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: "#fff", textTransform: "none" }}>
                  {item}
                </Button>
              ))}

              {userRole === "ROLE_CUSTOMER" && (
                <Button
                  variant="contained"
                  onClick={handleMenuOpen}
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
              )}

              {userRole && (
                <Button onClick={logout} sx={{ color: "#fff" }}>
                  Logout
                </Button>
              )}
            </Box>
          )}

          {/* Mobile Hamburger */}
          {isMobile && (
            <IconButton color="inherit" edge="end" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Dropdown Menu for Ship Now */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {shipNowOptions}
      </Menu>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250, backgroundColor: "#0b0c0e", height: "100%", color: "white" }}>
          <List>
            {navItems.map((item) => (
              <ListItem button key={item} onClick={toggleDrawer}>
                <ListItemText primary={item} />
              </ListItem>
            ))}

            {userRole === "ROLE_CUSTOMER" && (
              <ListItem button onClick={handleMenuOpen}>
                <ListItemText primary="Ship Now ▾" />
              </ListItem>
            )}

            {userRole && (
              <ListItem button onClick={logout}>
                <ListItemText primary="Logout" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
