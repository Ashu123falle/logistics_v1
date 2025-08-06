import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DoneIcon from "@mui/icons-material/Done";

const payments = [
  { tripId: "TX001", date: "Aug 2", amount: "₹2,000", status: "Paid" },
  { tripId: "TX002", date: "Aug 1", amount: "₹3,500", status: "Paid" },
];

export default function Payments() {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Payment History
      </Typography>

      <TableContainer
        component={Paper}
        elevation={2}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#f9fafb" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Trip ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {payments.map((p) => (
              <TableRow
                key={p.tripId}
                hover
                sx={{
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <TableCell>{p.tripId}</TableCell>
                <TableCell>{p.date}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <CurrencyRupeeIcon fontSize="small" color="success" />
                    <Typography variant="body2">{p.amount}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={p.status}
                    color="success"
                    size="small"
                    icon={<DoneIcon />}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
