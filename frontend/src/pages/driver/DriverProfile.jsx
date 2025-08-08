import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useAuth } from "../../context/AuthContext";
import API from "../../services/api";

const DriverProfile = () => {
  const { auth } = useAuth();
  const driverId = auth.userId;

  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const res = await API.get(`/drivers/${driverId}`);
        setDriver(res.data);
      } catch (err) {
        console.error("Failed to fetch driver data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDriver();
  }, [driverId]);

  if (loading) {
    return <Typography sx={{ p: 3 }}>Loading profile...</Typography>;
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Driver Profile
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 80, height: 80 }}>
              {`${driver?.firstName?.[0] || ""}${driver?.lastName?.[0] || ""}`.toUpperCase()}

            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h6">
              {driver?.firstName} {driver?.lastName}
            </Typography>
            <Typography color="text.secondary">{driver?.email}</Typography>
            <Typography color="text.secondary">{driver?.phoneNumber}</Typography>
          </Grid>
          <Grid item>
           <Button
  variant="outlined"
  startIcon={<EditIcon />}
  sx={{
    mt: 2,
    color: "green",
    borderColor: "green",
    "&:hover": {
      borderColor: "darkgreen",
      color: "darkgreen",
      backgroundColor: "transparent", // ensure no gray background on hover
    },
  }}
>
  Edit Profile
</Button>

          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Vehicle Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {driver?.vehicle ? (
          <>
            <Typography>
              <strong>Vehicle Type:</strong> {driver.vehicle.type}
            </Typography>
            <Typography>
              <strong>Vehicle Number:</strong> {driver.vehicle.registrationNumber}
            </Typography>
            <Typography>
              <strong>Capacity:</strong> {driver.vehicle.capacity} kg
            </Typography>
          </>
        ) : (
          <Typography>No vehicle assigned.</Typography>
        )}
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Documents
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography>
          <strong>License Number:</strong> {driver?.licenseNumber}
        </Typography>
        <Typography>
          <strong>Aadhaar Card:</strong> {driver?.aadhaarNumber || "Not uploaded"}
        </Typography>
        <Button variant="contained" startIcon={<UploadFileIcon />} sx={{ mt: 2,
            backgroundColor:"green",
         }}>
          Upload New Documents
        </Button>
      </Paper>
    </Box>
  );
};

export default DriverProfile;
