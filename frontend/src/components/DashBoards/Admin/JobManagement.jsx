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

import API from "../../../services/api";

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const pageSize = 7;
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (page = pageNo) => {
    setLoading(true);
    try {
      const ordersRes = await API.get("/delivery-orders/all", {
        params: {
          pageNo: page,
          pageSize,
        },
      });

      const jobsWithRoutes = await Promise.all(
        (ordersRes.data || []).map(async (order) => {
          if (order.routeId) {
            try {
              const routeRes = await API.get(`/routes/${order.routeId}`);
              return { ...order, route: routeRes.data };
            } catch (err) {
              console.error(`Error fetching route ${order.routeId}:`, err);
              return { ...order, route: null };
            }
          }
          return { ...order, route: null };
        })
      );

      setJobs(jobsWithRoutes);
      setPageNo(page);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(pageNo);
  }, [pageNo]);

  useEffect(() => {
    const interval = setInterval(() => fetchJobs(pageNo), 900000); // refresh every 15 mins
    return () => clearInterval(interval);
  }, []);

  const handleViewDetails = (job) => console.log("Viewing job:", job);
  const handleEdit = (job) => console.log("Editing job:", job);
  const handleDelete = async (jobId) => {
    try {
      await API.delete(`/delivery-orders/${jobId}`);
      fetchJobs(pageNo);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  const handleAssignDriver = (job) => alert(`Assign driver to Job ID: ${job.id}`);

  const handleNext = () => setPageNo((prev) => prev + 1);
  const handlePrevious = () => setPageNo((prev) => (prev > 1 ? prev - 1 : 1));

  const columns = [
    { field: "id", headerName: "Job ID", width: 100 },
    {
      field: "pickupLocation",
      headerName: "Pickup Location",
      flex: 1,
      valueGetter: (params) => params?.row?.route?.sourceAddress || "N/A",
    },
    {
      field: "deliveryLocation",
      headerName: "Delivery Location",
      flex: 1,
      valueGetter: (params) => params?.row?.route?.destinationAddress || "N/A",
    },
    {
      field: "scheduledPickupDate",
      headerName: "Pickup Date",
      flex: 1,
      valueGetter: (params) =>
        params?.value ? new Date(params.value).toLocaleDateString() : "N/A",
    },
    {
      field: "scheduledDeliveryDate",
      headerName: "Delivery Date",
      flex: 1,
      valueGetter: (params) =>
        params?.value ? new Date(params.value).toLocaleDateString() : "N/A",
    },
    { field: "status", headerName: "Status", flex: 1 },
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
    <GridToolbarContainer sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
      <Button startIcon={<AddIcon />} variant="contained" onClick={() => alert("Add new job")}>
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

      <Box mb={2} display="flex" alignItems="center" gap={1}>
        <Button variant="outlined" onClick={() => fetchJobs(pageNo)} disabled={loading}>
          Refresh Now
        </Button>
        <Button variant="contained" onClick={handlePrevious} disabled={pageNo === 1 || loading}>
          Previous
        </Button>
        <Typography>Page: {pageNo}</Typography>
        <Button variant="contained" onClick={handleNext} disabled={loading}>
          Next
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 2 }}>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={jobs}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[pageSize]}
            loading={loading}
            components={{ Toolbar: CustomToolbar }}
            getRowId={(row) => row.id}
            pagination={false} // manual pagination
          />
        </div>
      </Paper>
    </Box>
  );
};

export default JobManagement;
