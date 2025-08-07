// src/pages/DriverDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Box,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MapIcon from "@mui/icons-material/Map";
import API from "../../services/api"
import { useAuth } from "../../context/AuthContext"; 

const DriverDashboard = () => {
  const { auth } = useAuth();
  const [deliveries, setDeliveries] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  const driverId =  auth.userId;
  useEffect(() => {
  const fetchData = async () => {
    try {
    const [driverRes, deliveryRes] = await Promise.all([
  API.get(`/drivers/${driverId}`),
  API.get(`/delivery-orders/driver/${driverId}`),
]);

// const vehicleRes = driverRes.data?.driverId
//   ? await API.get(`/vehicles/driver/${driverRes.data.driverId}`)
//   : null;

console.log(driverRes.data);

setDriver(driverRes.data);
setDeliveries(deliveryRes.data);
setVehicle(driverRes.data.vehicle);
setLoading(false);

    } catch (err) {
      console.error("Error loading dashboard:", err);
      setLoading(false);
    }
  };

  fetchData();
}, [driverId]);
const handleStatusChange = async (id, newStatus) => {
  try {
    console.log("ID: "+id);
    
    // Send PATCH request to backend
    const temp = await API.patch(`/delivery-orders/${id}/status`, {
      "status": newStatus,
    });

    // Update local state
    const updated = deliveries.map((d) =>
      d.deliveryId === id
        ? {
            ...d,
            status: newStatus,
            statusLabel: formatStatusLabel(newStatus),
          }
        : d
    );

    setDeliveries(updated);
   
  } catch (error) {
    console.error("Failed to update status:", error);
    alert("Error updating status");
  }
};

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
        <Box p={8}>
    <Typography variant="h4" gutterBottom>
        Driver Dashboard
      </Typography>

      <Grid container spacing={3}>
  {/* Tile 1: Driver Profile */}
  <Grid item xs={12} md={6}>
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6">Driver Profile</Typography>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
            {driver?.name?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body1"><strong>{driver?.name}</strong></Typography>
            <Typography variant="body2">{driver?.email}</Typography>
            <Typography variant="body2">License: {driver?.licenseNumber}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Grid>

  {/* Tile 2: Assigned Vehicle */}
  <Grid item xs={12} md={6}>
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6">Assigned Vehicle</Typography>
        <Divider sx={{ my: 1 }} />
        {vehicle ? (
          <>
            <Typography><DirectionsCarIcon /> {vehicle.model}</Typography>
            <Typography>Vehicle No: {vehicle.registrationNumber}</Typography>
            <Typography>Capacity: {vehicle.capacity} kg</Typography>
          </>
        ) : (
          <Typography>No vehicle assigned.</Typography>
        )}
      </CardContent>
    </Card>
  </Grid>

  {/* Tile 3: Assigned Deliveries */}
  <Grid item xs={12} md={6}>
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6">Assigned Deliveries</Typography>
        <Divider sx={{ my: 1 }} />
        {deliveries.length === 0 ? (
          <Typography>No deliveries assigned yet.</Typography>
        ) : (
          deliveries.map((order, index) => (
            <Paper key={index} variant="outlined" sx={{ p: 2, mb: 1 }}>
              <Typography><LocalShippingIcon /> Order #{order.id}</Typography>
              <Typography>Pickup: {order.scheduledPickupDate.slice(0, 10)}</Typography>
              <Typography>Drop: {order.scheduledDeliveryDate.slice(0, 10)}</Typography>
              <Typography>Status: <strong>{order.status}</strong></Typography>
              <Button
                variant="contained"
                color="success"
                size="small"
                sx={{ mt: 1 }}
                onClick={() => {
                  setSnackbarMessage("Marked as delivered");
                  setSnackbarOpen(true);
                }}
              >
                Mark as Delivered
              </Button>
            </Paper>
          ))
        )}
      </CardContent>
    </Card>
  </Grid>

  {/* Tile 4: Map Placeholder */}
  <Grid item xs={12} md={6}>
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6"><MapIcon /> Map View</Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2">Map integration coming soon...</Typography>
      </CardContent>
    </Card>
  </Grid>
</Grid>

    </Box>
  );
};

export default DriverDashboard;
