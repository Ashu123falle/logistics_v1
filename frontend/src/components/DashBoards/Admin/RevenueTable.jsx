import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import  API  from "../../../services/api"; 


export default function RevenueTable() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [filterOption, setFilterOption] = useState("All");

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        setLoading(true);
        const response = await API.get("/payment");
        
        const sortedPayments = response.data.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
        setPayments(sortedPayments);
      } catch (err) {
        console.error("Error fetching payment data:", err);
        setError("Failed to load payment data. Please check the API connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, []);

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterSelect = (option) => {
    setFilterOption(option);
    setFilterAnchorEl(null);
  };


  const filteredPayments = payments
    .filter((payment) =>
      payment.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.razorpayPaymentId.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((payment) => {
      if (filterOption === "High Amount") return payment.amount > 100;
      if (filterOption === "Low Amount") return payment.amount <= 100;
      return true;
    });

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "#fff",
        border: "1px solid #e5e7eb",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      {/* search and filter */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexWrap: 'wrap',
          gap: 1
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Recent Payments
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          {/* Search Bar */}
          <TextField
            size="small"
            placeholder="Search status..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              sx: { borderRadius: "12px", background: "#f9fafb" },
            }}
          />

          {/* Filter Button */}
          <Button
            size="small"
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleFilterClick}
            sx={{ textTransform: "none", borderRadius: "12px" }}
          >
            {filterOption}
          </Button>

          {/*  Dropdown Menu */}
          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterClose}
          >
            <MenuItem onClick={() => handleFilterSelect("All")}>All</MenuItem>
            <MenuItem onClick={() => handleFilterSelect("High Amount")}>
              High Amount ( &gt; $100 )
            </MenuItem>
            <MenuItem onClick={() => handleFilterSelect("Low Amount")}>
              Low Amount ( &le; $100 )
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Table */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error">{error}</Alert>
      )}

      {!loading && !error && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Payment ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.razorpayPaymentId}</TableCell>
                  <TableCell>${payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                  <TableCell>{new Date(payment.timeStamp).toLocaleString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}
