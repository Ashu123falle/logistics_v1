import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";

const Support = () => {
  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Raise a Support Ticket
      </Typography>
      <TextField
        multiline
        rows={5}
        fullWidth
        label="Describe your issue"
        variant="outlined"
        sx={{ mb: 3 }}
      />
      <Button variant="contained" color="success">
        Submit Ticket
      </Button>
    </Box>
  );
};

export default Support;
