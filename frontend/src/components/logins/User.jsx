import React, { useState } from 'react';
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Link,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './User.css';

const User = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ emailOrPhone, password, rememberMe });
  };

  return (
    <Grid container className="login-layout">
      {/* LEFT - Image */}
      <Grid item md={6} className="login-image" />

      {/* RIGHT - Login Form */}
      <Grid
        item
        xs={12}
        md={6}
        container
        justifyContent="center"
        alignItems="center"
        className="form-wrapper"
      >
        <Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: 450 }}>
          <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
            Welcome back!
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary">
            Logistics Dashboard
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" mb={3}>
            Login to manage and track logistics
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email or Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              required
            />

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Grid container alignItems="center" justifyContent="space-between" mt={1} mb={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label="Remember me"
              />
              <Link href="#" variant="body2" underline="hover">
                Forgot password?
              </Link>
            </Grid>

            <Button type="submit" fullWidth variant="contained" color="success" sx={{ mb: 2 }}>
              Login
            </Button>

            <Typography variant="body2" align="center" color="text.secondary">
              Don’t have an account?{' '}
              <Link href="#" color="success" fontWeight={600} underline="hover">
                Get Started
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default User;
