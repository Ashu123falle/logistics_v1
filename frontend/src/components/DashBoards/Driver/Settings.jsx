import React, { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Paper,
  Stack,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LockResetIcon from "@mui/icons-material/LockReset";

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    locationSharing: true,
    profileVisible: true,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePasswordChange = () => {
    alert("Redirecting to password reset...");
  };

  const handleLogout = () => {
    alert("You have been logged out.");
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Driver Settings
      </Typography>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Stack spacing={2}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.notifications}
                onChange={() => handleToggle("notifications")}
              />
            }
            label="Enable Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.darkMode}
                onChange={() => handleToggle("darkMode")}
              />
            }
            label="Enable Dark Mode"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.locationSharing}
                onChange={() => handleToggle("locationSharing")}
              />
            }
            label="Share Live Location"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.profileVisible}
                onChange={() => handleToggle("profileVisible")}
              />
            }
            label="Profile Visibility"
          />

          <Divider sx={{ my: 2 }} />

          <Button
            variant="outlined"
            color="primary"
            startIcon={<LockResetIcon />}
            onClick={handlePasswordChange}
          >
            Change Password
          </Button>

          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
