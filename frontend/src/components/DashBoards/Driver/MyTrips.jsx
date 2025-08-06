import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const trips = [
  {
    id: "TX001",
    origin: "Mumbai",
    destination: "Pune",
    status: "In Transit",
    eta: "2 hrs",
  },
  {
    id: "TX002",
    origin: "Pune",
    destination: "Bangalore",
    status: "Completed",
    eta: "Delivered",
  },
];

export default function MyTrips() {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        My Trips
      </Typography>

      <Grid container spacing={3}>
        {trips.map((trip) => (
          <Grid item xs={12} md={6} key={trip.id}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                px: 1,
                py: 1,
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.01)" },
              }}
            >
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <DirectionsCarIcon color="primary" />
                  <Typography fontWeight="medium" color="text.secondary">
                    Trip ID: {trip.id}
                  </Typography>
                </Stack>

                <Typography variant="h6" gutterBottom>
                  {trip.origin} <ArrowForwardIcon fontSize="small" />{" "}
                  {trip.destination}
                </Typography>

                <Chip
                  label={trip.status}
                  color={
                    trip.status === "Completed"
                      ? "success"
                      : trip.status === "In Transit"
                      ? "warning"
                      : "info"
                  }
                  size="small"
                  sx={{ mb: 1 }}
                />

                <Stack direction="row" alignItems="center" spacing={1}>
                  <AccessTimeIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    ETA: {trip.eta}
                  </Typography>
                </Stack>
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                  variant="outlined"
                  size="small"
                  href={`/driver/routes/${trip.origin.toLowerCase()}-${trip.destination.toLowerCase()}`}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
