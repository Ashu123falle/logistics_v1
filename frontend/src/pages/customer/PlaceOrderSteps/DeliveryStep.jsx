import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";

const DeliveryStep = ({ data, setData, shipmentId, routeId, onPaymentSuccess,routeData }) => {
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const token = localStorage.getItem("token");

  console.log(routeData);
  

 useEffect(() => {
  if (routeData?.distance) {
    const calculatedCost = Math.round(routeData.distance * 100);
    setData((prev) => ({ ...prev, cost: calculatedCost }));
  }
}, [routeData?.distance, setData]);

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePayment = async () => {
    setPaymentProcessing(true);

    try {
      const res = await fetch("http://localhost:8080/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ amount: data.cost }),
      });

      const order = await res.json();

      const options = {
        key: "rzp_test_KcgwyYJnxfRQKf",
        amount: order.amount,
        currency: "INR",
        name: "RouteRover Logistics",
        description: "Shipment Payment",
        order_id: order.razorpayOrderId,
        handler: async function (response) {
          const verifyRes = await fetch("http://localhost:8080/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
              razorpayOrderId: order.razorpayOrderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });

          const result = await verifyRes.text();
          if (verifyRes.ok && result.includes("verified")) {
            const deliveryOrderPayload = {
              shipmentId,
              routeId,
              driverId: null,
              cost: data.cost,
              status: "PAID",
              scheduledPickupDate: data.scheduledPickupDate,
              notes: data.notes || "",
            };

            const orderRes = await fetch("http://localhost:8080/api/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              body: JSON.stringify(deliveryOrderPayload),
            });

            const orderResult = await orderRes.json();
            onPaymentSuccess(orderResult);
          } else {
            alert("❌ Payment verification failed: " + result);
          }
        },
        prefill: {
          name: "Customer",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: { color: "#0d6efd" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("❌ Payment Error: " + err.message);
    } finally {
      setPaymentProcessing(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Payment Summary</Typography>

      <Box sx={{ mb: 3, p: 2, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
        <Typography variant="subtitle1">Total Cost:</Typography>
        <Typography variant="h6" color="primary">₹ {data.cost || 0}</Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Schedule Pickup"
            name="scheduledPickupDate"
            type="datetime-local"
            value={data.scheduledPickupDate || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Notes"
            name="notes"
            value={data.notes || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlePayment}
            disabled={paymentProcessing}
          >
            {paymentProcessing ? "Processing..." : `Pay ₹${data.cost} Now`}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DeliveryStep;
