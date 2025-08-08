import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  IconButton,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider,
  InputAdornment,
  Tooltip,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GetAppIcon from "@mui/icons-material/GetApp";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ReceiptIcon from "@mui/icons-material/Receipt";

// Mock Data (sample 12 items for pagination)
const rows = [
  {
    id: "RCP12345",
    user: "John Doe",
    email: "john@example.com",
    amount: 1200,
    method: "Credit Card",
    date: "2025-08-01",
    status: "Paid",
  },
  {
    id: "RCP12346",
    user: "Jane Smith",
    email: "jane@example.com",
    amount: 750,
    method: "UPI",
    date: "2025-08-02",
    status: "Pending",
  },
  {
    id: "RCP12347",
    user: "Mike Johnson",
    email: "mike@example.com",
    amount: 550,
    method: "Bank Transfer",
    date: "2025-07-29",
    status: "Failed",
  },
  {
    id: "RCP12348",
    user: "Alice Brown",
    email: "alice@example.com",
    amount: 940,
    method: "Credit Card",
    date: "2025-08-03",
    status: "Paid",
  },
  {
    id: "RCP12349",
    user: "Chris Lee",
    email: "chris@example.com",
    amount: 1020,
    method: "UPI",
    date: "2025-08-04",
    status: "Pending",
  },
  {
    id: "RCP12350",
    user: "Sophia Wilson",
    email: "sophia@example.com",
    amount: 875,
    method: "Bank Transfer",
    date: "2025-08-05",
    status: "Paid",
  },
  {
    id: "RCP12351",
    user: "David Clark",
    email: "david@example.com",
    amount: 660,
    method: "Credit Card",
    date: "2025-08-06",
    status: "Pending",
  },
  {
    id: "RCP12352",
    user: "Emma Martinez",
    email: "emma@example.com",
    amount: 400,
    method: "UPI",
    date: "2025-08-07",
    status: "Failed",
  },
  {
    id: "RCP12353",
    user: "Liam Johnson",
    email: "liam@example.com",
    amount: 1200,
    method: "Bank Transfer",
    date: "2025-08-08",
    status: "Paid",
  },
  {
    id: "RCP12354",
    user: "Olivia White",
    email: "olivia@example.com",
    amount: 550,
    method: "Credit Card",
    date: "2025-08-09",
    status: "Pending",
  },
  {
    id: "RCP12355",
    user: "Noah Hall",
    email: "noah@example.com",
    amount: 790,
    method: "UPI",
    date: "2025-08-10",
    status: "Failed",
  },
  {
    id: "RCP12356",
    user: "Isabella Scott",
    email: "isabella@example.com",
    amount: 1300,
    method: "Bank Transfer",
    date: "2025-08-11",
    status: "Paid",
  },
];

// Status Colors
const statusColors = {
  Paid: "success",
  Pending: "warning",
  Failed: "error",
};

export default function PaymentReceipts() {
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Pagination State
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Filter Data
  const filteredRows = rows.filter((r) => {
    const matchesStatus = filterStatus ? r.status === filterStatus : true;
    const matchesSearch =
      r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Paginate Data
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const paginatedRows = filteredRows.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box sx={{ p: 3, bgcolor: "#f3f4f6", minHeight: "100vh" }}>
      {/* Page Title */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#111827" }}>
        Payment Receipts
      </Typography>

      {/* Filters */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
          bgcolor: "#fff",
          borderRadius: 3,
          boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search by user or receipt ID"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          }}
          sx={{ bgcolor: "#f9fafb", borderRadius: 2 }}
        />
        <TextField
          select
          size="small"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setPage(1); // Reset to first page
          }}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="Paid">Paid</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Failed">Failed</MenuItem>
        </TextField>
        <IconButton color="primary" disabled>
          <FilterAltIcon />
        </IconButton>
        <Button
          variant="contained"
          startIcon={<GetAppIcon />}
          sx={{ borderRadius: 2, px: 3 }}
          disabled
        >
          Export
        </Button>
      </Paper>

      {/* Cards Grid */}
      <Grid container spacing={2}>
        {paginatedRows.map((row) => (
          <Grid item xs={12} sm={6} md={4} key={row.id}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 3,
                position: "relative",
                bgcolor: "#fff",
                boxShadow: "0px 3px 8px rgba(0,0,0,0.08)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0px 6px 12px rgba(0,0,0,0.12)",
                },
              }}
            >
              {/* Header Row: Receipt ID + Status Chip */}
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                <Box display="flex" alignItems="center">
                  <ReceiptIcon sx={{ color: "#374151", mr: 1 }} />
                  <Typography fontWeight={600} color="text.primary">
                    {row.id}
                  </Typography>
                </Box>
                <Chip
                  label={row.status}
                  color={statusColors[row.status]}
                  size="small"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                />
              </Box>

              <Divider sx={{ mb: 1 }} />

              {/* User Info */}
              <Box display="flex" alignItems="center" mb={1}>
                <PersonIcon sx={{ color: "#6b7280", mr: 1 }} />
                <Box>
                  <Typography fontWeight={600}>{row.user}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {row.email}
                  </Typography>
                </Box>
              </Box>

              {/* Amount & Method */}
              <Box display="flex" alignItems="center" mb={1}>
                <CurrencyRupeeIcon sx={{ color: "#6b7280", mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  ₹{row.amount} - {row.method}
                </Typography>
              </Box>

              {/* Date */}
              <Typography variant="body2" color="text.secondary" mb={1}>
                Date: <strong>{row.date}</strong>
              </Typography>

              {/* Actions */}
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Tooltip title="Download Receipt">
                  <IconButton color="primary" size="small">
                    <GetAppIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Resend Email">
                  <IconButton
                    color="secondary"
                    size="small"
                    onClick={() => {
                      setSelectedRow(row);
                      setDialogOpen(true);
                    }}
                  >
                    <EmailIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            sx={{ "& .MuiPaginationItem-root": { borderRadius: 2 } }}
          />
        </Box>
      )}

      {/* Dialog for Resend Confirmation */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: { borderRadius: 3, p: 2 },
        }}
      >
        {selectedRow && (
          <>
            <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
              Resend Receipt Email?
            </DialogTitle>
            <DialogContent>
              <Typography variant="body2" textAlign="center">
                Are you sure you want to resend the receipt for{" "}
                <strong>{selectedRow.id}</strong> to{" "}
                <strong>{selectedRow.email}</strong>?
              </Typography>
            </DialogContent>
            <DialogActions sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
              <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button variant="contained" color="primary">
                Confirm
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
