import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";
import API  from "../../../services/api"; 
import { useAuth } from "../../../context/AuthContext"
const DeliveryStep = ({
  data,
  setData,
  shipmentId,
  shipmentData,
  routeId,
  onPaymentSuccess,
  routeData,
}) => {
  const { auth } = useAuth();
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [customer,setCustomer] = useState(null);
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
  let paymentId = null;

  try {
    const token = localStorage.getItem("token");

    // 1. Fetch customer details
    const { data: fetchedCustomer } = await API.get(`/customer/${auth.userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCustomer(fetchedCustomer);

    // 2. Create Razorpay order
    const { data: order } = await API.post("/payment/create", {
      amount: data.cost,
    });

    // 3. Razorpay config
    const options = {
      key: "rzp_test_KcgwyYJnxfRQKf",
      amount: order.amount,
      currency: "INR",
      name: "MoveBiz Logistics",
      description: "Shipment Payment",
      order_id: order.razorpayOrderId,

      handler: async function (response) {
        try {
          // 4. Verify payment
          const { data: result } = await API.post("/payment/verify", {
            razorpay_order_id: order.razorpayOrderId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            customerId: auth.userId,
          });

          if (result.includes("verified")) {
            alert("✅ Verification successful! Payment received.");

            const idMatch = result.match(/id:\s*(\d+)/);
            paymentId = idMatch ? idMatch[1] : null;
          } else {
            alert("❌ Payment verification failed: " + result);
          }
        } catch (verifyErr) {
          alert("❌ Error during payment verification: " + verifyErr.message);
        } finally {
          // 5. Create delivery order regardless of payment verification
          await createDeliveryOrder(paymentId);
        }
      },

      prefill: {
        name: fetchedCustomer?.userId || "Customer",
        email: fetchedCustomer?.email || "test@example.com",
        contact: fetchedCustomer?.phoneNumber || "9999999999",
      },
      theme: { color: "#0db40dff" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    alert("❌ Payment Error: " + err.message);

    // 6. Create delivery order anyway (no payment)
    await createDeliveryOrder(null);
  } finally {
    setPaymentProcessing(false);
  }
};
const createDeliveryOrder = async (paymentId) => {
  const deliveryOrderPayload = {
    shipmentId,
    routeId,
    driverId: null,
    paymentId, // either actual ID or null
    cost: data.cost,
    status: "PENDING",
    scheduledPickupDate: data.scheduledPickupDate,
    scheduledDeliveredDate: data.scheduledDeliveredDate,
    notes: data.notes || "",
  };

  try {
    const { data: orderResult } = await API.post("/delivery-orders/create", deliveryOrderPayload);
    console.log("📦 Delivery Order Created:", orderResult);

    // Optional: update payment with delivery order
    // if (paymentId) {
    //   await API.put(`/payment/${auth.userId}`, {
    //     deliveryOrderId: orderResult.id,
    //   });
    // }

    onPaymentSuccess(orderResult);
  } catch (err) {
    alert("❌ Failed to create delivery order: " + err.message);
  }
};




  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Payment Summary
      </Typography>

      <Box
        sx={{ mb: 3, p: 2, backgroundColor: "#f9f9f9", borderRadius: 2 }}
      >
        <Typography variant="subtitle1">Total Cost:</Typography>
        <Typography variant="h6" color="primary">
          ₹ {data.cost || 0}
        </Typography>
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
