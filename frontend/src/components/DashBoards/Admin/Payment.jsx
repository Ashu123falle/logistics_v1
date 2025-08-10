import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { useNavigate } from "react-router-dom";
import  API  from "../../../services/api"; 

const statusColors = {
  SUCCESS: "success",
  FAILED: "error",
};

export default function Payment() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const fetchPayments = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const response = await API.get("/payment");
      
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to fetch payments. Please check your backend connection.";
      setApiError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const totalRevenue = Array.isArray(payments)
    ? payments.reduce((sum, p) => sum + p.amount, 0)
    : 0;

  const successfulPayments = Array.isArray(payments)
    ? payments
        .filter((p) => p.status === "SUCCESS")
        .reduce((sum, p) => sum + p.amount, 0)
    : 0;

  const failedPayments = Array.isArray(payments)
    ? payments
        .filter((p) => p.status === "FAILED")
        .reduce((sum, p) => sum + p.amount, 0)
    : 0;

  const recentPayments = Array.isArray(payments) ? payments.slice(0, 5) : [];

  const cardStyle = {
    p: 2,
    textAlign: "center",
    borderRadius: 3,
    bgcolor: "#fff",
    boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
    height: "100%",
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      <Typography
        variant="h5"
        fontWeight={700}
        color="text.primary"
        mb={{ xs: 2, md: 3 }}
        textAlign={{ xs: "center", md: "left" }}
      >
        Payments Overview
      </Typography>

      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiError}
        </Alert>
      )}

      {/* Summary Cards */}
      <Grid container spacing={2} mb={{ xs: 3, md: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={cardStyle}>
            <PaymentsIcon color="primary" fontSize="large" />
            <Typography variant="subtitle2" color="text.secondary">
              Total Revenue
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              ₹ {totalRevenue.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={cardStyle}>
            <TrendingUpIcon sx={{ color: "#16a34a" }} fontSize="large" />
            <Typography variant="subtitle2" color="text.secondary">
              Successful Payments
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              ₹ {successfulPayments.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={cardStyle}>
            <TrendingDownIcon sx={{ color: "#ef4444" }} fontSize="large" />
            <Typography variant="subtitle2" color="text.secondary">
              Failed Payments
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              ₹ {failedPayments.toFixed(2)}
            </Typography>
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
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          p={2}
          gap={1}
        >
          <Typography variant="h6" fontWeight={600}>
            Recent Payments
          </Typography>
        </Box>
        <Divider />
        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : recentPayments.length === 0 ? (
          <Box p={4} textAlign="center" color="text.secondary">
            No payments found.
          </Box>
        ) : (
          recentPayments.map((p, i) => (
            <React.Fragment key={p.id}>
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                gap={{ xs: 1, sm: 2 }}
                p={2}
              >
                <Box>
                  <Typography fontWeight={600}>{`Customer ${p.customerId}`}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Order ID: {p.deliveryOrderId}
                  </Typography>
                </Box>
                <Typography fontWeight={500}>₹{p.amount.toFixed(2)}</Typography>
                <Chip
                  label={p.status}
                  color={statusColors[p.status]}
                  size="small"
                  sx={{ fontWeight: "bold" }}
                />
              </Box>
              {i !== recentPayments.length - 1 && <Divider />}
            </React.Fragment>
          ))
        )}
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
