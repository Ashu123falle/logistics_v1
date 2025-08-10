import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import  API  from "../../../services/api";

const JobManagement = () => {
//   const API = axios.create({
//   baseURL: "http://localhost:8080/api",
// });

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
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    console.log("fetching..");
    
    try {
      const response = await API.get("/delivery-orders/all");
      console.log(response);
      
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // useEffect(() => {
  //   fetchJobs(); 
  //   const interval = setInterval(fetchJobs, 10000);
  //   return () => clearInterval(interval);
  // }, [jobs]);

  const handleViewDetails = (job) => {
    console.log("Viewing job:", job);
  };

  const handleEdit = (job) => {
    console.log("Editing job:", job);
  };

  const handleDelete = async (jobId) => {
    try {
      await API.delete(`/delivery-orders/${jobId}`);
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleAssignDriver = (job) => {
    alert(`Assign driver to Job ID: ${job.id}`);
  };

  const columns = [
    { field: "id", headerName: "Job ID", width: 100 },
    {
      field: "pickupLocation",
      headerName: "Pickup Location",
      flex: 1,
      valueGetter: (params) => params.row.route?.pickupLocation || "N/A",
    },
    {
      field: "deliveryLocation",
      headerName: "Delivery Location",
      flex: 1,
      valueGetter: (params) => params.row.route?.deliveryLocation || "N/A",
    },
    {
      field: "scheduledPickupDate",
      headerName: "Pickup Date",
      flex: 1,
      valueGetter: (params) =>
        new Date(params.row.scheduledPickupDate).toLocaleDateString(),
    },
    {
      field: "scheduledDeliveredDate",
      headerName: "Delivery Date",
      flex: 1,
      valueGetter: (params) =>
        new Date(params.row.scheduledDeliveredDate).toLocaleDateString(),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <IconButton color="primary" onClick={() => handleViewDetails(params.row)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="info" onClick={() => handleAssignDriver(params.row)}>
            <PersonAddIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        sx={{ mb: 1 }}
        onClick={() => alert("Add new job")}
      >
        Add Job
      </Button>
      <GridToolbarExport />
    </GridToolbarContainer>
  );

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Job Management
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={jobs}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
            components={{ Toolbar: CustomToolbar }}
            getRowId={(row) => row.id}
          />
        </div>
      </Paper>
    </Box>
  );
};

export default JobManagement;
