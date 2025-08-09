// src/pages/auth/ForgetPassword.jsx
import React, { useState } from "react";
import {
  Box, Button, Paper, TextField, Typography,
  Snackbar, Alert, Grid
} from "@mui/material";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await API.post("/auth/forgot-password", { email:email });
      
      setSnackbar({ open: true, message: "OTP sent to your email", severity: "success" });
      setTimeout(() => {
        navigate("/verify-otp", { state: { email } });
      }, 1000);
    }
    catch (err) {
  if (err.response && err.response.data) {
      const errMsg = err.response.data.message || JSON.stringify(err.response.data);
      setSnackbar({ open: true, message: "Failed to send OTP", severity: "error" });
    } else {
    setSnackbar({ open: true, message: "Server Error", severity: "error" });
    
  }
}
    
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
      <Grid item xs={11} sm={6} md={4}>
        <Paper elevation={6} sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Forgot Password
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Enter your registered email to receive an OTP.
          </Typography>

          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSendOtp}
          >
            Send OTP
          </Button>
        </Paper>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default ForgetPassword;
