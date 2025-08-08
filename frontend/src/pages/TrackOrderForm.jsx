import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
  AppBar,
  Toolbar,
  Container,
  Stepper,
  Step,
  StepLabel,
  Grid,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/system";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { API } from "../utilities/api";




const HeaderAppBar = () => (
  <AppBar
    position="static"
    sx={{
      bgcolor: "#1d1819",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      borderBottom: "2px solid #ff0000",
    }}
  >
    <Toolbar>
      <LocalShippingIcon sx={{ mr: 2, color: "#ff0000" }} />
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
        MoveBiz
      </Typography>
    </Toolbar>
  </AppBar>
);
const Footer = () => (
  <Box
    component="footer"
    sx={{
      bgcolor: "#1d1819",
      color: "rgba(255, 255, 255, 0.7)",
      py: 3,
      textAlign: "center",
    }}
  >
    <Container maxWidth="md">
      <Typography variant="body2">
        © {new Date().getFullYear()} MoveBiz. All rights reserved.
      </Typography>
    </Container>
  </Box>
);

export default function TrackOrderForm() {
  const [orderId, setOrderId] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const steps = ["PENDING", "CONFIRMED", "RECEIVED", "IN_TRANSIT", "DELIVERED"];

  
  const getStepIndex = (status) => {
    if (!status) return -1;
    return steps.findIndex(
      (step) => step.toLowerCase() === status.toLowerCase()
    );
  };
  

  const handleTrack = async () => {
    
    if (!orderId.trim()) {
      setSnackbar({
        open: true,
        message: "Please enter a valid Order ID.",
        severity: "error",
      });
      return;
    }

    setLoading(true);
    setShipment(null); 
    
    try {
    
      const response = await API.get(`/customer/track/${orderId.trim()}`);
      
      if (response.data) {
      
        setShipment(response.data);
        setSnackbar({
          open: true,
          message: `Tracking info found for Order ID: ${orderId.trim()}`,
          severity: "success",
        });
      } else {
        
        setShipment(null);
        setSnackbar({
          open: true,
          message: "Shipment not found. Please check the Order ID.",
          severity: "error",
        });
      }
    } catch (err) {
      console.error("Failed to fetch tracking data:", err);
      setShipment(null);
      setSnackbar({
        open: true,
        message: "Failed to fetch tracking data. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
      setOrderId(""); 
    }
  };

  return (
    <>
      <HeaderAppBar />
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper
          elevation={4}
          sx={{
            borderRadius: 2,
            p: 4,
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Track your order
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Enter your Order ID to get the latest shipment status.
          </Typography>
          <TextField
            label="Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ mb: 3 }}
          />
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleTrack}
            disabled={loading}
            sx={{
              bgcolor: "#ff0000",
              "&:hover": { bgcolor: "#cc0000" },
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            {loading ? "Tracking..." : "Track Order"}
          </Button>
          {shipment && (
            <Box sx={{ mt: 4 }}>
              {/* Stepper */}
              <Stepper
                activeStep={getStepIndex(shipment.status)}
                alternativeLabel
                sx={{ mb: 4 }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {/* Order Details */}
              <Typography variant="h6" gutterBottom>
                Order Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <strong>Order ID:</strong> {shipment.id}
                  </Typography>
                  <Typography>
                    <strong>Status:</strong> {shipment.status}
                  </Typography>
                  <Typography>
                    <strong>Cost:</strong> ₹{shipment.cost}
                  </Typography>
                  <Typography>
                    <strong>Pickup Date:</strong>{" "}
                    {shipment.scheduledPickupDate}
                  </Typography>
                  <Typography>
                    <strong>Delivery Date:</strong>{" "}
                    {shipment.scheduledDeliveryDate}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <strong>Route:</strong> {shipment.route?.source} →{" "}
                    {shipment.route?.destination}
                  </Typography>
                  <Typography>
                    <strong>Placed By:</strong>{" "}
                    {shipment.placedBy?.name || "N/A"}
                  </Typography>
                  <Typography>
                    <strong>Driver:</strong> {shipment.driver?.name || "N/A"}
                  </Typography>
                  <Typography>
                    <strong>Notes:</strong> {shipment.notes || "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Footer />
    </>
  );
}
