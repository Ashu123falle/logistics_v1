import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  IconButton,
  InputAdornment,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [step, setStep] = useState("register"); // 'register' | 'otp' | 'success'
  const [form, setForm] = useState({});
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleConfirm = () => setShowConfirm((prev) => !prev);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      ...form,
      role: "CUSTOMER",
      status: "ACTIVE",
    };

    try {
      const res = await fetch("http://localhost:8080/api/customer/register-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.text();

      if (res.ok) {
        setStep("otp");
      } else {
        setError(result || "Registration failed.");
      }
    } catch (err) {
      setError("Server error during registration.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/customer/verify-customer-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, otp }),
      });

      const result = await res.text();

      if (res.ok) {
        setStep("success");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(result || "OTP verification failed.");
      }
    } catch (err) {
      setError("Server error during OTP verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-side">
        <Paper elevation={6} sx={{ p: 4, width: "100%", maxWidth: 460 }}>
          {step === "register" && (
            <>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Create Account
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Join our logistics platform and get started today!
              </Typography>

              <Box component="form" mt={3} onSubmit={handleRegister} noValidate>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <TextField name="firstName" label="First Name" fullWidth required onChange={handleChange} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name="lastName" label="Last Name" fullWidth required onChange={handleChange} />
                  </Grid>
                </Grid>

                <TextField name="username" label="Username" fullWidth required margin="normal" onChange={handleChange} />
                <TextField name="email" label="Email" type="email" fullWidth required margin="normal" onChange={handleChange} />

                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  required
                  margin="normal"
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Confirm Password"
                  type={showConfirm ? "text" : "password"}
                  fullWidth
                  required
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleToggleConfirm}>
                          {showConfirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField name="phoneNumber" label="Phone Number" fullWidth required margin="normal" onChange={handleChange} />
                <TextField name="companyName" label="Company Name" fullWidth required margin="normal" onChange={handleChange} />
                <TextField name="gstNumber" label="GST Number" fullWidth required margin="normal" onChange={handleChange} />
                <TextField name="panNumber" label="PAN Number" fullWidth required margin="normal" onChange={handleChange} />
                <TextField name="industryType" label="Industry Type" fullWidth required margin="normal" onChange={handleChange} />
                <TextField name="companyAddress" label="Company Address" fullWidth required margin="normal" onChange={handleChange} />
                <TextField name="contactPersonName" label="Contact Person Name" fullWidth required margin="normal" onChange={handleChange} />
                <TextField name="contactPersonPhone" label="Contact Person Phone" fullWidth required margin="normal" onChange={handleChange} />
                <TextField name="companyEmail" label="Company Email" type="email" fullWidth required margin="normal" onChange={handleChange} />

                {error && (
                  <Typography color="error" align="center" mt={1}>
                    {error}
                  </Typography>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  size="large"
                  sx={{ mt: 2, borderRadius: 2 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
                </Button>
              </Box>
            </>
          )}

          {step === "otp" && (
            <>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Verify OTP
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                A verification code has been sent to your email.
              </Typography>

              <Box component="form" mt={3} onSubmit={handleVerifyOtp}>
                <TextField
                  label="Email"
                  value={form.email}
                  fullWidth
                  disabled
                  margin="normal"
                />
                <TextField
                  label="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                />
                {error && (
                  <Typography color="error" align="center" mt={1}>
                    {error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 2, borderRadius: 2 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Verify OTP"}
                </Button>
              </Box>
            </>
          )}

          {step === "success" && (
            <Box textAlign="center" mt={3}>
              <Typography variant="h5" color="success.main" gutterBottom>
                🎉 Registration Successful!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Redirecting to login...
              </Typography>
            </Box>
          )}
        </Paper>
      </div>

      <div className="signup-image-side" />
    </div>
  );
};

export default Signup;
