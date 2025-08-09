import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
import ShipmentStep from "./PlaceOrderSteps/ShipmentStep";
import RouteStep from "./PlaceOrderSteps/RouteStep";
import DeliveryStep from "./PlaceOrderSteps/DeliveryStep";
import OrderSummary from "./PlaceOrderSteps/OrderSummary";
import { useAuth } from "../../context/AuthContext"


const steps = ["Shipment Details", "Route Selection", "Delivery Details", "Order Summary"];

const PlaceOrder = () => {
  const { auth } =useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [shipmentData, setShipmentData] = useState({});
  const [routeData, setRouteData] = useState({});
  const [deliveryData, setDeliveryData] = useState({});
  const [shipmentId, setShipmentId] = useState(null);
  const [routeId, setRouteId] = useState(null);
  const [finalOrder, setFinalOrder] = useState(null);

  const handleNext = async () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const resetForm = () => {
    setShipmentData({});
    setRouteData({});
    setDeliveryData({});
    setShipmentId(null);
    setRouteId(null);
    setFinalOrder(null);
    setActiveStep(0);
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
          <ShipmentStep data={shipmentData} setData={setShipmentData} onContinue={(id) => {
            setShipmentId(id);
            handleNext();
          }} />
        )}
        {activeStep === 1 && (
          <RouteStep data={routeData} setData={setRouteData} onContinue={(route) => {
            setRouteId(route.id);
            handleNext();
          }} />
        )}
        {activeStep === 2 && (
          <DeliveryStep
            data={deliveryData}
            setData={setDeliveryData}
            shipmentId={shipmentId}
            shipmentData={shipmentData}

            routeId={routeId}
            customerId={auth.userId}
            routeData={routeData}
            onPaymentSuccess={(order) => {
              setFinalOrder(order);
              handleNext();
            }}
          />
        )}
        {activeStep === 3 && finalOrder && (
          <OrderSummary order={finalOrder} onFinish={resetForm} />
        )}

        {activeStep < 3 && (
          <Box mt={4} display="flex" justifyContent="space-between">
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PlaceOrder;
