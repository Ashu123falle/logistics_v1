// src/components/NotificationsPanel.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function NotificationsPanel({ open }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: { xs: "fixed", sm: "absolute" },
        right: { xs: 16, sm: 20 },
        top: { xs: 70, sm: 100 },
        width: { xs: "92%", sm: 300 },
        bgcolor: theme.palette.background.paper,
        p: 2,
        borderRadius: 2,
        boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
        display: open ? "block" : "none",
        zIndex: 2000,
      }}
    >
      <Typography variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}>
        Notifications
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" } }}
      >
        You have new updates related to your deliveries.
      </Typography>
    </Box>
  );
}
