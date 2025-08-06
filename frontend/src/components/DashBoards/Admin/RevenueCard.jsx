import React from "react";
import {
  Paper,
  Typography,
  Box,
  LinearProgress,
  Fade,
  Zoom,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function RevenueCard({
  title,
  amount,
  growth,
  description,
  bar,
  miniGraph,
}) {
  const isPositive = !growth.startsWith("-");

  return (
    <Zoom in timeout={500}>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          bgcolor: "#fff",
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 6px 12px rgba(0,0,0,0.08)",
            transform: "translateY(-2px)",
          },
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {description}
          </Typography>
        </Box>

        {/* Amount */}
        <Typography
          variant="h5"
          sx={{ mt: 1, fontWeight: "bold", color: "#111827" }}
        >
          {amount}
        </Typography>

        {/* Growth */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 0.5,
            color: isPositive ? "#16a34a" : "#dc2626",
            fontWeight: "bold",
          }}
        >
          {isPositive ? (
            <ArrowDropUpIcon fontSize="small" />
          ) : (
            <ArrowDropDownIcon fontSize="small" />
          )}
          <Typography variant="body2">{growth}</Typography>
        </Box>

        {/* Optional Mini Progress Bar */}
        <Fade in={bar}>
          <LinearProgress
            variant="determinate"
            value={isPositive ? 75 : 35}
            sx={{
              mt: 2,
              height: 6,
              borderRadius: 5,
              bgcolor: "#f3f4f6",
              "& .MuiLinearProgress-bar": {
                bgcolor: isPositive ? "#22c55e" : "#ef4444",
              },
            }}
          />
        </Fade>

        {/* Optional Mini Graph */}
        {miniGraph && (
          <Box
            sx={{
              display: "flex",
              gap: 0.7,
              mt: 2,
              alignItems: "flex-end",
              height: 30,
            }}
          >
            {[5, 10, 8, 15, 12, 18, 14].map((h, i) => (
              <Box
                key={i}
                sx={{
                  width: 6,
                  height: h,
                  bgcolor: isPositive ? "#22c55e" : "#ef4444",
                  borderRadius: 1,
                  transition: "height 0.3s ease",
                  "&:hover": { height: h + 5 },
                }}
              />
            ))}
          </Box>
        )}
      </Paper>
    </Zoom>
  );
}
