import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";

const OrderSummary = ({ order, onFinish }) => {
  const generateInvoice = () => {
    const doc = new jsPDF();

    doc.text("RouteRover Logistics - Invoice", 14, 20);
    doc.autoTable({
      startY: 30,
      head: [["Field", "Value"]],
      body: [
        ["Order ID", order.id],
        ["Shipment ID", order.shipmentId],
        ["Route ID", order.routeId],
        ["Cost", `₹${order.cost}`],
        ["Status", order.status],
        ["Pickup Date", order.scheduledPickupDate],
        ["Notes", order.notes || "-"],
      ],
    });

    doc.save(`Invoice_Order_${order.id}.pdf`);
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        🎉 Order Summary
      </Typography>

      <Typography variant="body1" sx={{ mt: 2 }}>
        <strong>Order ID:</strong> {order.id}
      </Typography>
      <Typography variant="body1">
        <strong>Shipment ID:</strong> {order.shipmentId}
      </Typography>
      <Typography variant="body1">
        <strong>Route ID:</strong> {order.routeId}
      </Typography>
      <Typography variant="body1">
        <strong>Cost:</strong> ₹{order.cost}
      </Typography>
      <Typography variant="body1">
        <strong>Status:</strong> {order.status}
      </Typography>
      <Typography variant="body1">
        <strong>Pickup:</strong> {order.scheduledPickupDate}
      </Typography>

      <Box mt={3}>
        <Button variant="outlined" onClick={generateInvoice} sx={{ mr: 2 }}>
          Download Invoice
        </Button>
        <Button variant="contained" onClick={onFinish}>
          Place Another Order
        </Button>
      </Box>
    </Paper>
  );
};

export default OrderSummary;
