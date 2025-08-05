import React from "react";
import {
  TextField,
  Box,
  Typography,
  Grid,
} from "@mui/material";

const ShipmentStep = ({ data, setData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
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
        {/* <Grid item xs={6}>
          <TextField
            label="Customer ID"
            name="customerId"
            type="number"
            fullWidth
            value={data.customerId || ""}
            onChange={handleChange}
          />
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default ShipmentStep;
