import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Badge,
  Paper,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DriveEtaIcon from "@mui/icons-material/DriveEta"; 
import axios from "axios";
import RevenueChart from "./RevenueChart";
import AssignmentIcon from "@mui/icons-material/Assignment"; 
import RevenueTable from "./RevenueTable";
import API from "../../../services/api";


function RevenueCard({ title, amount, growth, description, icon, error }) {
  const theme = useTheme();

  return (
    <Paper sx={{ p: 2, borderRadius: 2, bgcolor: theme.palette.background.paper, boxShadow: "0px 1px 3px rgba(0,0,0,0.1)" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {icon}
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: "bold", my: 1 }}>
        {amount}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="body2" sx={{ color: growth && growth.startsWith('+') ? "green" : "red" }}>
          {growth}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          {description}
        </Typography>
      </Box>
      {error && <Typography color="error" variant="caption">{error}</Typography>}
    </Paper>
  );
}

function NotificationsPanel({ notificationsOpen, onClose }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: 300,
        height: "100%",
        bgcolor: theme.palette.background.paper,
        p: 2,
        borderRadius: 2,
        boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
        display: notificationsOpen ? 'block' : 'none',
      }}
    >
      <Typography variant="h6">Notifications</Typography>
      <Typography variant="body2" color="text.secondary">
        This is a mock notifications panel.
      </Typography>
    </Box>
  );
}





function DashBoard() {
  const [username, setUsername] = useState("User  ");
  const [activeDrivers, setActiveDrivers] = useState({
    amount: "...",
    growth: "...",
    loading: true,
    error: null,
  });
  const [totalJobs, setTotalJobs] = useState({
    amount: "...",
    growth: "...",
    loading: true,
    error: null,
  });
  const [totalRevenue, setTotalRevenue] = useState({
    amount: "...",
    growth: "...",
    loading: true,
    error: null,
  });
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const theme = useTheme();


  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername.charAt(0).toUpperCase() + storedUsername.slice(1));
    }

    const fetchDriverData = async () => {
      setActiveDrivers((prevState) => ({ ...prevState, loading: true, error: null }));
      try {
        const response = await API.get("/drivers");
        const drivers = response.data;

        const currentCount = drivers.length;
        const mockPreviousCount = 120; 

        let growthString = "N/A";
        if (mockPreviousCount > 0) {
          const growth = ((currentCount - mockPreviousCount) / mockPreviousCount) * 100;
          growthString = `${growth > 0 ? "+" : ""}${growth.toFixed(2)}%`;
        } else if (currentCount > 0) {
          growthString = "+100.00%";
        } else {
          growthString = "0.00%";
        }

        setActiveDrivers({
          amount: currentCount.toString(),
          growth: growthString,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching active drivers data:", error);
        setActiveDrivers((prevState) => ({ ...prevState, loading: false, error: error.message }));
      }
    };

    const fetchJobData = async () => {
      setTotalJobs((prevState) => ({ ...prevState, loading: true, error: null }));
      try {
        const response = await API.get("/delivery-orders/all");
        const jobs = response.data;

        const currentCount = jobs.length;
        const mockPreviousCount = 70; 

        let growthString = "N/A";
        if (mockPreviousCount > 0) {
          const growth = ((currentCount - mockPreviousCount) / mockPreviousCount) * 100;
          growthString = `${growth > 0 ? "+" : ""}${growth.toFixed(2)}%`;
        } else if (currentCount > 0) {
          growthString = "+100.00%";
        } else {
          growthString = "0.00%";
        }

        setTotalJobs({
          amount: currentCount.toString(),
          growth: growthString,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching total jobs data:", error);
        setTotalJobs((prevState) => ({ ...prevState, loading: false, error: error.message }));
      }
    };
    
    const fetchRevenueData = async () => {
      setTotalRevenue((prevState) => ({ ...prevState, loading: true, error: null }));
      try {
        
        const response = await API.get("/payment");
        const payments = response.data;

        const now = new Date();
        const last30Days = new Date(now);
        last30Days.setDate(now.getDate() - 30);
        const last60Days = new Date(now);
        last60Days.setDate(now.getDate() - 60);

        const paymentsLast30Days = payments.filter(p => new Date(p.timestamp) >= last30Days);
        const paymentsPrev30Days = payments.filter(p => new Date(p.timestamp) >= last60Days && new Date(p.timestamp) < last30Days);

        const currentPeriodRevenue = paymentsLast30Days.reduce((sum, p) => sum + p.amount, 0);
        const previousPeriodRevenue = paymentsPrev30Days.reduce((sum, p) => sum + p.amount, 0);

        let growthString = "N/A";
        if (previousPeriodRevenue > 0) {
          const growth = ((currentPeriodRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100;
          growthString = `${growth > 0 ? "+" : ""}${growth.toFixed(2)}%`;
        } else if (currentPeriodRevenue > 0) {
          growthString = "+100.00%";
        } else {
          growthString = "0.00%";
        }

        setTotalRevenue({
          amount: `$${currentPeriodRevenue.toLocaleString()}`,
          growth: growthString,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching revenue data:", error);
        const errorMessage = error.response?.data?.message || "Failed to fetch revenue data.";
        setTotalRevenue((prevState) => ({ ...prevState, loading: false, error: errorMessage }));
      }
    };

    fetchDriverData();
    fetchJobData();
    fetchRevenueData(); 
  }, []);

  const handleToggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  return (
    <Box sx={{ p: 3, bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
      {/* Welcome Section */}
      <Box
        sx={{
          bgcolor: theme.palette.background.paper,
          p: 2,
          borderRadius: 2,
          mb: 3,
          boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Welcome back, {username}
        </Typography>
        <IconButton onClick={handleToggleNotifications}>
          <Badge badgeContent={12} color="warning">
            <NotificationsIcon sx={{ color: theme.palette.text.secondary }} />
          </Badge>
        </IconButton>
      </Box>

      {/* Main Layout */}
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* LEFT CONTENT COLUMN */}
        <Box sx={{ display:"flex",flexDirection:"column",gap:2}}>
          {/* Top Cards */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6} md={4}>
              <RevenueCard
                title="Total platform revenue"
                amount={totalRevenue.loading ? "..." : totalRevenue.amount}
                growth={totalRevenue.loading ? "..." : totalRevenue.growth}
                description="Last 30 days"
                icon={<MonetizationOnIcon sx={{ fontSize: 24, color: theme.palette.primary.main }} />}
                error={totalRevenue.error}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <RevenueCard
                title="Total jobs"
                amount={totalJobs.loading ? "..." : totalJobs.amount}
                growth={totalJobs.loading ? "..." : totalJobs.growth}
                description="Last 30 days"
                icon={<AssignmentIcon sx={{ fontSize: 24, color: theme.palette.primary.main }} />}
                error={totalJobs.error}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <RevenueCard
                title="Active drivers"
                amount={activeDrivers.loading ? "..." : activeDrivers.amount}
                growth={activeDrivers.loading ? "..." : activeDrivers.growth}
                description="Last 30 days"
                icon={<DriveEtaIcon sx={{ fontSize: 24, color: theme.palette.primary.main }} />}
                error={activeDrivers.error}
              />
            </Grid>
          </Grid>

          {/* Chart */}
          <RevenueChart sx={{ mb: 3 }} />

          {/* Table with added gap */}
          <RevenueTable sx={{ mt: 3 }} />
        </Box>

        {/* RIGHT NOTIFICATIONS COLUMN */}
        <Box sx={{ flex: 1 }}>
          <NotificationsPanel notificationsOpen={notificationsOpen} onClose={handleToggleNotifications} />
        </Box>
      </Box>
    </Box>
  );
}



const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f4f6f8',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif'
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DashBoard />
    </ThemeProvider>
  );
}

export default App;
