import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GetAppIcon from "@mui/icons-material/GetApp";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ReceiptIcon from "@mui/icons-material/Receipt";
import axios from "axios";




const statusColors = {
  SUCCESS: "success",
  FAILED: "error",
};

export default function PaymentReceipts() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  
  const fetchPayments = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const response = await API.get("/payment");
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to fetch payments. Please check your backend connection.";
      setApiError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchPayments();
  }, []);


  const filteredRows = payments.filter((p) => {
    const matchesStatus = filterStatus ? p.status === filterStatus : true;
    const matchesSearch =
      (p.customerId && p.customerId.toString().includes(search)) ||
      (p.deliveryOrderId && p.deliveryOrderId.toString().includes(search)) ||
      (p.id && p.id.toString().includes(search));
    return matchesStatus && matchesSearch;
  });


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

      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiError}
        </Alert>
      )}

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
          placeholder="Search by ID"
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
            setPage(1); 
          }}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="SUCCESS">SUCCESS</MenuItem>
          <MenuItem value="FAILED">FAILED</MenuItem>
        </TextField>
        <Tooltip title="Filter options not yet implemented">
          <IconButton color="primary" disabled>
            <FilterAltIcon />
          </IconButton>
        </Tooltip>
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
      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : paginatedRows.length === 0 ? (
        <Box p={4} textAlign="center" color="text.secondary">
          No payments found.
        </Box>
      ) : (
        <Grid container spacing={2}>
          {paginatedRows.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
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
                      {p.id}
                    </Typography>
                  </Box>
                  <Chip
                    label={p.status}
                    color={statusColors[p.status]}
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
                    <Typography fontWeight={600}>
                      {`Customer ${p.customerId}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Order ID: {p.deliveryOrderId}
                    </Typography>
                  </Box>
                </Box>

                {/* Amount & Method */}
                <Box display="flex" alignItems="center" mb={1}>
                  <CurrencyRupeeIcon sx={{ color: "#6b7280", mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    ₹{p.amount.toFixed(2)} - {p.method}
                  </Typography>
                </Box>

                {/* Date */}
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Date: <strong>{new Date(p.timeStamp).toLocaleDateString()}</strong>
                </Typography>

                {/* Actions */}
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Tooltip title="Download Receipt">
                    <IconButton color="primary" size="small" disabled>
                      <GetAppIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Resend Email">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => {
                        setSelectedRow(p);
                        setDialogOpen(true);
                      }}
                      disabled
                    >
                      <EmailIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

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
                <strong>{selectedRow.id}</strong> to Customer{" "}
                <strong>{selectedRow.customerId}</strong>?
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
