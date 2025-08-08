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
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    
    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);

export default function DriverManagement() {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [driverToDelete, setDriverToDelete] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    role: "DRIVER",
    status: "ACTIVE",
    licenseNumber: "",
    vehicleId: null,
  });

  
  const fetchDrivers = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const response = await API.get("/drivers");
      setDrivers(response.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
     
      const errorMessage =
        error.response?.data?.message ||
        "Failed to fetch drivers. Please check your backend connection.";
      setApiError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const filteredDrivers = drivers.filter(
    (d) =>
      (d.firstName + " " + d.lastName)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      d.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = (driver = null) => {
    setEditingDriver(driver);
    setApiError(null);
    if (driver) {
      setFormData({
        firstName: driver.firstName || "",
        lastName: driver.lastName || "",
        username: driver.username || "",
        password: "",
        email: driver.email || "",
        phoneNumber: driver.phoneNumber || "",
        role: driver.role || "DRIVER",
        status: driver.status || "ACTIVE",
        licenseNumber: driver.licenseNumber || "",
        vehicleId: driver.vehicle ? driver.vehicle.id : null,
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
        phoneNumber: "",
        role: "DRIVER",
        status: "ACTIVE",
        licenseNumber: "",
        vehicleId: null,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingDriver(null);
    setApiError(null);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setApiError(null);
    try {
      const isNewDriver = !editingDriver;

      if (isNewDriver) {
        
        const createDriverPayload = { ...formData };
        
        const vehicleIdToAssign = createDriverPayload.vehicleId;
        delete createDriverPayload.vehicleId;

        
        const createResponse = await API.post("/drivers", createDriverPayload);
        const newDriver = createResponse.data;

       
        if (vehicleIdToAssign) {
          const assignResponse = await API.post(
            `/drivers/${newDriver.userId}/assign-vehicle/${vehicleIdToAssign}`
          );
          if (!assignResponse.status === 200) {
            console.error("Failed to assign vehicle to new driver.");
          }
        }
      } else {
        const updatePayload = { ...formData };
        if (!updatePayload.password) {
          delete updatePayload.password;
        }

       
        console.log("PUT request payload:", updatePayload);
        
        await API.put(`/drivers/${editingDriver.userId}`, updatePayload);
      }

      await fetchDrivers();
      handleCloseDialog();
    } catch (error) {
      console.error("Operation failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Operation failed due to an unknown error.";
      setApiError(errorMessage);
    }
  };

  const handleOpenDeleteConfirm = (driver) => {
    setDriverToDelete(driver);
    setOpenDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
    setDriverToDelete(null);
  };

  const handleDelete = async () => {
    if (!driverToDelete) return;
    setApiError(null);
    try {
      await API.delete(`/drivers/${driverToDelete.userId}`);
      await fetchDrivers();
      handleCloseDeleteConfirm();
    } catch (error) {
      console.error("Failed to delete driver:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to delete driver. Please try again.";
      setApiError(errorMessage);
    }
  };

  const renderStatus = (status) => {
    const isActive = status === "ACTIVE";
    return (
      <Chip
        icon={isActive ? <CheckCircleIcon /> : <CancelIcon />}
        label={isActive ? "Active" : "Inactive"}
        size="small"
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          bgcolor: isActive ? "#22c55e" : "#ef4444",
          color: "white",
          fontWeight: 600,
          fontSize: "12px",
          "& .MuiChip-icon": { color: "white !important", fontSize: "16px" },
        }}
      />
    );
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Driver Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            borderRadius: 2,
            bgcolor: "#2563eb",
            "&:hover": { bgcolor: "#1d4ed8" },
          }}
        >
          Add Driver
        </Button>
      </Box>

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
          placeholder="Search drivers..."
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ disableUnderline: true }}
        />
      </Paper>

      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiError}
        </Alert>
      )}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      ) : filteredDrivers.length === 0 ? (
        <Typography variant="body1" align="center" color="text.secondary" mt={4}>
          No drivers found.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredDrivers.map((driver) => (
            <Grid item xs={12} md={6} lg={4} key={driver.userId}>
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
                {renderStatus(driver.status)}
                <Box display="flex" alignItems="center" mb={1} mt={4}>
                  <Avatar
                    sx={{
                      bgcolor: "#e5e7eb",
                      mr: 2,
                      width: 50,
                      height: 50,
                      border: "2px solid #d1d5db",
                    }}
                  >
                    <DriveEtaIcon sx={{ color: "#374151" }} />
                  </Avatar>
                  <Box flexGrow={1}>
                    <Typography fontWeight={600}>{`${driver.firstName} ${driver.lastName}`}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {driver.phoneNumber}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" color="text.secondary" mb={1}>
                  License: <strong>{driver.licenseNumber}</strong>
                </Typography>
                <Box display="flex" justifyContent="flex-end" gap={1}>
                  <Tooltip title="Edit Driver">
                    <IconButton size="small" color="primary" onClick={() => handleOpenDialog(driver)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Driver">
                    <IconButton size="small" color="error" onClick={() => handleOpenDeleteConfirm(driver)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editingDriver ? "Edit Driver" : "Add New Driver"}</DialogTitle>
        <DialogContent dividers>
          {apiError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {apiError}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="License Number"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            {editingDriver ? null : (
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                label="Vehicle ID (Optional)"
                name="vehicleId"
                type="number"
                value={formData.vehicleId || ""}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  label="Status"
                  onChange={handleFormChange}
                >
                  <MenuItem value="ACTIVE">Active</MenuItem>
                  <MenuItem value="INACTIVE">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  label="Role"
                  onChange={handleFormChange}
                >
                  <MenuItem value="DRIVER">Driver</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingDriver ? "Save Changes" : "Add Driver"}
          </Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={openDeleteConfirm} onClose={handleCloseDeleteConfirm}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this driver?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
