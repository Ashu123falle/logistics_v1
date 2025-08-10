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
  Collapse,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";


import MenuIcon from "@mui/icons-material/Menu";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import PublicIcon from "@mui/icons-material/Public";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import StarsIcon from "@mui/icons-material/Stars";
import InfoIcon from "@mui/icons-material/Info";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ScrollToTopButton from "./ScrollToTopButton";
import ServicesCards from "./ServicesCards";
import Footer from "./Footer";


const navItems = ["Services", "Solutions", "About Us", "Track", "Support"];


const dropdownItems = {
  Services: [
    { label: "B2B Service", icon: <LocalShippingIcon /> },
    { label: "Express Parcel", icon: <LocalShippingIcon /> },
    { label: "Warehousing", icon: <WarehouseIcon /> },
    { label: "Part Truckload", icon: <LocalMallIcon /> },
    { label: "Full Truckload", icon: <DirectionsBusIcon /> },
  ],
  Solutions: [
    { label: "D2C Brands", icon: <BusinessIcon /> },
    { label: "Personal Courier", icon: <PersonIcon /> },
    { label: "B2B Enterprises", icon: <GroupWorkIcon /> },
    { label: "RTO Predictor", icon: <StarsIcon /> },
  ],
  "Ship Now": [
    { label: "Business Shipments", icon: <BusinessIcon /> },
    { label: "Direct Local", icon: <LocalShippingIcon /> },
    { label: "Direct National", icon: <PublicIcon /> },
  ],
};


const navItemsWithIcons = {
  Track: <TravelExploreIcon />,
  "About Us": <InfoIcon />,
  Support: <HelpOutlineIcon />,
};


export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEls, setAnchorEls] = useState({});
  const [openMobileMenu, setOpenMobileMenu] = useState({});

  const navigate = useNavigate();

 
  const handleHover = (event, menuName) => {
    setAnchorEls((prev) => ({ ...prev, [menuName]: event.currentTarget }));
  };

  const handleClose = (menuName) => {
    setAnchorEls((prev) => ({ ...prev, [menuName]: null }));
  };

  
  const toggleDrawer = () => {
    setAnchorEls((prev) => ({ ...prev, drawer: !prev.drawer }));
    setOpenMobileMenu({}); 
  };

  const handleMobileMenuToggle = (menuName) => {
    setOpenMobileMenu((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  
  const handleLoginClick = () => navigate("/login");
  const handleSignupClick = () => navigate("/signup");
  const handleTrackOrderClick = () => navigate("/track-order");
  const handleAboutUsClick = () => navigate("/about-us");
  const handleSupportClick = () => navigate("/support");

  const handleNavigation = (item) => {
    switch (item) {
      case "Track":
        handleTrackOrderClick();
        break;
      case "About Us":
        handleAboutUsClick();
        break;
      case "Support":
        handleSupportClick();
        break;
      default:
        break;
    }
   
    if (isMobile) {
      toggleDrawer();
    }
  };

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "#1d1819",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          borderBottom: "2px solid #ff0000",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#ffffff",
              fontFamily: "'Montserrat', sans-serif",
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
                        position: 'relative',
                        overflow: 'hidden',
                        "&:after": {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: (Boolean(anchorEls[item])) ? '50%' : '0%', 
                          height: '2px',
                          backgroundColor: '#ff0000',
                          transition: 'width 0.3s ease-out',
                        },
                        "&:hover:after": {
                          width: '50%',
                        },
                      }}
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
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                      transformOrigin={{ vertical: "top", horizontal: "left" }}
                    >
                      {dropdownItems[item].map((option) => (
                        <MenuItem
                          key={option.label}
                          onClick={() => handleClose(item)}
                          sx={{
                            px: 2,
                            py: 1,
                            borderRadius: 1,
                            "&:hover": { backgroundColor: "#f1f1f1" },
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
                      position: 'relative',
                      overflow: 'hidden',
                      "&:after": {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '0%',
                        height: '2px',
                        backgroundColor: '#ff0000',
                        transition: 'width 0.3s ease-out',
                      },
                      "&:hover:after": {
                        width: '50%',
                      },
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                    onClick={() => handleNavigation(item)}
                    startIcon={navItemsWithIcons[item]}
                  >
                    {item}
                  </Button>
                )
              )}

              {/* Ship Now Button */}
              <Box
                onMouseEnter={(e) => handleHover(e, "Ship Now")}
                onMouseLeave={() => handleClose("Ship Now")}
              >
                <Button
                  variant="contained"
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
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  {dropdownItems["Ship Now"].map((option) => (
                    <MenuItem
                      key={option.label}
                      onClick={() => {
                        handleClose("Ship Now");
                        if (option.label === "Business Shipments") {
                          handleSignupClick();
                        }
                      }}
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

              <Button
  variant="outlined"
  onClick={handleLoginClick}
  sx={{
    ml: 2,
    color: "#fff",
    borderColor: "#fff",
    textTransform: "none",
    fontWeight: "bold",
    borderRadius: "6px",
    px: 2,
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.1)",
      borderColor: "#ff0000",
      color: "#ff0000",
    },
  }}
>
  Login
</Button>
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
              {navItems.map((item) => {
                const hasDropdown = !!dropdownItems[item];
                const icon = navItemsWithIcons[item];
                return (
                  <React.Fragment key={item}>
                    <ListItem
                      button
                      onClick={() =>
                        hasDropdown
                          ? handleMobileMenuToggle(item)
                          : handleNavigation(item)
                      }
                    >
                      {icon && <Box sx={{ mr: 2 }}>{icon}</Box>}{" "}
                      <ListItemText primary={item} />
                    </ListItem>
                    {hasDropdown && (
                      <Collapse
                        in={openMobileMenu[item]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding sx={{ pl: 4 }}>
                          {dropdownItems[item].map((option) => (
                            <ListItem
                              button
                              key={option.label}
                              onClick={toggleDrawer}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                {option.icon}
                                <ListItemText primary={option.label} />
                              </Box>
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </React.Fragment>
                );
              })}
              {/* Ship Now Dropdown */}
              <ListItem button onClick={() => handleMobileMenuToggle("Ship Now")}>
                <ListItemText primary="Ship Now" />
              </ListItem>
              <Collapse
                in={openMobileMenu["Ship Now"]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  {dropdownItems["Ship Now"].map((option) => (
                    <ListItem
                      button
                      key={option.label}
                      onClick={() => {
                        toggleDrawer();
                        if (option.label === "Business Shipments") {
                          handleSignupClick(); 
                        }
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
                        <ListItemText primary={option.label} />
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
                <Button
                      variant="outlined"
                      onClick={handleLoginClick}
                      sx={{
                        ml: 2,
                        color: "#fff",
                        borderColor: "#fff",
                        textTransform: "none",
                        fontWeight: "bold",
                        borderRadius: "6px",
                        px: 2,
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.1)",
                          borderColor: "#ff0000",
                          color: "#ff0000",
                        },
                      }}
                    >
                      Login
                </Button>
            </List>
          </Box>
          
        </Drawer>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "80vh",
          position: "relative",
          backgroundImage: `url("http://localhost:5173/images/marcin-jozwiak-kGoPcmpPT7c-unsplash.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1,
          }}
        />
        <Grid
          container
          sx={{ zIndex: 2, p: 4, alignItems: "center", justifyContent: "center" }}
        >
          <Grid item xs={12} md={8} sx={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: "#ffffff",
                letterSpacing: 1.2,
                textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
              }}
            >
              B2B Logistics
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
              <Button
                variant="contained"
                onClick={handleTrackOrderClick}
                sx={{
                  backgroundColor: "#ff0000",
                  color: "#fff",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: "6px",
                  px: 4,
                  py: 1.5,
                  "&:hover": { backgroundColor: "#cc0000" },
                }}
                data-aos="fade-up"
              >
                Track Your Order
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Cards */}
      <ServicesCards />

      {/* New Experience Section */}
      <Box
        sx={{
          backgroundColor: "#ffffff",
          color: "#212121",
          minHeight: "40vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          mt: 6,
          py: { xs: 5, md: 8 },
          px: 2,
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
        >
          Experience the{" "}
          <Box component="span" sx={{ color: "#d32f2f", fontWeight: 700 }}>
            operating system
          </Box>{" "}
          for commerce in India
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#555",
            maxWidth: 650,
            mb: 4,
          }}
        >
          Sign up now to streamline your business shipments and unlock smart
          logistics across India.
        </Typography>

        <Button
          variant="contained"
          onClick={handleSignupClick}
          sx={{
            backgroundColor: "#d32f2f",
            color: "#fff",
            textTransform: "none",
            borderRadius: "8px",
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            boxShadow: "0 4px 12px rgba(211, 47, 47, 0.2)",
            "&:hover": {
              backgroundColor: "#b71c1c",
              boxShadow: "0 6px 20px rgba(183, 28, 28, 0.3)",
            },
          }}
          endIcon={<ArrowForwardIcon />}
          ata-aos="fade-up"
        >
          Business Shipments
        </Button>
      </Box>

      {/* Footer */}
      <Footer />

      {/* Scroll To Top Button (OUTSIDE footer) */}
      <ScrollToTopButton />
    </>
  );
}
