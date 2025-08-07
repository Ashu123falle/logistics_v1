import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { NavLink, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/customer' },
  { label: 'Place Order', icon: <LocalShippingIcon />, path: '/customer/place-order' },
  { label: 'Track Order', icon: <LocalShippingIcon />, path: '/customer/track' },
  { label: 'Payments', icon: <PaymentIcon />, path: '/customer/payments' },
  { label: 'Support', icon: <SupportAgentIcon />, path: '/customer/support' },
  { label: 'Profile', icon: <PersonIcon />, path: '/customer/profile' },
  { label: 'Logout', icon: <ExitToAppIcon />, path: '/logout' },
];

const CustomerSidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItem
              key={item.label}
              component={NavLink}
              to={item.path}
              sx={{
                backgroundColor: isActive ? '#e3f2fd' : 'transparent',
                '&:hover': {
                  backgroundColor: '#f1f1f1',
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default CustomerSidebar;
