import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  IconButton,
  Divider,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const mockTrucks = [
  {
    id: "TRK001",
    registration: "MH12 AB1234",
    model: "Tata Ultra 1518",
    capacity: "8 Ton",
    status: "Active",
    driver: "John Smith",
  },
  {
    id: "TRK002",
    registration: "MH14 XY5678",
    model: "Ashok Leyland Ecomet",
    capacity: "6 Ton",
    status: "Under Maintenance",
    driver: "Jane Doe",
  },
  {
    id: "TRK003",
    registration: "MH10 CD7788",
    model: "Eicher Pro 3015",
    capacity: "10 Ton",
    status: "Inactive",
    driver: "Mike Johnson",
  },
];

export default function TrucksManagement() {
  const [trucks, setTrucks] = useState(mockTrucks);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const filteredTrucks = trucks.filter((t) =>
    t.registration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusChip = (status) => {
    switch (status) {
      case "Active":
        return (
          <Chip
            icon={<CheckCircleIcon />}
            label="Active"
            size="small"
            sx={{
              bgcolor: "#22c55e",
              color: "white",
              fontWeight: 600,
              fontSize: "12px",
            }}
          />
        );
      case "Under Maintenance":
        return (
          <Chip
            icon={<BuildCircleIcon />}
            label="Under Maintenance"
            size="small"
            sx={{
              bgcolor: "#f59e0b",
              color: "white",
              fontWeight: 600,
              fontSize: "12px",
            }}
          />
        );
      default:
        return (
          <Chip
            icon={<DeleteIcon />}
            label="Inactive"
            size="small"
            sx={{
              bgcolor: "#ef4444",
              color: "white",
              fontWeight: 600,
              fontSize: "12px",
            }}
          />
        );
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Trucks Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            borderRadius: 2,
            bgcolor: "#2563eb",
            "&:hover": { bgcolor: "#1d4ed8" },
          }}
        >
          Add Truck
        </Button>
      </Box>

      {/* Search */}
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
          mb: 3,
          borderRadius: 3,
          bgcolor: "#fff",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <SearchIcon sx={{ color: "gray", mx: 1 }} />
        <TextField
          variant="standard"
          placeholder="Search trucks by registration..."
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ disableUnderline: true }}
        />
      </Paper>

      {/* Truck Cards */}
      <Grid container spacing={2}>
        {filteredTrucks.map((truck) => (
          <Grid item xs={12} md={6} lg={4} key={truck.id}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 3,
                boxShadow: "0px 3px 8px rgba(0,0,0,0.08)",
                bgcolor: "#fff",
                position: "relative",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0px 6px 12px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Box display="flex" alignItems="center" mb={1} gap={2}>
                <Avatar
                  sx={{
                    bgcolor: "#e5e7eb",
                    width: 50,
                    height: 50,
                    border: "2px solid #d1d5db",
                  }}
                >
                  <LocalShippingIcon sx={{ color: "#374151" }} />
                </Avatar>
                <Box flexGrow={1}>
                  <Typography fontWeight={600}>{truck.registration}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {truck.model}
                  </Typography>
                </Box>
                {getStatusChip(truck.status)}
              </Box>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Capacity: <strong>{truck.capacity}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Driver: <strong>{truck.driver}</strong>
              </Typography>
              <Box display="flex" justifyContent="flex-end" gap={1}>
                <Tooltip title="Edit Truck">
                  <IconButton size="small" color="primary">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Truck">
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Truck Modal */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Truck</DialogTitle>
        <DialogContent>
          <TextField label="Registration Number" fullWidth margin="normal" />
          <TextField label="Model / Make" fullWidth margin="normal" />
          <TextField label="Capacity" fullWidth margin="normal" />
          <TextField label="Assign Driver" fullWidth margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
