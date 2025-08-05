import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
import { jwtDecode } from "jwt-decode"; // ✅ CORRECT

const token = localStorage.getItem("token");
const decoded = token ? jwtDecode(token) : null;
const currentUser = decoded || {};

// if (!token) {
//   alert("Please log in again");
//   window.location.href = "/login";
// }

import ShipmentStep from "../PlaceOrderSteps/ShipmentStep";
import RouteStep from "../PlaceOrderSteps/RouteStep";
import DeliveryStep from "../PlaceOrderSteps/DeliveryStep";


// import axios from "axios";

const steps = ["Shipment Details", "Route Selection", "Delivery Details"];

const PlaceOrder = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [shipmentData, setShipmentData] = useState({});
  const [routeData, setRouteData] = useState({});
  const [deliveryData, setDeliveryData] = useState({});

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      try {
        const shipmentRes = await axios.post("/api/shipments", shipmentData);
        const shipmentId = shipmentRes.data.id;

        const routeRes = await axios.post("/api/routes", routeData);
        const routeId = routeRes.data.id;

        const payload = {
          ...deliveryData,
          shipmentId,
          routeId,
        };

        await axios.post("/api/orders", payload);

        alert("Order placed successfully!");
        setActiveStep(0);
        setShipmentData({});
        setRouteData({});
        setDeliveryData({});
      } catch (err) {
        alert("Failed to place order.");
        console.error(err);
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Box sx={{ width: "100%", p: 4 }}>
      <Typography variant="h5" mb={2}>
        Place a New Order
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={4}>
        {activeStep === 0 && (
          <ShipmentStep data={shipmentData} setData={setShipmentData} />
        )}
        {activeStep === 1 && (
          <RouteStep data={routeData} setData={setRouteData} />
        )}
        {activeStep === 2 && (
           <DeliveryStep data={deliveryData} setData={setDeliveryData} customerId={currentUser.customerId} />
        )}

        <Box mt={4} display="flex" justifyContent="space-between">
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PlaceOrder;
