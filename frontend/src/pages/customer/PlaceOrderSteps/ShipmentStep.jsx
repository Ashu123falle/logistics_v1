import React, { useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Grid,
  Button,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import { API } from "../../../utilities/api";
import { useAuth } from "../../../context/AuthContext";

const ShipmentStep = ({ data, setData, onContinue }) => {
  const { auth } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const customerId = auth.userId;

  const validate = () => {
    const errors = {};

    if (!data.type || data.type.trim() === "") {
      errors.type = "Type is required";
    } else if (data.type.trim().length < 3) {
      errors.type = "Type must be at least 3 characters";
    }

    if (!data.name || data.name.trim() === "") {
      errors.name = "Name is required";
    } else if (data.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    if (!data.description || data.description.trim() === "") {
      errors.description = "Description is required";
    } else if (data.description.trim().length < 3) {
      errors.description = "Description must be at least 3 characters";
    }

    if (!data.dimensions || data.dimensions.trim() === "") {
      errors.dimensions = "Dimensions are required";
    } else if (data.dimensions.trim().length < 3) {
      errors.dimensions = "Dimensions must be at least 3 characters";
    }

    if (data.value === undefined || data.value === null || data.value === "") {
      errors.value = "Value is required";
    } else if (Number(data.value) <= 0) {
      errors.value = "Value must be a positive number";
    }

    if (data.weight === undefined || data.weight === null || data.weight === "") {
      errors.weight = "Weight is required";
    } else if (Number(data.weight) <= 0) {
      errors.weight = "Weight must be a positive number";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      setError("");

      const payload = {
        ...data,
        customerId,
      };

      const response = await API.post("/shipments", payload);

      const savedShipment = response.data;

      setData((prev) => ({
        ...prev,
        ...savedShipment,
      }));

      setSuccess(true);

      if (onContinue) onContinue(savedShipment.id);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save shipment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 4, sm: 6 },
        width: "90vw",
        maxWidth: "1200px",
        margin: "auto",
        borderRadius: 3,
        backgroundColor: "#fafafa",
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="700"
        gutterBottom
        sx={{ mb: 4, color: "#333" }}
      >
        Shipment Information
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Type"
            name="type"
            fullWidth
            placeholder="e.g. Electronics"
            value={data.type || ""}
            onChange={handleChange}
            error={!!fieldErrors.type}
            helperText={fieldErrors.type}
            size="medium"
            sx={{ borderRadius: 1 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            placeholder="e.g. Laptop"
            value={data.name || ""}
            onChange={handleChange}
            error={!!fieldErrors.name}
            helperText={fieldErrors.name}
            size="medium"
            sx={{ borderRadius: 1 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            minRows={3}
            placeholder="Brief description of shipment"
            value={data.description || ""}
            onChange={handleChange}
            error={!!fieldErrors.description}
            helperText={fieldErrors.description}
            size="medium"
            sx={{ borderRadius: 1 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Value (₹)"
            name="value"
            type="number"
            fullWidth
            placeholder="e.g. 10000"
            value={data.value || ""}
            onChange={handleChange}
            error={!!fieldErrors.value}
            helperText={fieldErrors.value}
            size="medium"
            sx={{ borderRadius: 1 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Dimensions"
            name="dimensions"
            fullWidth
            placeholder="e.g. 30x20x15"
            value={data.dimensions || ""}
            onChange={handleChange}
            error={!!fieldErrors.dimensions}
            helperText={fieldErrors.dimensions}
            size="medium"
            sx={{ borderRadius: 1 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Weight (ton)"
            name="weight"
            type="number"
            fullWidth
            placeholder="e.g. 5"
            value={data.weight || ""}
            onChange={handleChange}
            error={!!fieldErrors.weight}
            helperText={fieldErrors.weight}
            size="medium"
            sx={{ borderRadius: 1 }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 3,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            size="large"
            sx={{
              borderRadius: 3,
              px: 6,
              textTransform: "none",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(34, 197, 94, 0.6)",
              "&:hover": {
                backgroundColor: "#16a34a",
                boxShadow: "0 6px 18px rgba(34, 197, 94, 0.8)",
              },
            }}
          >
            {loading ? "Saving..." : "Save & Next"}
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar Alerts */}
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Shipment saved successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ShipmentStep;
