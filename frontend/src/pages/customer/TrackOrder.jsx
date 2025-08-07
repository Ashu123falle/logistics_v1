import { Typography, TextField, Button, Box } from '@mui/material';

const TrackOrder = () => {
  return (
    <Box>
      <Typography variant="h4">📍 Track Your Orders</Typography>
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <TextField label="Tracking ID" required />
        <Button variant="outlined">Track</Button>
      </Box>
    </Box>
  );
};

export default TrackOrder;