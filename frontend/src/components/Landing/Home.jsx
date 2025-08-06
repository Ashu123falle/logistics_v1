import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Fade,
  Tabs,
  Tab,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import PublicIcon from "@mui/icons-material/Public";
import InsightsIcon from "@mui/icons-material/Insights";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import StarsIcon from "@mui/icons-material/Stars";
import InfoIcon from "@mui/icons-material/Info";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArticleIcon from "@mui/icons-material/Article";
import WorkIcon from "@mui/icons-material/Work";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ScrollToTopButton from "./ScrollToTopButton";
import ServicesCards from "./ServicesCards";

const navItems = [
  "Services",
  "Solutions",
  "Partner",
  "Company",
  "Track",
  "Support",
];

const dropdownItems = {
  Services: [
    { label: "Express Parcel", icon: <LocalShippingIcon /> },
    { label: "Warehousing", icon: <WarehouseIcon /> },
    { label: "Part Truckload", icon: <LocalMallIcon /> },
    { label: "Full Truckload", icon: <DirectionsBusIcon /> },
    { label: "Cross Border", icon: <PublicIcon /> },
    { label: "Data Intelligence", icon: <InsightsIcon /> },
  ],
  Solutions: [
    { label: "D2C Brands", icon: <BusinessIcon /> },
    { label: "Personal Courier", icon: <PersonIcon /> },
    { label: "B2B Enterprises", icon: <GroupWorkIcon /> },
    { label: "RTO Predictor", icon: <StarsIcon /> },
  ],
  Company: [
    { label: "About Us", icon: <InfoIcon /> },
    { label: "Governance", icon: <AccountBalanceIcon /> },
    { label: "Investor Relations", icon: <TrendingUpIcon /> },
    { label: "Press Release", icon: <ArticleIcon /> },
    { label: "Careers", icon: <WorkIcon /> },
  ],
  "Ship Now": [
    { label: "Business Shipments", icon: <BusinessIcon /> },
    {
      label: "Direct Local",
      icon: <LocalShippingIcon sx={{ color: "#000" }} />, // Truck icon for Local
    },
    {
      label: "Direct National",
      icon: <PublicIcon sx={{ color: "#000" }} />, // Globe icon for National
    },
  ],
};

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEls, setAnchorEls] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const [trackType, setTrackType] = useState("LRN");
  const [shipType, setShipType] = useState("Domestic");

  // Initialize the useNavigate hook
  const navigate = useNavigate();

  const handleHover = (event, menuName) => {
    setAnchorEls((prev) => ({ ...prev, [menuName]: event.currentTarget }));
  };

  const handleClose = (menuName) => {
    setAnchorEls((prev) => ({ ...prev, [menuName]: null }));
  };

  const toggleDrawer = () => {
    setAnchorEls({});
  };

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const handleTrackTypeChange = (e, newType) => {
    if (newType) setTrackType(newType);
  };

  const handleShipTypeChange = (e, newType) => {
    if (newType) setShipType(newType);
  };

  // Handler functions for navigation
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#0b0c0e",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          borderBottom: "2px solid red",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#ffffff",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            MoveBiz
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              {navItems.map((item) =>
                dropdownItems[item] ? (
                  <Box
                    key={item}
                    onMouseEnter={(e) => handleHover(e, item)}
                    onMouseLeave={() => handleClose(item)}
                  >
                    <Button
                      sx={{
                        color: "#fff",
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: "1rem",
                        borderBottom: anchorEls[item]
                          ? "2px solid red"
                          : "2px solid transparent",
                        transition: "all 0.3s ease",
                      }}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      {item}
                    </Button>
                    <Menu
                      anchorEl={anchorEls[item]}
                      open={Boolean(anchorEls[item])}
                      onClose={() => handleClose(item)}
                      TransitionComponent={Fade}
                      MenuListProps={{ onMouseLeave: () => handleClose(item) }}
                      PaperProps={{
                        sx: {
                          mt: 1,
                          borderRadius: 2,
                          minWidth: 220,
                          boxShadow: "0px 4px 16px rgba(0,0,0,0.2)",
                          p: 1,
                        },
                      }}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      {dropdownItems[item].map((option) => (
                        <MenuItem
                          key={option.label}
                          onClick={() => handleClose(item)}
                          sx={{
                            px: 2,
                            py: 1,
                            borderRadius: 1,
                            "&:hover": {
                              backgroundColor: "#f1f1f1",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            {option.icon}
                            {option.label}
                          </Box>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                ) : (
                  <Button
                    key={item}
                    sx={{
                      color: "#fff",
                      textTransform: "none",
                      fontWeight: 500,
                      fontSize: "1rem",
                    }}
                  >
                    {item}
                  </Button>
                )
              )}

              {/* Ship Now */}
              <Box
                onMouseEnter={(e) => handleHover(e, "Ship Now")}
                onMouseLeave={() => handleClose("Ship Now")}
              >
                <Button
                  variant="contained"
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    backgroundColor: "#fff",
                    color: "#000",
                    fontWeight: "bold",
                    textTransform: "none",
                    borderRadius: "6px",
                    px: 2,
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  Ship Now
                </Button>
                <Menu
                  anchorEl={anchorEls["Ship Now"]}
                  open={Boolean(anchorEls["Ship Now"])}
                  onClose={() => handleClose("Ship Now")}
                  TransitionComponent={Fade}
                  MenuListProps={{
                    onMouseLeave: () => handleClose("Ship Now"),
                  }}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      borderRadius: 2,
                      minWidth: 220,
                      boxShadow: "0px 4px 16px rgba(0,0,0,0.2)",
                      p: 1,
                    },
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  {dropdownItems["Ship Now"].map((option) => (
                    <MenuItem
                      key={option.label}
                      onClick={() => handleClose("Ship Now")}
                      sx={{ px: 2, py: 1, borderRadius: 1 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        {option.icon}
                        {option.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              {/* User Menu (Login Dropdown) */}
              <Box>
                <Button
                  onClick={(e) => handleHover(e, "User")}
                  sx={{
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                  endIcon={<KeyboardArrowDownIcon />}
                  startIcon={<AccountCircleIcon />}
                >
                  Login
                </Button>

                <Menu
                  anchorEl={anchorEls["User"]}
                  open={Boolean(anchorEls["User"])}
                  onClose={() => handleClose("User")}
                  TransitionComponent={Fade}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      borderRadius: 2,
                      minWidth: 250,
                      boxShadow: "0px 4px 16px rgba(0,0,0,0.2)",
                      p: 0,
                    },
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  {/* Header */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 2,
                      py: 1,
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <Typography variant="body2">New customer?</Typography>
                    <Button
                      size="small"
                      onClick={handleSignupClick} // Attach the handler
                      sx={{
                        color: "blue",
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Sign Up
                    </Button>
                  </Box>

                  {/* Menu Items */}
                  <MenuItem
                    onClick={() => handleClose("User")}
                    sx={{ py: 1.2, px: 2, gap: 1 }}
                  >
                    <AccountCircleIcon fontSize="small" />
                    My Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleClose("User")}
                    sx={{ py: 1.2, px: 2, gap: 1 }}
                  >
                    <Inventory2Icon fontSize="small" />
                    Orders
                  </MenuItem>

                  {/* Divider */}
                  <Box sx={{ borderTop: "1px solid #ddd", my: 1 }} />

                  {/* Login Button at the bottom */}
                  <MenuItem
                    onClick={() => {
                      handleClose("User");
                      handleLoginClick(); // Attach the handler
                    }}
                    sx={{
                      py: 1.2,
                      px: 2,
                      fontWeight: "bold",
                      color: "blue",
                      justifyContent: "center",
                    }}
                  >
                    Login
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <IconButton color="inherit" edge="end" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={Boolean(anchorEls.drawer)}
          onClose={toggleDrawer}
        >
          <Box
            sx={{
              width: 250,
              backgroundColor: "#0b0c0e",
              height: "100%",
              color: "white",
            }}
          >
            <List>
              {navItems.map((item) => (
                <ListItem button key={item} onClick={toggleDrawer}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
              <ListItem button onClick={toggleDrawer}>
                <ListItemText primary="Ship Now ▾" />
              </ListItem>
              <ListItem button onClick={toggleDrawer}>
                <ListItemText primary="Login / Sign Up" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </AppBar>

      {/* Form Section */}
      <Grid
        container
        sx={{
          mt: 4,
          minHeight: "80vh",
          position: "relative",
          backgroundImage: `url("http://localhost:3000/images/marcin-jozwiak-kGoPcmpPT7c-unsplash.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Black overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />

        {/* Left side form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            pl: { xs: 2, md: 8 },
            zIndex: 2,
          }}
        >
          <Paper
            elevation={4}
            sx={{
              width: 400,
              borderRadius: 2,
              overflow: "hidden",
              p: 2,
              backgroundColor: "rgba(255,255,255,0.9)",
            }}
          >
            {/* Tabs */}
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              textColor="inherit"
              indicatorColor="secondary"
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tab label="Track order" sx={{ fontWeight: "bold" }} />
              <Tab label="Ship order" />
            </Tabs>

            {/* Content */}
            <Box sx={{ p: 2 }}>
              {tabValue === 0 ? (
                <>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Track your order through
                  </Typography>

                  <ToggleButtonGroup
                    value={trackType}
                    exclusive
                    onChange={handleTrackTypeChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    <ToggleButton value="Mobile">Mobile</ToggleButton>
                    <ToggleButton value="AWB">AWB</ToggleButton>
                    <ToggleButton value="OrderId">Order Id</ToggleButton>
                    <ToggleButton value="LRN" sx={{ fontWeight: "bold" }}>
                      LRN
                    </ToggleButton>
                  </ToggleButtonGroup>

                  <TextField
                    placeholder={`Enter your ${trackType}`}
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: "black",
                      "&:hover": { bgcolor: "#333" },
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Track Order
                  </Button>
                </>
              ) : (
                <>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    Ship <span style={{ fontWeight: 400 }}>personal courier</span>
                  </Typography>

                  {/* Domestic / International Toggle */}
                  <ToggleButtonGroup
                    value={shipType}
                    exclusive
                    onChange={handleShipTypeChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    <ToggleButton value="Domestic">
                      <LocalShippingIcon sx={{ mr: 1 }} />
                      Domestic
                    </ToggleButton>
                    <ToggleButton value="International" disabled>
                      <PublicIcon sx={{ mr: 1 }} />
                      International
                    </ToggleButton>
                  </ToggleButtonGroup>

                  {/* Pickup & Delivery Inputs */}
                  <TextField
                    placeholder="Enter pickup pin code"
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    placeholder="Enter delivery pin code"
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />

                  {/* Submit Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: "black",
                      "&:hover": { bgcolor: "#333" },
                      textTransform: "none",
                      fontWeight: "bold",
                      mb: 2,
                    }}
                  >
                    Get OTP & Ship Now
                  </Button>

                  {/* Business Signup Link */}
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{
                      color: "red",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={handleSignupClick} // Attach the handler
                  >
                    Sign up to ship as a business here
                  </Typography>
                </>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Cards */}
      <ServicesCards />

      {/* New Experience Section */}
      <Box
        sx={{
          background: "linear-gradient(45deg, #ff0000 50%, #0b0c0e 50%)",
          color: "#fff",
          minHeight: "40vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          mt: 6,
          py: 6,
          px: 2,
        }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 400,
            mb: 2,
            fontFamily: "Inter, sans-serif",
            textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
          }}
        >
          Experience the{" "}
          <span style={{ fontWeight: 700, color: "#fff" }}>
            operating system
          </span>{" "}
          for commerce in India
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body1"
          sx={{
            color: "#f1f1f1",
            mb: 4,
            fontSize: "1.1rem",
            fontFamily: "Inter, sans-serif",
            textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
          }}
        >
          Sign up now to start shipping
        </Typography>

        {/* Buttons */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              onClick={handleSignupClick} // Attach the handler
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "6px",
                px: 3,
                py: 1,
                "&:hover": { backgroundColor: "#f4f4f4" },
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Business Shipments
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          borderTop: "1px solid black",
          mt: 6,
          px: 2,
          py: 1.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Left Side */}
        <Box sx={{ flex: 1, minWidth: "250px", mb: 1 }}>
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: "#666",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            &copy; {new Date().getFullYear()} MoveBiz. All rights reserved.
          </Typography>
        </Box>

        {/* Social Icons */}
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <IconButton
            disabled
            sx={{ backgroundColor: "#111", color: "#fff", p: 1 }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            disabled
            sx={{ backgroundColor: "#111", color: "#fff", p: 1 }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            disabled
            sx={{ backgroundColor: "#111", color: "#fff", p: 1 }}
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            disabled
            sx={{ backgroundColor: "#111", color: "#fff", p: 1 }}
          >
            <YouTubeIcon />
          </IconButton>
          <IconButton
            disabled
            sx={{ backgroundColor: "#111", color: "#fff", p: 1 }}
          >
            <InstagramIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Scroll To Top Button (OUTSIDE footer) */}
      <ScrollToTopButton />
    </>
  );
}