// src/components/driver/DeliveryCard.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import MapIcon from "@mui/icons-material/Map";
import InfoIcon from "@mui/icons-material/Info";
import API from "../../services/api";

const statusColors = {
  PENDING: "warning",
  RECEIVED: "primary",
  IN_TRANSIT: "info",
  DELIVERED: "success",
  CANCELLED: "error",
  FAILED: "error",
};

const formatStatusLabel = (status) => {
  if (!status) return "Unknown";
  return status
    .toLowerCase()
    .split("_")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
};

const DeliveryCard = ({ delivery, onStatusChange }) => {
  const [openDetails, setOpenDetails] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [address, setAddress] = useState(null);
  const [loadingCustomer, setLoadingCustomer] = useState(true);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [localStatus, setLocalStatus] = useState(delivery.status);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!delivery.placedBy && !delivery.customerId) {
        setLoadingCustomer(false);
        return;
      }
      try {
        const res = await API.get(`/customer/${delivery.placedBy}`);
        const response = await API.get(`/routes/${delivery.address}`);
        setCustomer(res.data);
        setAddress(response.data);
      } catch (error) {
        console.error("Failed to load customer", error);
      } finally {
        setLoadingCustomer(false);
      }
    };
    fetchCustomer();
  }, [delivery.placedBy, delivery.customerId, delivery.address]);

  const handleNavigate = () => {
    navigate(`/driver/route/${delivery.routeId}`);
  };

  const handleCall = () => {
    if (customer?.phoneNumber) {
      window.open(`tel:${customer.phoneNumber}`, "_self");
    }
  };

  const handleDialogOpen = () => setOpenDetails(true);
  const handleDialogClose = () => setOpenDetails(false);

  const handleUploadDialogOpen = () => setOpenUploadDialog(true);
  const handleUploadDialogClose = () => {
    setOpenUploadDialog(false);
    setImages([]); // Reset after close
  };

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validImages = selectedFiles.filter((file) => {
      const isValid = file.type.startsWith("image/") && file.size > 0;
      return isValid;
    });

    if (validImages.length < selectedFiles.length) {
      alert("⚠️ Some files were skipped (empty or invalid).");
    }

    setImages(validImages);
  };

  const handleImageUpload = async () => {
    if (!images.length) {
      alert("❌ Please select at least one valid image.");
      return;
    }

    const formData = new FormData();
    images.forEach((file) => formData.append("images", file));
    formData.append("shipmentId", delivery.shipmentId);

    try {
      setUploading(true);
      const res = await API.post("/shipments/upload-images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Upload success:", res.data);
      alert("✅ Images uploaded successfully!");
      setImages([]);
      setOpenUploadDialog(false);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("❌ Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const statusLabel = formatStatusLabel(localStatus);

  return (
    <>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography variant="h6">
            Delivery ID: {delivery.deliveryId || delivery.id}
          </Typography>
          <Typography gutterBottom>Address: {delivery.address}</Typography>
          <Typography variant="body2">Date Assigned: {delivery.dateAssigned || "N/A"}</Typography>
          <Typography variant="body2">ETA: {delivery.eta || "N/A"}</Typography>

          <Box my={1}>
            <Chip label={statusLabel} color={statusColors[localStatus]} />
          </Box>

          <FormControl fullWidth variant="outlined" size="small" sx={{ mt: 1 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={localStatus}
              label="Status"
              onChange={(e) => {
                const newStatus = e.target.value;
                setLocalStatus(newStatus);
                onStatusChange(delivery.deliveryId, newStatus);
              }}
            >
              <MenuItem value="RECEIVED">RECEIVED</MenuItem>
              <MenuItem value="IN_TRANSIT">IN TRANSIT</MenuItem>
              <MenuItem value="DELIVERED">DELIVERED</MenuItem>
              <MenuItem value="FAILED">FAILED</MenuItem>
              <MenuItem value="CANCELLED">CANCELLED</MenuItem>
            </Select>
          </FormControl>

          {localStatus === "RECEIVED" && (
            <Box mt={2}>
              <Button variant="outlined" onClick={handleUploadDialogOpen}>
                Upload Shipment Images
              </Button>
            </Box>
          )}

          <Stack direction="row" spacing={1} justifyContent="end" mt={2}>
            <Tooltip title="Navigate">
              <IconButton onClick={handleNavigate}>
                <MapIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Call Customer">
              <span>
                <IconButton onClick={handleCall} disabled={!customer?.phoneNumber}>
                  <PhoneIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="More Info">
              <IconButton onClick={handleDialogOpen}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </CardContent>
      </Card>

      {/* Customer Details Dialog */}
      <Dialog open={openDetails} onClose={handleDialogClose} fullWidth maxWidth="md">
        <DialogTitle>Delivery Details</DialogTitle>
        <DialogContent dividers>
          {loadingCustomer ? (
            <Box display="flex" justifyContent="center" py={3}>
              <CircularProgress size={32} />
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" gap={2} py={1}>
              <Typography variant="body1">
                <strong>Customer:</strong> {customer?.firstName + " " + customer?.lastName || "N/A"}
              </Typography>

              <Typography variant="body1">
                <strong>Phone:</strong> {customer?.phoneNumber || "N/A"}
              </Typography>

              <Typography variant="body1">
                <strong>Source:</strong> {address?.sourceAddress || "N/A"}
              </Typography>

              <Typography variant="body1">
                <strong>Destination:</strong> {address?.destinationAddress || "N/A"}
              </Typography>

              {address?.destinationLatitude && address?.destinationLongitude && (
                <Button variant="contained" onClick={handleNavigate}>
                  Open in Map
                </Button>
              )}

              <Typography variant="body1">
                <strong>Current Status:</strong> {statusLabel}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Upload Image Dialog */}
      <Dialog open={openUploadDialog} onClose={handleUploadDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Upload Shipment Images</DialogTitle>
        <DialogContent dividers>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />

          {images.length > 0 && (
            <Box mt={2}>
              <Typography variant="subtitle2">Selected Files:</Typography>
              <ul>
                {images.map((img, i) => (
                  <li key={i}>{img.name}</li>
                ))}
              </ul>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUploadDialogClose} disabled={uploading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleImageUpload}
            disabled={uploading || images.length === 0}
          >
            {uploading ? "Uploading..." : "Upload Images"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeliveryCard;
