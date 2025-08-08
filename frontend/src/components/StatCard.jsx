// src/components/StatCard.jsx
import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function StatCard({ title, amount, description, icon, error }) {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 2,
        bgcolor: theme.palette.background.paper,
        boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
        height: "100%",
        minHeight: { xs: "120px", sm: "140px" },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {icon}
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            ml: 1,
            fontSize: { xs: "0.8rem", sm: "0.9rem" },
          }}
        >
          {title}
        </Typography>
      </Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          my: 1,
          fontSize: { xs: "1.2rem", sm: "1.5rem" },
        }}
      >
        {amount}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          fontSize: { xs: "0.75rem", sm: "0.85rem" },
        }}
      >
        {description}
      </Typography>
      {error && (
        <Typography color="error" variant="caption">
          {error}
        </Typography>
      )}
    </Paper>
  );
}
