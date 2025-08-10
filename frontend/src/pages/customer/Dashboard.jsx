import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, IconButton, Badge, useMediaQuery, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import API from "../../services/api";  // Adjust path if needed
import StatCard from "../../components/StatCard";
import NotificationsPanel from "../customer/NotificationPanel";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const [username, setUsername] = useState({});
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [totalInvoices, setTotalInvoices] = useState({ amount: "...", loading: true, error: null });
  const [totalDeliveries, setTotalDeliveries] = useState({ amount: "...", loading: true, error: null });
  const [totalPayments, setTotalPayments] = useState({ amount: "...", loading: true, error: null });
  const { auth } =useAuth();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    

    const fetchData = async () => {
      try {
        const res = await API.get("/customer/dashboard");
        const resCustomer = await API.get(`/customer/${auth.userId}`);
        setUsername(resCustomer.data);
        console.log(res.data);
        
        setTotalInvoices({ amount: res.data.totalOrders, loading: false, error: null });
        setTotalDeliveries({ amount: res.data.totalOrders, loading: false, error: null });
        const totalAmount = res.data.totalSpent;
        setTotalPayments({ amount: totalAmount, loading: false, error: null });
      } catch (err) {
        setTotalInvoices({ amount: 0, loading: false, error: err.message });
        setTotalDeliveries({ amount: 0, loading: false, error: err.message });
        setTotalPayments({ amount: 0, loading: false, error: err.message });
      }
    };

    fetchData();
  }, []);

  const pieData = [
    { name: "Invoices", value: totalInvoices.loading ? 0 : totalInvoices.amount },
    { name: "Deliveries", value: totalDeliveries.loading ? 0 : totalDeliveries.amount },
    // { name: "Payments", value: totalPayments.loading ? 0 : totalPayments.amount },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
      {/* Welcome */}
      <Box
        sx={{
          bgcolor: theme.palette.background.paper,
          p: { xs: 1.5, sm: 2 },
          borderRadius: 2,
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: { xs: "1rem", sm: "1.25rem" } }}>
          Welcome back,  {`${username?.firstName || "Guest"}`}
        </Typography>
        <IconButton onClick={() => setNotificationsOpen(!notificationsOpen)}>
          <Badge badgeContent={3} color="warning">
            <NotificationsIcon sx={{ color: theme.palette.text.secondary }} />
          </Badge>
        </IconButton>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Delivered"
            amount={totalInvoices.loading ? "..." : totalInvoices.amount}
            description="All time"
            icon={<ReceiptIcon sx={{ fontSize: 24, color: theme.palette.primary.main }} />}
            error={totalInvoices.error}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Orders Pending "
            amount={totalDeliveries.loading ? "..." : totalDeliveries.amount}
            description="All time"
            icon={<LocalShippingIcon sx={{ fontSize: 24, color: theme.palette.primary.main }} />}
            error={totalDeliveries.error}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Payments"
            amount={totalPayments.loading ? "..." : `$${totalPayments.amount.toLocaleString()}`}
            description="All time"
            icon={<MonetizationOnIcon sx={{ fontSize: 24, color: theme.palette.primary.main }} />}
            error={totalPayments.error}
          />
        </Grid>
      </Grid>

      {/* Pie Chart */}
      <Box
        sx={{
          height: { xs: 300, sm: 400, md: "50vh" },
          bgcolor: theme.palette.background.paper,
          p: { xs: 1.5, sm: 2 },
          borderRadius: 2,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={isSmallScreen ? 80 : 120}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Notifications */}
      <NotificationsPanel open={notificationsOpen} />
    </Box>
  );
}
