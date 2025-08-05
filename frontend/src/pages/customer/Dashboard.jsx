import React from "react";
import { Grid, Typography } from "@mui/material";
import StatCard from "../../components/StatCard";
import {
  LocalShipping,
  ReceiptLong,
  SupportAgent,
  Inventory,
} from "@mui/icons-material";

const Dashboard = () => {
  // Dummy data
  const stats = {
    orders: 42,
    inTransit: 8,
    invoices: 15,
    tickets: 3,
  };

  return (
    <>
      <Typography variant="h5" mb={3}>
        Welcome, Customer 👋
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Orders" value={stats.orders} icon={<Inventory />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="In Transit" value={stats.inTransit} icon={<LocalShipping />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Invoices" value={stats.invoices} icon={<ReceiptLong />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Tickets" value={stats.tickets} icon={<SupportAgent />} />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
