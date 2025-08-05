import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./Signup.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleConfirm = () => setShowConfirm((prev) => !prev);

  return (
    <div className="signup-container">
      {/* LEFT: Form Side */}
      <div className="signup-form-side">
        <Paper elevation={6} sx={{ p: 4, width: "100%", maxWidth: 420 }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Join our logistics platform and get started today!
          </Typography>

          <Box component="form" mt={3} noValidate autoComplete="off">
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm Password"
              type={showConfirm ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggleConfirm} edge="end">
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 2, borderRadius: 2 }}
              type="submit"
            >
              Sign Up
            </Button>
          </Box>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3, color: "text.secondary" }}
          >
            Already have an account?{" "}
            <a
              href="/login"
              style={{ textDecoration: "none", color: "#1976d2" }}
            >
              Sign In
            </a>
          </Typography>
        </Paper>
      </div>

      {/* RIGHT: Image Side */}
      <div className="signup-image-side" />
    </div>
  );
};

export default Signup;
