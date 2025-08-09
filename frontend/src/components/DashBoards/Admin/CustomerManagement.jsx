import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import  API  from "../../../services/api"; 

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [dialogMode, setDialogMode] = useState("view");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gst: "",
    status: "Active",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await API.get("/customer");
      setCustomers(response.data);
    } catch (err) {
     
      console.error("Failed to fetch customers", err);
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/customer/delete/${deleteId}`);
      fetchCustomers();
      setConfirmOpen(false);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    setDialogMode("view");
    setOpenDialog(true);
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setFormValues(customer);
    setDialogMode("edit");
    setOpenDialog(true);
  };

  const handleAdd = () => {
    setSelectedCustomer(null);
    setFormValues({
      name: "",
      email: "",
      phone: "",
      address: "",
      gst: "",
      status: "Active",
    });
    setDialogMode("add");
    setOpenDialog(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (dialogMode === "edit") {
        await API.put(`/customer/update/${selectedCustomer.id}`, formValues);
      } else if (dialogMode === "add") {
        await API.post("/customer", formValues);
      }
      fetchCustomers();
      setOpenDialog(false);
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const columns = [
    { field: "id", headerName: "Customer ID", width: 130 },
    { field: "name", headerName: "Name / Company", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "gst", headerName: "GST / Tax ID", width: 180 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) =>
        params.value === "Active" ? (
          <Chip label="Active" size="small" color="success" />
        ) : (
          <Chip label="Inactive" size="small" color="error" />
        ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="View Details">
            <IconButton size="small" color="info" onClick={() => handleView(params.row)}>
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small" color="primary" onClick={() => handleEdit(params.row)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => {
                setDeleteId(params.row.id);
                setConfirmOpen(true);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight={700}>
          Customer Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{ borderRadius: 2 }}
        >
          Add Customer
        </Button>
      </Box>

      <Box
        sx={{
          height: 500,
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: "0px 3px 8px rgba(0,0,0,0.08)",
        }}
      >
        <DataGrid
          rows={customers}
          columns={columns}
          getRowId={(row) => row.id}
          pageSize={7}
          rowsPerPageOptions={[7, 15, 30]}
          disableSelectionOnClick
        />
      </Box>

      {/* Add/Edit/View Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {dialogMode === "add"
            ? "Add New Customer"
            : dialogMode === "edit"
            ? `Edit Customer: ${selectedCustomer?.name}`
            : `Customer Details`}
        </DialogTitle>

        <DialogContent dividers>
          {dialogMode === "view" && selectedCustomer ? (
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {selectedCustomer.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Customer ID: {selectedCustomer.id}
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography>{selectedCustomer.email}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography>{selectedCustomer.phone}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Address
                  </Typography>
                  <Typography>{selectedCustomer.address}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    GST / Tax ID
                  </Typography>
                  <Typography>{selectedCustomer.gst}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip
                    label={selectedCustomer.status}
                    color={selectedCustomer.status === "Active" ? "success" : "error"}
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Pending Payments
                  </Typography>
                  <Typography>₹{selectedCustomer.pendingPayments}</Typography>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <>
              <TextField
                label="Name / Company"
                name="name"
                fullWidth
                margin="normal"
                value={formValues.name}
                onChange={handleFormChange}
              />
              <TextField
                label="Email"
                name="email"
                fullWidth
                margin="normal"
                value={formValues.email}
                onChange={handleFormChange}
              />
              <TextField
                label="Phone"
                name="phone"
                fullWidth
                margin="normal"
                value={formValues.phone}
                onChange={handleFormChange}
              />
              <TextField
                label="Address"
                name="address"
                fullWidth
                margin="normal"
                value={formValues.address}
                onChange={handleFormChange}
              />
              <TextField
                label="GST / Tax ID"
                name="gst"
                fullWidth
                margin="normal"
                value={formValues.gst}
                onChange={handleFormChange}
              />
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          {dialogMode !== "view" && (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this customer?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
