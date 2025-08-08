import React, { useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Grid,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { API } from "../../../utilities/api";
import { useAuth } from "../../../context/AuthContext";


// const ShipmentStep = ({ data, setData, onNext }) => {
const ShipmentStep = ({ data, setData, onContinue }) => {

  const { auth } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const customerId = auth.userId;
 console.log(auth.role);
 
 const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        ...data,
        customerId,
      };
      console.log("Payload being sent to backend:", payload);

      const response = await API.post("/shipments", payload);

      const savedShipment = response.data;
      console.log("Saved shipment:", savedShipment);

      setData((prev) => ({
        ...prev,
        ...savedShipment,
      }));

     

      setSuccess(true);

      if (onContinue) onContinue(savedShipment.id);
    } catch (err) {
      console.error("Shipment save failed:", err);
      setError(err.response?.data?.message || "Failed to save shipment.");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Shipment Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Type"
            name="type"
            fullWidth
            value={data.type || ""}
            onChange={handleChange}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={data.name || ""}
            onChange={handleChange}
            />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            value={data.description || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Value (₹)"
            name="value"
            type="number"
            fullWidth
            value={data.value || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Dimensions"
            name="dimensions"
            fullWidth
            value={data.dimensions || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Weight (kg)"
            name="weight"
            type="number"
            fullWidth
            value={data.weight || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save & Next"}
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar Alerts */}
      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError("")}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert severity="success">Shipment saved successfully!</Alert>
      </Snackbar>
    </Box>
  );
};

export default ShipmentStep;
