import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useNavigate } from "react-router-dom";

// Mock data (replace with API later)
const recentPayments = [
  { id: "RCP12345", user: "John Doe", amount: 1200, status: "Paid" },
  { id: "RCP12346", user: "Jane Smith", amount: 750, status: "Pending" },
  { id: "RCP12347", user: "Mike Johnson", amount: 550, status: "Failed" },
];

const statusColors = {
  Paid: "success",
  Pending: "warning",
  Failed: "error",
};

export default function Payment() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      {/* Header */}
      <Typography variant="h5" fontWeight={700} color="text.primary" mb={3}>
        Payments Overview
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={cardStyle}>
            <PaymentsIcon color="primary" fontSize="large" />
            <Typography variant="subtitle2" color="text.secondary">
              Total Revenue
            </Typography>
            <Typography variant="h6" fontWeight={700}>₹ 2,50,000</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={cardStyle}>
            <TrendingUpIcon sx={{ color: "#16a34a" }} fontSize="large" />
            <Typography variant="subtitle2" color="text.secondary">
              Successful Payments
            </Typography>
            <Typography variant="h6" fontWeight={700}>₹ 2,20,000</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={cardStyle}>
            <TrendingUpIcon sx={{ color: "#f59e0b" }} fontSize="large" />
            <Typography variant="subtitle2" color="text.secondary">
              Pending Payments
            </Typography>
            <Typography variant="h6" fontWeight={700}>₹ 30,000</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Payments */}
      <Paper
        sx={{
          borderRadius: 3,
          bgcolor: "#fff",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
          mb: 3,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
          <Typography variant="h6" fontWeight={600}>Recent Payments</Typography>
        </Box>
        <Divider />
        {recentPayments.map((p, i) => (
          <React.Fragment key={p.id}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
            >
              <Box>
                <Typography fontWeight={600}>{p.user}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {p.id}
                </Typography>
              </Box>
              <Typography>₹{p.amount}</Typography>
              <Chip
                label={p.status}
                color={statusColors[p.status]}
                size="small"
                sx={{ fontWeight: "bold" }}
              />
            </Box>
            {i !== recentPayments.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Paper>

      {/* Bottom Center Button */}
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate("/admin/payment-receipts")}
          sx={{ borderRadius: 2 }}
        >
          View in Details
        </Button>
      </Box>
    </Box>
  );
}

const cardStyle = {
  p: 2,
  textAlign: "center",
  borderRadius: 3,
  bgcolor: "#fff",
  boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
};
