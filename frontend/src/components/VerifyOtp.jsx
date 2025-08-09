// src/pages/auth/VerifyOtp.jsx
import React, { useState } from "react";
import {
  Grid, Paper, Typography, TextField, Button, Snackbar, Alert
} from "@mui/material";
import API from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleResetPassword = async () => {
    try {
      await API.post("/auth/verify-otp", { email, otp, newPassword });
      setSnackbar({ open: true, message: "Password updated successfully", severity: "success" });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: "OTP verification failed", severity: "error" });
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
      <Grid item xs={11} sm={6} md={4}>
        <Paper elevation={6} sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Verify OTP
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Enter the OTP sent to your email and set a new password.
          </Typography>

          <TextField
            label="Enter OTP"
            fullWidth
            margin="normal"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleResetPassword}
          >
            Reset Password
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

export default VerifyOtp;
