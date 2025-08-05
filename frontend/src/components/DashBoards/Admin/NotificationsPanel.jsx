import React from "react";
import { Paper, Typography, Box, Button } from "@mui/material";

const notifications = [
  { type: "COMPLIANCE", text: "3 jobs missing CVIs", time: "Just now" },
  { type: "SPREAD MARGIN", text: "Carrier payout too high on Job #1482", time: "3 min ago" },
  { type: "INTEGRATION", text: "GPS system for 'HaulPro' failing", time: "13 min ago" },
];

export default function NotificationsPanel() {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="subtitle2">Notifications</Typography>
        <Button size="small">Read all</Button>
      </Box>
      {notifications.map((n, idx) => (
        <Box key={idx} sx={{ mb: 2 }}>
          <Typography variant="caption" color="error">
            {n.type}
          </Typography>
          <Typography variant="body2">{n.text}</Typography>
          <Typography variant="caption" color="text.secondary">
            {n.time}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
}
