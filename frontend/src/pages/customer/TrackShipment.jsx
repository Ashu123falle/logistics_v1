import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";

const TrackShipment = () => {
  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Track Your Shipment
      </Typography>
      <TextField
        fullWidth
        label="Enter Order ID"
        variant="outlined"
        sx={{ mb: 3 }}
      />
      <Button variant="contained" color="primary">
        Track
      </Button>
    </Box>
  );
};

export default TrackShipment;
