import { Typography, TextField, Button, Box } from '@mui/material';

const Support = () => {
  return (
    <Box>
      <Typography variant="h4">🛠 Support / Contact Us</Typography>
      <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Subject" required fullWidth />
        <TextField label="Message" required fullWidth multiline rows={4} />
        <Button variant="contained">Submit</Button>
      </Box>
    </Box>
  );
};

export default Support;