import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import {
  Dashboard,
  LocalShipping,
  ReceiptLong,
  SupportAgent,
  AddShoppingCart,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const navItems = [
  { text: "Dashboard", path: "/customer/dashboard", icon: <Dashboard /> },
  { text: "Track Shipment", path: "/customer/track", icon: <LocalShipping /> },
  { text: "Invoices", path: "/customer/invoices", icon: <ReceiptLong /> },
  { text: "Support", path: "/customer/support", icon: <SupportAgent /> },
  { text: "Place Order", path: "/customer/place-order", icon: <AddShoppingCart /> }, // New

];

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={NavLink} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
