import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import API from "../../services/api";

const TrackShipment = () => {
  const [orderId, setOrderId] = useState("");
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState("");

  // Shipment progress steps
  const steps = ["PENDING", "CONFIRMED", "RECEIVED", "IN_TRANSIT", "DELIVERED"];

  // Dynamic step index
  const getStepIndex = (status) => {
    if (!status) return 0;
    return steps.findIndex(
      (step) => step.toLowerCase() === status.toLowerCase()
    );
  };

  const handleTrack = async () => {
    if (!orderId) return;

    try {
      const response = await API.get(`/customer/track/${orderId}`);
      setShipment(response.data);
      setError("");
    } catch (err) {
      setShipment(null);
      setError("Shipment not found. Please check the Order ID.");
    }
  };

  return (
    <Box
      component={Paper}
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        marginLeft: { xs: 0, md: "240px" },
        transition: "margin-left 0.3s ease",
        width: "100%",
        maxWidth: "1000px",
        mx: "auto",
        mt: { xs: 2, sm: 3 },
      }}
    >
      <Typography variant="h5" gutterBottom fontSize={{ xs: "1.2rem", sm: "1.5rem" }}>
        Track Your Delivery Order
      </Typography>

      <TextField
        fullWidth
        label="Enter Order ID"
        variant="outlined"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth={true}
        sx={{ py: 1.2, fontSize: { xs: "0.85rem", sm: "1rem" } }}
        onClick={handleTrack}
      >
        Track
      </Button>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {shipment && (
        <Box sx={{ mt: 4 }}>
          {/* Stepper */}
          <Box sx={{ overflowX: "auto", pb: 1 }}>
            <Stepper
              activeStep={getStepIndex(shipment.status)}
              alternativeLabel
              sx={{
                minWidth: "500px", // Force scrolling on small devices
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* Order Details */}
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, fontSize: { xs: "1rem", sm: "1.2rem" } }}
          >
            Order Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Order ID:</strong> {shipment.id}</Typography>
              <Typography><strong>Status:</strong> {shipment.status}</Typography>
              <Typography><strong>Cost:</strong> ₹{shipment.cost}</Typography>
              <Typography><strong>Pickup Date:</strong> {shipment.scheduledPickupDate}</Typography>
              <Typography><strong>Delivery Date:</strong> {shipment.scheduledDeliveryDate}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Route:</strong> {shipment.route?.source} → {shipment.route?.destination}
              </Typography>
              <Typography><strong>Placed By:</strong> {shipment.placedBy?.name || "N/A"}</Typography>
              <Typography><strong>Driver:</strong> {shipment.driver?.name || "N/A"}</Typography>
              <Typography><strong>Notes:</strong> {shipment.notes || "N/A"}</Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default TrackShipment;
