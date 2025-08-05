import React, { useEffect } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";

// ✅ No need to receive customerId from props anymore
const DeliveryStep = ({ data, setData }) => {
  // ✅ Extract customerId from JWT token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      const customerId = decoded.userId;

      if (customerId) {
        setData(prev => ({
          ...prev,
          customerId: customerId  // ✅ Injected into data silently
        }));
      }
    }
  }, [setData]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Delivery Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Driver ID"
            name="driverId"
            value={data.driverId || ""}
            onChange={handleChange}
          >
            <MenuItem value={1}>Driver 1</MenuItem>
            <MenuItem value={2}>Driver 2</MenuItem>
            <MenuItem value={3}>Driver 3</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Cost"
            name="cost"
            type="number"
            value={data.cost || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Status"
            name="status"
            value={data.status || ""}
            onChange={handleChange}
            placeholder="Scheduled / Pending / Confirmed"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Scheduled Pickup Date"
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
            multiline
            rows={3}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default DeliveryStep;
