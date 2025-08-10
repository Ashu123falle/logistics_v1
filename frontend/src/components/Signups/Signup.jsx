import React, { useState, useEffect } from "react";

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
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {

  useEffect(() => {
  const savedForm = localStorage.getItem("signupFormData");
  if (savedForm) {
    setForm(JSON.parse(savedForm));
  }
}, [])

  // const baseURL = "http://localhost:8080/api/customer";
  const baseURL = "https://logistics-v1.onrender.com/api/customer";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [step, setStep] = useState("register");
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleConfirm = () => setShowConfirm((prev) => !prev);
const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({ ...prev, [name]: value }));
  
  // Run validation for that field
  setErrors((prev) => ({
    ...prev,
    [name]: validateField(name, value),
  }));
};

const validateForm = () => {
  const newErrors = {};
  Object.keys(form).forEach((key) => {
    const msg = validateField(key, form[key]);
    if (msg) newErrors[key] = msg;
  });
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const validateField = (name, value) => {
    let msg = "";
    if (!value) msg = "Required";

    switch (name) {
      case "email":
      case "companyEmail":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          msg = "Invalid email";
        break;
      case "phoneNumber":
      case "contactPersonPhone":
        if (value && !/^\d{10}$/.test(value)) msg = "Must be 10 digits";
        break;
      case "gstNumber":
        if (value && !/^[A-Z0-9]{15}$/i.test(value))
          msg = "Invalid GST (15 chars)";
        break;
      case "panNumber":
        if (value && !/^[A-Z0-9]{10}$/i.test(value))
          msg = "Invalid PAN (10 chars)";
        break;
      case "confirmPassword":
        if (value !== form.password) msg = "Passwords do not match";
        break;
      default:
        break;
    }
    return msg;
  };

  const handleRegister = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setError("");
  setLoading(true);

  const payload = { ...form, role: "CUSTOMER", status: "ACTIVE" };
    localStorage.setItem("signupFormData", JSON.stringify(payload));

  try {
    const res = await axios.post(
      `${baseURL}/register-customer`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(res.data);
    
    if (res.status === 200) {
      setStep("otp");
    } else {
      setError(res.data || "Registration failed.");
    }
  } catch (err) {
  if (err.response && err.response.data) {
    const errMsg = err.response.data.message || JSON.stringify(err.response.data);
    setError(errMsg);
  } else {
    setError("Server error during registration.");
  }
}finally{
    setLoading(false);

}

};


const handleVerifyOtp = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await axios.post(
      `${baseURL}/verify-customer-otp`,
      { email: form.email, otp },
      { headers: { "Content-Type": "application/json" } }
    );

    if (res.status === 200) {
      setStep("success");
        localStorage.removeItem("signupFormData");

      setTimeout(() => navigate("/login"), 2000);
    } else {
      setError(res.data || "OTP verification failed.");
    }
  } catch (err) {
  if (err.response && err.response.data) {
    const errMsg = err.response.data.message || JSON.stringify(err.response.data);
    setError(errMsg);
  } else {
    setError("Server error during registration.");
  }
}finally{
    setLoading(false);

}
};


  return (
    <div className="signup-container">
      {/* Form Side */}
      <div className="signup-form-side" style={{ flex: "0 0 75%" }}>
        <Paper elevation={6} sx={{ p: 4, width: "100%", maxWidth: 800 }}>
          {step === "register" && (
            <>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Create Account
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Join our logistics platform and get started today!
              </Typography>

              <Box component="form" mt={3} onSubmit={handleRegister} noValidate>
                <Grid container spacing={2}>
                 <Grid item xs={6}>
  <TextField
    name="firstName"
    label="First Name"
    fullWidth
    required
    value={form.firstName || ""}
    onChange={handleChange}
    error={!!errors.firstName}
    helperText={errors.firstName}
  />
</Grid>
<Grid item xs={6}>
  <TextField
    name="lastName"
    label="Last Name"
    fullWidth
    required
    value={form.lastName || ""}
    onChange={handleChange}
    error={!!errors.lastName}
    helperText={errors.lastName}
  />
</Grid>

<Grid item xs={6}>
  <TextField
    name="username"
    label="Username"
    fullWidth
    required
    value={form.username || ""}
    onChange={handleChange}
    error={!!errors.username}
    helperText={errors.username}
  />
</Grid>
<Grid item xs={6}>
  <TextField
    name="email"
    label="Email"
    type="email"
    fullWidth
    required
    value={form.email || ""}
    onChange={handleChange}
    error={!!errors.email}
    helperText={errors.email}
  />
</Grid>

<Grid item xs={6}>
  <TextField
    name="password"
    label="Password"
    type={showPassword ? "text" : "password"}
    fullWidth
    required
    value={form.password || ""}
    onChange={handleChange}
    error={!!errors.password}
    helperText={errors.password}
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
</Grid>
<Grid item xs={6}>
  <TextField
    name="confirmPassword"
    label="Confirm Password"
    type={showConfirm ? "text" : "password"}
    fullWidth
    required
    value={form.confirmPassword || ""}
    onChange={handleChange}
    error={!!errors.confirmPassword}
    helperText={errors.confirmPassword}
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
</Grid>

<Grid item xs={6}>
  <TextField
    name="phoneNumber"
    label="Phone Number"
    fullWidth
    required
    value={form.phoneNumber || ""}
    onChange={handleChange}
    error={!!errors.phoneNumber}
    helperText={errors.phoneNumber}
  />
</Grid>
<Grid item xs={6}>
  <TextField
    name="companyName"
    label="Company Name"
    fullWidth
    required
    value={form.companyName || ""}
    onChange={handleChange}
    error={!!errors.companyName}
    helperText={errors.companyName}
  />
</Grid>

<Grid item xs={6}>
  <TextField
    name="gstNumber"
    label="GST Number"
    fullWidth
    required
    value={form.gstNumber || ""}
    onChange={handleChange}
    error={!!errors.gstNumber}
    helperText={errors.gstNumber}
  />
</Grid>
<Grid item xs={6}>
  <TextField
    name="panNumber"
    label="PAN Number"
    fullWidth
    required
    value={form.panNumber || ""}
    onChange={handleChange}
    error={!!errors.panNumber}
    helperText={errors.panNumber}
  />
</Grid>

<Grid item xs={6}>
  <TextField
    name="industryType"
    label="Industry Type"
    fullWidth
    required
    value={form.industryType || ""}
    onChange={handleChange}
    error={!!errors.industryType}
    helperText={errors.industryType}
  />
</Grid>
<Grid item xs={6}>
  <TextField
    name="companyAddress"
    label="Company Address"
    fullWidth
    required
    value={form.companyAddress || ""}
    onChange={handleChange}
    error={!!errors.companyAddress}
    helperText={errors.companyAddress}
  />
</Grid>

<Grid item xs={6}>
  <TextField
    name="contactPersonName"
    label="Contact Person Name"
    fullWidth
    required
    value={form.contactPersonName || ""}
    onChange={handleChange}
    error={!!errors.contactPersonName}
    helperText={errors.contactPersonName}
  />
</Grid>
<Grid item xs={6}>
  <TextField
    name="contactPersonPhone"
    label="Contact Person Phone"
    fullWidth
    required
    value={form.contactPersonPhone || ""}
    onChange={handleChange}
    error={!!errors.contactPersonPhone}
    helperText={errors.contactPersonPhone}
  />
</Grid>

<Grid item xs={12}>
  <TextField
    name="companyEmail"
    label="Company Email"
    type="email"
    fullWidth
    required
    value={form.companyEmail || ""}
    onChange={handleChange}
    error={!!errors.companyEmail}
    helperText={errors.companyEmail}
  />
</Grid>

                </Grid>

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
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Register"
                  )}
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
                <TextField label="Email" value={form.email} fullWidth disabled />
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
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Verify OTP"
                  )}
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

      {/* Image Side */}
      <div className="signup-image-side" style={{ flex: "0 0 25%" }} />
    </div>
  );
};

export default Signup;
