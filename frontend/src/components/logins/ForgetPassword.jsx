import React, { useState } from "react";
import {
  Box, Button, Paper, TextField, Typography,
  Snackbar, Alert, Grid
} from "@mui/material";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await API.post("/auth/send-otp", { email });
      setOtpSent(true);
      setSnackbar({ open: true, message: "OTP sent to your email", severity: "success" });
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: "Failed to send OTP", severity: "error" });
    }
  };

  const handleResetPassword = async () => {
    try {
      await API.post("/auth/reset-password", { email, otp, newPassword });
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

          {otpSent && (
            <>
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
            </>
          )}

          {!otpSent ? (
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSendOtp}>
              Send OTP
            </Button>
          ) : (
            <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }} onClick={handleResetPassword}>
              Reset Password
            </Button>
          )}
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
