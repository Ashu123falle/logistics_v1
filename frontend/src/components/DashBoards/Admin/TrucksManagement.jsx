import React, { useState, useEffect } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { postVehicle } from "../../../utilities/vehicle";
import  API  from "../../../services/api"; 


export default function TrucksManagement() {
  const [trucks, setTrucks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTruckId, setSelectedTruckId] = useState(null);
  const [newTruck, setNewTruck] = useState({
    registration: "",
    model: "",
    capacity: "",
    status: "Active",
    driverId: "",
  });

  useEffect(() => {
    const storedTrucks = localStorage.getItem("trucksData");
    if (storedTrucks) {
      setTrucks(JSON.parse(storedTrucks));
    } else {
      fetchTrucks();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("trucksData", JSON.stringify(trucks));
  }, [trucks]);

  const fetchTrucks = async () => {
    try {
      const response = await API.get("/vehicles");
      const backendTrucks = response.data.map((t) => ({
        ...t,
        status: t.status || "Active",
      }));
      setTrucks(backendTrucks);
    } catch (error) {
      console.warn("Backend not reachable. Using local data only.");
    }
  };

  const filteredTrucks = trucks.filter((t) =>
    (t.registration || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveTruck = async () => {
    if (!newTruck.registration || !newTruck.model || !newTruck.capacity) {
      alert("Please fill in all required fields.");
      return;
    }

    if (editMode && selectedTruckId) {
      setTrucks((prev) =>
        prev.map((t) => (t.id === selectedTruckId ? { ...t, ...newTruck } : t))
      );

      try {
        await API.put(`/vehicles/${selectedTruckId}`, newTruck);
      } catch {
        console.warn("Backend update failed. Data saved locally only.");
      }
    } else {
      const tempTruck = {
        ...newTruck,
        id: Date.now(),
      };
      setTrucks((prev) => [...prev, tempTruck]);

      try {
        const savedTruck = await postVehicle(newTruck);
        setTrucks((prev) =>
          prev.map((t) => (t.id === tempTruck.id ? { ...savedTruck } : t))
        );
      } catch {
        console.warn("Backend save failed. Truck stored locally only.");
      }
    }
    resetForm();
  };

  const handleEditTruck = (truck) => {
    setNewTruck({ ...truck });
    setSelectedTruckId(truck.id);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDeleteTruck = (id) => {
    if (!window.confirm("Are you sure you want to delete this truck?")) return;

    setTrucks((prev) => prev.filter((t) => t.id !== id));

    try {
      API.delete(`/vehicles/${id}`);
    } catch {
      console.warn("Backend delete failed. Removed locally only.");
    }
  };

  const handleStatusChange = (truckId, newStatus) => {
    setTrucks((prev) =>
      prev.map((t) => (t.id === truckId ? { ...t, status: newStatus } : t))
    );
  };

  const resetForm = () => {
    setNewTruck({
      registration: "",
      model: "",
      capacity: "",
      status: "Active",
      driverId: "",
    });
    setSelectedTruckId(null);
    setEditMode(false);
    setOpenDialog(false);
  };

  const getStatusChip = (status) => {
    switch (status) {
      case "Active":
        return (
          <Chip
            icon={<CheckCircleIcon />}
            label="Active"
            size="small"
            sx={{ bgcolor: "#22c55e", color: "#fff", fontWeight: 600 }}
          />
        );
      case "Under Maintenance":
        return (
          <Chip
            icon={<BuildCircleIcon />}
            label="Maintenance"
            size="small"
            sx={{ bgcolor: "#f59e0b", color: "#fff", fontWeight: 600 }}
          />
        );
      default:
        return (
          <Chip
            icon={<DeleteIcon />}
            label="Inactive"
            size="small"
            sx={{ bgcolor: "#ef4444", color: "#fff", fontWeight: 600 }}
          />
        );
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          Trucks Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            resetForm();
            setOpenDialog(true);
          }}
          sx={{
            borderRadius: 2,
            bgcolor: "#2563eb",
            "&:hover": { bgcolor: "#1d4ed8" },
          }}
        >
          Add Truck
        </Button>
      </Box>

      {/* Search Bar */}
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
          <Grid item xs={12} md={6} lg={4} key={truck.id || truck.registration}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 3,
                boxShadow: "0px 3px 8px rgba(0,0,0,0.08)",
                bgcolor: "#fff",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0px 6px 12px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Box display="flex" alignItems="center" mb={1} gap={2}>
                <Avatar sx={{ bgcolor: "#e5e7eb", width: 50, height: 50 }}>
                  <LocalShippingIcon sx={{ color: "#374151" }} />
                </Avatar>
                <Box flexGrow={1}>
                  <Typography fontWeight={600}>
                    {truck.registration || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {truck.model || "N/A"}
                  </Typography>
                </Box>
                {getStatusChip(truck.status)}
              </Box>

              <Divider sx={{ my: 1 }} />

              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Capacity: <strong>{truck.capacity || "N/A"}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Driver ID: <strong>{truck.driverId || "Unassigned"}</strong>
              </Typography>

              {/* Status Change Dropdown */}
              <FormControl size="small" fullWidth>
                <Select
                  value={truck.status}
                  onChange={(e) => handleStatusChange(truck.id, e.target.value)}
                  labelId={`status-label-${truck.id}`}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>

              <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
                <Tooltip title="Edit Truck">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEditTruck(truck)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Truck">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteTruck(truck.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Truck Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? "Edit Truck" : "Add New Truck"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Registration Number"
            fullWidth
            margin="normal"
            value={newTruck.registration}
            onChange={(e) => setNewTruck({ ...newTruck, registration: e.target.value })}
          />
          <TextField
            label="Model / Make"
            fullWidth
            margin="normal"
            value={newTruck.model}
            onChange={(e) => setNewTruck({ ...newTruck, model: e.target.value })}
          />
          <TextField
            label="Capacity"
            fullWidth
            margin="normal"
            value={newTruck.capacity}
            onChange={(e) => setNewTruck({ ...newTruck, capacity: e.target.value })}
          />

          {/* Status Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              value={newTruck.status}
              labelId="status-label"
              label="Status"
              onChange={(e) => setNewTruck({ ...newTruck, status: e.target.value })}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Driver ID (optional)"
            fullWidth
            margin="normal"
            value={newTruck.driverId}
            onChange={(e) => setNewTruck({ ...newTruck, driverId: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={resetForm}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveTruck}>
            {editMode ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
