import React, { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import API from "../../../services/api";

const defaultPosition = [19.0760, 72.8777]; // Mumbai

const PinSelector = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      onSelect([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const RouteStep = ({ data, setData, onContinue }) => {
  const [showSourceMap, setShowSourceMap] = useState(false);
  const [showDestMap, setShowDestMap] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(defaultPosition);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Validation errors state
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // Clear error on change
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handlePinConfirm = (type) => {
    const [lat, lng] = markerPosition;
    const updatedData = {
      ...data,
      [`${type}Latitude`]: lat,
      [`${type}Longitude`]: lng,
    };
    setData(updatedData);
    setSnackbarSeverity("success");
    setSnackbarMessage(
      `Pinned ${type === "source" ? "Source" : "Destination"} Location at [${lat.toFixed(
        4
      )}, ${lng.toFixed(4)}]`
    );
    if (type === "source") setShowSourceMap(false);
    else setShowDestMap(false);

    // Clear related coordinate errors on pin
    setErrors((prev) => ({
      ...prev,
      [`${type}Latitude`]: "",
      [`${type}Longitude`]: "",
    }));
  };

  const renderMapDialog = (type) => {
    const open = type === "source" ? showSourceMap : showDestMap;
    return (
      <Dialog
        open={open}
        onClose={() => (type === "source" ? setShowSourceMap(false) : setShowDestMap(false))}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>{`Select ${type === "source" ? "Source" : "Destination"} Location`}</DialogTitle>
        <DialogContent>
          <MapContainer center={defaultPosition} zoom={13} style={{ height: "300px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker
              position={markerPosition}
              icon={L.icon({
                iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
              })}
            />
            <PinSelector onSelect={setMarkerPosition} />
          </MapContainer>
          <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => handlePinConfirm(type)}>
            Confirm Location
          </Button>
        </DialogContent>
      </Dialog>
    );
  };

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!data.sourceAddress || data.sourceAddress.trim() === "") {
      newErrors.sourceAddress = "Source Address is required";
    }
    if (!data.destinationAddress || data.destinationAddress.trim() === "") {
      newErrors.destinationAddress = "Destination Address is required";
    }
    if (
      data.sourceLatitude === undefined ||
      data.sourceLatitude === null ||
      data.sourceLongitude === undefined ||
      data.sourceLongitude === null
    ) {
      newErrors.sourceLatitude = "Source location must be pinned on the map";
      newErrors.sourceLongitude = "Source location must be pinned on the map";
    }
    if (
      data.destinationLatitude === undefined ||
      data.destinationLatitude === null ||
      data.destinationLongitude === undefined ||
      data.destinationLongitude === null
    ) {
      newErrors.destinationLatitude = "Destination location must be pinned on the map";
      newErrors.destinationLongitude = "Destination location must be pinned on the map";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // valid if no errors
  };

  const handleSaveAndContinue = async () => {
    if (!validate()) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please fix validation errors before continuing.");
      return;
    }

    const routePayload = {
      sourceAddress: data.sourceAddress,
      destinationAddress: data.destinationAddress,
      sourceLatitude: data.sourceLatitude,
      sourceLongitude: data.sourceLongitude,
      destinationLatitude: data.destinationLatitude,
      destinationLongitude: data.destinationLongitude,
    };

    try {
      const response = await API.post("/routes", routePayload);
      const resData = response.data;
      setData(resData);
      setSnackbarSeverity("success");
      setSnackbarMessage("Route saved successfully!");
      if (onContinue) onContinue(resData);
    } catch (error) {
      console.error("❌ Error saving route:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Network error or invalid coordinates. Please try again.");
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Route Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Source Address"
            name="sourceAddress"
            value={data.sourceAddress || ""}
            onChange={handleChange}
            error={!!errors.sourceAddress}
            helperText={errors.sourceAddress}
          />
          <Button variant="outlined" sx={{ mt: 1 }} onClick={() => setShowSourceMap(true)}>
            Pin Source Location
          </Button>
          {(errors.sourceLatitude || errors.sourceLongitude) && (
            <Typography color="error" variant="caption">
              Source location must be pinned on the map.
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Destination Address"
            name="destinationAddress"
            value={data.destinationAddress || ""}
            onChange={handleChange}
            error={!!errors.destinationAddress}
            helperText={errors.destinationAddress}
          />
          <Button variant="outlined" sx={{ mt: 1 }} onClick={() => setShowDestMap(true)}>
            Pin Destination Location
          </Button>
          {(errors.destinationLatitude || errors.destinationLongitude) && (
            <Typography color="error" variant="caption">
              Destination location must be pinned on the map.
            </Typography>
          )}
        </Grid>
      </Grid>

      {renderMapDialog("source")}
      {renderMapDialog("destination")}

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={handleSaveAndContinue}
      >
        Save Route & Continue
      </Button>

      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={4000}
        onClose={() => setSnackbarMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbarSeverity} onClose={() => setSnackbarMessage("")} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RouteStep;
