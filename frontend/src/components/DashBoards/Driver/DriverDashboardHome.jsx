import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

export default function DriverDashboardHome() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Welcome back, Driver 👋
      </Typography>

      {/* Trip Summary Cards */}
      <Grid container spacing={3}>
        {/* Assigned Trips */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: "#2196f3" }}>
                <DirectionsCarIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle2">Assigned Trips</Typography>
                <Typography variant="h6" fontWeight="bold">5</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* In Progress */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: "#ff9800" }}>
                <LocalShippingIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle2">In Progress</Typography>
                <Typography variant="h6" fontWeight="bold">2</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Completed */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: "#4caf50" }}>
                <CheckCircleIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle2">Completed</Typography>
                <Typography variant="h6" fontWeight="bold">18</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Earnings */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: "#673ab7" }}>
                <AttachMoneyIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle2">This Month</Typography>
                <Typography variant="h6" fontWeight="bold">₹52,000</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Notifications Section */}
      <Box mt={5}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Recent Notifications
        </Typography>
        <Paper elevation={2} sx={{ borderRadius: 2 }}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "#f44336" }}>
                  <NotificationsActiveIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="New Trip Assigned: Trip ID #TX3291"
                secondary="2 mins ago"
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "#3f51b5" }}>
                  <NotificationsActiveIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Delivery Status Updated: Trip ID #TX3289"
                secondary="15 mins ago"
              />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Box>
  );
}
