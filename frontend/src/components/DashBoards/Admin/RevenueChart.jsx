import React from "react";
import {
  Paper,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", revenue: 30000 },
  { month: "Feb", revenue: 45000 },
  { month: "Mar", revenue: 35000 },
  { month: "Apr", revenue: 47000 },
  { month: "May", revenue: 25000 },
  { month: "Jun", revenue: 40000 },
];

export default function RevenueChart() {
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

      {/* Chart */}
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data} barSize={35}>
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
          <Legend verticalAlign="top" height={20} />
          <Bar
            dataKey="revenue"
            fill="url(#colorRevenue)"
            radius={[6, 6, 0, 0]}
            animationDuration={1200}
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
