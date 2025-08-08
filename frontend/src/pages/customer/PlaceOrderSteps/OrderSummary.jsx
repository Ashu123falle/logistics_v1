
import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // correct import for latest version
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ order, onFinish }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const timerRef = useRef(null);

  // Generate PDF invoice
  const generateInvoice = () => {
    const doc = new jsPDF();

    doc.text("MoveBiz Logistics - Invoice", 14, 20);
    autoTable(doc, {

      startY: 30,
      head: [["Field", "Value"]],
      body: [
        ["Order ID", order.id],
        ["Shipment ID", order.shipmentId],
        ["Route ID", order.routeId],
        ["Cost", `₹ ${order.cost}`],

        ["Status", order.status],
        ["Pickup Date", order.scheduledPickupDate],
        ["Notes", order.notes || "-"],
      ],
    });

    doc.save(`Invoice_Order_${order.id}.pdf`);
  };


  // Timer for auto redirect
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          navigate("/customer/dashboard"); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [navigate]);


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


      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        sx={{ mt: 1 }}
      >
        Redirecting to dashboard in {countdown} seconds...
      </Typography>


      <Box mt={3}>
        <Button variant="outlined" onClick={generateInvoice} sx={{ mr: 2 }}>
          Download Invoice
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            clearInterval(timerRef.current);
            onFinish();
          }}
        >

          Place Another Order
        </Button>
      </Box>
    </Paper>
  );
};

export default OrderSummary;
