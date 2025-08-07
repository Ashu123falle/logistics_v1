import React, { useEffect, useState } from "react";
import { Snackbar, Alert, Typography, Box, CircularProgress } from "@mui/material";
import DeliveryCard from "./DeliveryCard";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const statusPriority = {
  CONFIRMED: 1,
  IN_TRANSIT: 2,
  DELIVERED: 3,
  FAILED: 4,
  CANCELLED: 5,
};

const formatStatusLabel = (status) => {
  if (!status) return "";
  return status.replace("_", " ").toLowerCase();
};

const DriverDeliveries = () => {
  const { auth } = useAuth();
  const driverId = auth?.userId;

  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const res = await API.get(`/delivery-orders/driver/${driverId}`);
        const backendData = res.data;
        console.log(backendData);
        
        const formatted = backendData.map((order) => ({
          deliveryId: order.id,
          address: order.routeId, // Optional enhancement: fetch real route
          dateAssigned: order.scheduledPickupDate?.split("T")[0],
          eta: order.scheduledDeliveryDate?.split("T")[0],
          status: order.status,
          statusLabel: formatStatusLabel(order.status),
          routeId: order.routeId,
          placedBy: order.customerId,
          shipmentId:order.shipmentId,
        }));

        // Sort deliveries by status priority
        const sorted = formatted.sort((a, b) => {
          const aPriority = statusPriority[a.status] || 99;
          const bPriority = statusPriority[b.status] || 99;
          return aPriority - bPriority;
        });

        setDeliveries(sorted);
      } catch (err) {
        console.error("Failed to fetch deliveries", err);
      } finally {
        setLoading(false);
      }
    };

    if (driverId) fetchDeliveries();
  }, [driverId]);

  const handleStatusChange = async (id, newStatus) => {
  const prevDeliveries = [...deliveries]; // backup for rollback
  

  try {
    // Optimistically update UI
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

    // Backend call
    await API.patch(`/delivery-orders/${id}/status`, {
      status: newStatus,
    });

    setSnackbarMsg(`✅ Status updated for Delivery ID ${id}`);
    setSnackbarOpen(true);
  } catch (error) {
    console.error("❌ Failed to update status:", error);

    // Rollback on failure
    setDeliveries(prevDeliveries);
    setSnackbarMsg(`❌ Failed to update status for Delivery ID ${id}`);
    setSnackbarOpen(true);
  }
};


  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        My Assignments
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : deliveries.length === 0 ? (
        <Typography>No deliveries assigned.</Typography>
      ) : (
        deliveries.map((delivery) => (
          
          <Box key={delivery.deliveryId} mb={2}>
            <DeliveryCard
              delivery={delivery}
              onStatusChange={handleStatusChange}
            />
          </Box>
        ))
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DriverDeliveries;
