import React from 'react';
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
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const navItems = ['Services', 'Solutions', 'Partner', 'Company', 'Track', 'Support'];

export default function HomeNav() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#0b0c0e', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>
         P2PLogistics
        </Typography>

        {/* Desktop Menu */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff', textTransform: 'none' }}>
                {item}
              </Button>
            ))}
            <Button
              variant="contained"
              onClick={handleMenuOpen}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                backgroundColor: '#fff',
                color: '#000',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}
            >
              Ship Now
            </Button>
          </Box>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton color="inherit" edge="end" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Ship Now Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Schedule a Pickup</MenuItem>
        <MenuItem onClick={handleMenuClose}>Create Shipment</MenuItem>
      </Menu>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250, backgroundColor: '#0b0c0e', height: '100%', color: 'white' }}>
          <List>
            {navItems.map((item) => (
              <ListItem button key={item} onClick={toggleDrawer}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
            <ListItem button onClick={handleMenuOpen}>
              <ListItemText primary="Ship Now ▾" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
