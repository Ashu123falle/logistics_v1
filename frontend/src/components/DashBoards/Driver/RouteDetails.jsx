import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Divider } from "@mui/material";

export default function RouteDetails() {
  const { routeName } = useParams();

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Route: {routeName.replace(/-/g, " ").toUpperCase()}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="subtitle1">Pickup: 10:00 AM</Typography>
        <Typography variant="subtitle1">Delivery: 5:00 PM</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1">Live tracking, documents, and trip status update features will go here.</Typography>
      </Paper>
    </Box>
  );
}
