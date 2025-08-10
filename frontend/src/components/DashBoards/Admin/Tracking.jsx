import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import  API  from "../../../services/api";


export default function Tracking({ initialOrderId = "" }) {
  const [orderId, setOrderId] = useState(initialOrderId);
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  const intervalRef = useRef(null);

  const fetchShipment = async (id) => {
    if (!id) {
      setError("Please provide a valid order ID.");
      setShipment(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await API.get(`/delivery-orders/${id}`);
      setShipment(response.data);
    } catch (err) {
      console.error("Error fetching shipment:", err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.statusText ||
        "Failed to fetch shipment data";
      setError(msg);
      setShipment(null);
    } finally {
      setLoading(false);
    }
  };

  const startPolling = () => {
    if (!orderId) {
      setError("Please enter an order ID to start tracking.");
      return;
    }
    fetchShipment(orderId);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      fetchShipment(orderId);
    }, 1000);

    setIsTracking(true);
    setError("");
  };

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsTracking(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (initialOrderId) {
      setOrderId(initialOrderId);
    }
  }, [initialOrderId]);

  return (
    <Paper sx={{ p: 3, maxWidth: 820, margin: "auto" }}>
      <Typography variant="h6" mb={2}>
        Track Delivery Order
      </Typography>

      {/*  container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          alignItems: { xs: "stretch", sm: "center" },
          mb: 2,
        }}
      >
        <TextField
          fullWidth
          label="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value.trim())}
          size="small"
        />

        <Button
          variant="contained"
          onClick={startPolling}
          disabled={isTracking || !orderId}
          sx={{ flexShrink: 0 }}
        >
          Start Tracking
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={stopPolling}
          disabled={!isTracking}
          sx={{ flexShrink: 0 }}
        >
          Stop
        </Button>

        <Button
          variant="text"
          onClick={() => {
            stopPolling();
            setShipment(null);
            setError("");
            setOrderId("");
          }}
          sx={{ flexShrink: 0 }}
        >
          Clear
        </Button>
      </Box>

      {loading && (
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <CircularProgress size={20} />
          <Typography variant="body2">Fetching shipment...</Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && shipment && (
        <Box>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            Delivery Order #{shipment.id}
          </Typography>

          <Typography variant="body2">
            <strong>Status:</strong> {shipment.status || "N/A"}
          </Typography>

          <Typography variant="body2">
            <strong>Pickup:</strong>{" "}
            {shipment.scheduledPickupDate
              ? new Date(shipment.scheduledPickupDate).toLocaleString()
              : "N/A"}
          </Typography>

          <Typography variant="body2">
            <strong>Delivery:</strong>{" "}
            {shipment.scheduledDeliveredDate
              ? new Date(shipment.scheduledDeliveredDate).toLocaleString()
              : "N/A"}
          </Typography>

          <Typography variant="body2">
            <strong>Driver ID:</strong> {shipment.driverId ?? "Unassigned"}
          </Typography>

          <Typography variant="body2">
            <strong>Cost:</strong> {shipment.cost ?? "N/A"}
          </Typography>

          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Notes:</strong> {shipment.notes ?? "-"}
          </Typography>
        </Box>
      )}

      {!loading && !shipment && !error && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Enter an Order ID and click <strong>Start Tracking</strong> to poll
          the delivery order status every second.
        </Typography>
      )}
    </Paper>
  );
}
