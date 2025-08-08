import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default function RevenueChart() {
  
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const fetchRevenueData = async () => {
      try {
      
        const response = await API.get("/payment");
        const payments = response.data;

     
        const now = new Date();
        const lastSixMonths = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        
        const recentPayments = payments.filter(p => new Date(p.timeStamp) >= lastSixMonths);

       
        const revenueByMonth = new Map();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

     
        for (let i = 0; i < 6; i++) {
          const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const monthKey = `${monthNames[date.getMonth()]}-${date.getFullYear()}`;
          revenueByMonth.set(monthKey, 0);
        }

        recentPayments.forEach(p => {
          const date = new Date(p.timeStamp);
          const monthKey = `${monthNames[date.getMonth()]}-${date.getFullYear()}`;
          const currentRevenue = revenueByMonth.get(monthKey) || 0;
          revenueByMonth.set(monthKey, currentRevenue + p.amount);
        });

        const formattedData = Array.from(revenueByMonth.keys())
          .sort((a, b) => {
            
            const [monthA, yearA] = a.split('-');
            const [monthB, yearB] = b.split('-');
            if (yearA !== yearB) return yearA - yearB;
            return monthNames.indexOf(monthA) - monthNames.indexOf(monthB);
          })
          .map(key => ({
            month: key.split('-')[0], 
            revenue: revenueByMonth.get(key),
          }));

        setChartData(formattedData);
      } catch (err) {
        console.error("Error fetching revenue data:", err);
        setError("Failed to load chart data. Please check the API connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: 350,
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Total Revenue
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: "500" }}
        >
          Last 6 months
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box sx={{ p: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {/* Chart */}
      {!loading && !error && (
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={chartData} barSize={35}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#22c55e" stopOpacity={0.9} />
                <stop offset="90%" stopColor="#16a34a" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
              }}
            />
            <Bar
              dataKey="revenue"
              fill="url(#colorRevenue)"
              radius={[6, 6, 0, 0]}
              animationDuration={1200}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
}
