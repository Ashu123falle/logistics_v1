import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  IconButton,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import RefreshIcon from "@mui/icons-material/Refresh";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function Tracking() {
  const { orderId } = useParams(); // Get dynamic order id from URL

  const steps = [
    "Scheduled",
    "Confirmed",
    "On route",
    "Arrived",
    "Delivered",
    "Complete",
  ];
  const [activeStep] = useState(2); // example: currently "On route"

  return (
    <Box sx={{ p: 3, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      {/* Order Header with Stepper */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          bgcolor: "#fff",
        }}
      >
        {/* Top Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={600}
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ color: "#111827" }}
          >
            <AssignmentIcon sx={{ color: "#22c55e" }} /> 
            {orderId ? `Order ID: ${orderId}` : "No Order Selected"}
          </Typography>
          <IconButton
            sx={{
              bgcolor: "#f3f4f6",
              "&:hover": { bgcolor: "#e5e7eb" },
            }}
          >
            <RefreshIcon sx={{ color: "#374151" }} />
          </IconButton>
        </Box>

        {/* Progress Steps */}
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          sx={{
            "& .MuiStepLabel-label": {
              fontSize: "0.8rem",
              color: "#6b7280",
              fontWeight: 500,
            },
            "& .MuiStepLabel-label.Mui-active": {
              color: "#111827",
              fontWeight: 600,
            },
            "& .MuiStepConnector-line": {
              borderColor: "#d1d5db",
              borderTopWidth: 2,
            },
          }}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                StepIconProps={{
                  sx: {
                    color:
                      index <= activeStep
                        ? index === activeStep
                          ? "#22c55e" // active
                          : "#16a34a" // completed
                        : "#d1d5db", // incomplete
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Grid container spacing={2}>
        {/* Left Panel */}
        <Grid item xs={12} md={4} lg={3}>
          {/* Driver Card */}
          <Paper
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
              bgcolor: "#fff",
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight={600}
              mb={1}
              sx={{ color: "#111827" }}
            >
              Driver
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: "#e5e7eb", mr: 2, color: "#374151" }}>J</Avatar>
                <Box>
                  <Typography fontWeight={600} sx={{ color: "#111827" }}>
                    John Smith
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    +532 6129 257
                  </Typography>
                </Box>
              </Box>
              <IconButton
                sx={{
                  bgcolor: "#ecfdf5",
                  "&:hover": { bgcolor: "#d1fae5" },
                }}
              >
                <PhoneIcon sx={{ color: "#22c55e" }} />
              </IconButton>
            </Box>
          </Paper>

          {/* Truck Info */}
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
              bgcolor: "#fff",
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight={600}
              mb={1}
              display="flex"
              alignItems="center"
              gap={1}
              sx={{ color: "#111827" }}
            >
              <LocalShippingIcon sx={{ color: "#22c55e" }} /> Truck Info
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                component="img"
                src="/images/truck.png"
                alt="truck"
                sx={{ width: 80, height: 50, objectFit: "contain" }}
              />
              <Box>
                <Typography variant="body2">Truck Number: MH-09 ABCD</Typography>
                <Typography variant="body2">Truck: 17</Typography>
                <Typography variant="body2">Load: 1800 kg</Typography>
                <Typography variant="body2">Max load: 2000 kg</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Right Panel */}
        <Grid item xs={12} md={8} lg={9}>
          {/* Map Section */}
          <Paper
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
              bgcolor: "#fff",
              height: 300,
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight={600}
              mb={1}
              display="flex"
              alignItems="center"
              gap={1}
              sx={{ color: "#111827" }}
            >
              <LocalShippingIcon sx={{ color: "#22c55e" }} /> Track Order
            </Typography>
            <Box
              component="img"
              src="/images/map.png"
              alt="map"
              sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 }}
            />
          </Paper>

          {/* Order Info & ETA */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: "1px solid #e5e7eb",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
                  bgcolor: "#fff",
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  mb={1}
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{ color: "#111827" }}
                >
                  <AssignmentIcon sx={{ color: "#22c55e" }} /> Order Info
                </Typography>
                <Typography variant="body2">Job: #{orderId || "N/A"}</Typography>
                <Typography variant="body2">Status: In Progress</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: "1px solid #e5e7eb",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
                  bgcolor: "#fff",
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  mb={1}
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{ color: "#111827" }}
                >
                  <AccessTimeIcon sx={{ color: "#22c55e" }} /> ETA
                </Typography>
                <Typography variant="body2" display="flex" alignItems="center" gap={1}>
                  <CalendarTodayIcon sx={{ fontSize: 18, color: "#6b7280" }} /> Date: 24 March
                </Typography>
                <Typography variant="body2" display="flex" alignItems="center" gap={1}>
                  <AccessTimeIcon sx={{ fontSize: 18, color: "#6b7280" }} /> Time: 11:00 AM
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last update: Today at 12:10 PM
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
