import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  InputAdornment,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Status colors
const statusColors = {
  Pending: "warning",
  "In Progress": "info",
  Completed: "success",
  Cancelled: "error",
};

// Mock Data
const mockJobs = [
  {
    id: "JOB001",
    title: "Delivery from Mumbai to Pune",
    pickupLocation: "Mumbai",
    dropLocation: "Pune",
    pickupDate: "2025-08-05",
    dropDate: "2025-08-06",
    cargo: "Electronics - 2 tons",
    truck: "TRK001 - Ashok Leyland",
    driver: "DRV001 - John Smith",
    customer: "CUST001 - Acme Corp",
    status: "Pending",
    cost: 15000,
    paymentStatus: "Pending",
  },
  {
    id: "JOB002",
    title: "Textile Shipment - Surat to Delhi",
    pickupLocation: "Surat",
    dropLocation: "Delhi",
    pickupDate: "2025-08-01",
    dropDate: "2025-08-03",
    cargo: "Textiles - 5 tons",
    truck: "TRK002 - Tata Ultra",
    driver: "DRV002 - Jane Doe",
    customer: "CUST002 - TextileHub",
    status: "In Progress",
    cost: 25000,
    paymentStatus: "Pending",
  },
  {
    id: "JOB003",
    title: "Furniture Delivery - Bangalore to Chennai",
    pickupLocation: "Bangalore",
    dropLocation: "Chennai",
    pickupDate: "2025-07-29",
    dropDate: "2025-07-30",
    cargo: "Furniture - 3 tons",
    truck: "TRK003 - Eicher Pro",
    driver: "DRV003 - Mike Johnson",
    customer: "CUST003 - UrbanHomes",
    status: "Completed",
    cost: 18000,
    paymentStatus: "Paid",
  },
];

export default function JobManagement() {
  const [jobs, setJobs] = useState(mockJobs);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // DataGrid Columns
  const columns = [
    { field: "id", headerName: "Job ID", flex: 1 },
    {
      field: "title",
      headerName: "Title",
      flex: 1.5,
      renderCell: (params) => (
        <Typography fontWeight={600}>{params.row.title}</Typography>
      ),
    },
    {
      field: "pickupLocation",
      headerName: "Pickup",
      flex: 1,
    },
    {
      field: "dropLocation",
      headerName: "Drop",
      flex: 1,
    },
    {
      field: "pickupDate",
      headerName: "Pickup Date",
      flex: 1,
    },
    {
      field: "dropDate",
      headerName: "Drop Date",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.row.status}
          color={statusColors[params.row.status]}
          size="small"
          sx={{ fontWeight: "bold" }}
        />
      ),
    },
    {
      field: "paymentStatus",
      headerName: "Payment",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.row.paymentStatus}
          color={params.row.paymentStatus === "Paid" ? "success" : "warning"}
          size="small"
          sx={{ fontWeight: "bold" }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            color="primary"
            onClick={() => handleViewDetails(params.row)}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  // Handlers
  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setDialogOpen(true);
  };

  const handleEdit = (job) => {
    alert("Edit Job: " + job.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setJobs(jobs.filter((j) => j.id !== id));
    }
  };

  // Filter Data
  const filteredJobs = jobs.filter((job) => {
    const matchStatus = filterStatus ? job.status === filterStatus : true;
    const matchSearch =
      job.id.toLowerCase().includes(search.toLowerCase()) ||
      job.customer.toLowerCase().includes(search.toLowerCase()) ||
      job.driver.toLowerCase().includes(search.toLowerCase()) ||
      job.pickupLocation.toLowerCase().includes(search.toLowerCase()) ||
      job.dropLocation.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <Box sx={{ p: 3, bgcolor: "#f3f4f6", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Job Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2 }}
          onClick={() => alert("Open Add Job Dialog")}
        >
          Add Job
        </Button>
      </Box>

      {/* Filters */}
      <Paper
        sx={{
          p: 2,
          mb: 2,
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
          placeholder="Search by ID, Customer, Driver, or Location"
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
          onChange={(e) => setFilterStatus(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </TextField>
      </Paper>

      {/* DataGrid */}
      <Paper
        sx={{
          borderRadius: 3,
          bgcolor: "#fff",
          p: 1,
          boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <DataGrid
          rows={filteredJobs}
          columns={columns}
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          disableSelectionOnClick
          sx={{
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f9fafb",
              cursor: "pointer",
            },
          }}
        />
      </Paper>

      {/* Job Details Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { borderRadius: 3, p: 2 } }}
      >
        {selectedJob && (
          <>
            <DialogTitle fontWeight={700}>Job Details - {selectedJob.id}</DialogTitle>
            <Divider sx={{ mb: 2 }} />
            <DialogContent>
              <Typography variant="body1" fontWeight={600} mb={1}>
                {selectedJob.title}
              </Typography>
              <Typography variant="body2" mb={1}>
                <b>Pickup:</b> {selectedJob.pickupLocation} on {selectedJob.pickupDate}
              </Typography>
              <Typography variant="body2" mb={1}>
                <b>Drop:</b> {selectedJob.dropLocation} on {selectedJob.dropDate}
              </Typography>
              <Typography variant="body2" mb={1}>
                <b>Cargo:</b> {selectedJob.cargo}
              </Typography>
              <Typography variant="body2" mb={1}>
                <b>Truck:</b> {selectedJob.truck}
              </Typography>
              <Typography variant="body2" mb={1}>
                <b>Driver:</b> {selectedJob.driver}
              </Typography>
              <Typography variant="body2" mb={1}>
                <b>Customer:</b> {selectedJob.customer}
              </Typography>
              <Typography variant="body2" mb={1}>
                <b>Estimated Cost:</b> ₹{selectedJob.cost}
              </Typography>
              <Typography variant="body2">
                <b>Payment Status:</b>{" "}
                <Chip
                  label={selectedJob.paymentStatus}
                  color={selectedJob.paymentStatus === "Paid" ? "success" : "warning"}
                  size="small"
                  sx={{ fontWeight: "bold" }}
                />
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
