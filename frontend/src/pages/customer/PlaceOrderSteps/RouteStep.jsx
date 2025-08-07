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
import { API } from "../../../utilities/api"
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

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlePinConfirm = (type) => {
    const [lat, lng] = markerPosition;
    const updatedData = {
      ...data,
      [`${type}Latitude`]: lat,
      [`${type}Longitude`]: lng,
    };
    setData(updatedData);
    setSnackbarMessage(
      `Pinned ${type === "source" ? "Source" : "Destination"} Location at [${lat.toFixed(4)}, ${lng.toFixed(4)}]`
    );
    if (type === "source") setShowSourceMap(false);
    else setShowDestMap(false);
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
          <MapContainer
            center={defaultPosition}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
          >
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
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => handlePinConfirm(type)}
          >
            Confirm Location
          </Button>
        </DialogContent>
      </Dialog>
    );
  };

  const handleSaveAndContinue = async () => {
    const token = localStorage.getItem("token");
    const routePayload = {
      sourceAddress: data.sourceAddress,
      destinationAddress: data.destinationAddress,
      sourceLatitude: data.sourceLatitude,
      sourceLongitude: data.sourceLongitude,
      destinationLatitude: data.destinationLatitude,
      destinationLongitude: data.destinationLongitude,
    };
    console.log(routePayload);
    
    try {

      const response = await API.post("/routes", routePayload);
      const resData = response.data;
      console.log(resData);
      setData(resData);
        // setSnackbarMessage("✅ Route saved successfully! id:" +resData.id);

        if (onContinue) onContinue(resData);

      
    } catch (error) {

      console.error("❌ Error saving route:", error);
      alert("❌ Network error or try choosing reachable coordinates");
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
          />
          <Button variant="outlined" sx={{ mt: 1 }} onClick={() => setShowSourceMap(true)}>
            Pin Source Location
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Destination Address"
            name="destinationAddress"
            value={data.destinationAddress || ""}
            onChange={handleChange}
          />
          <Button variant="outlined" sx={{ mt: 1 }} onClick={() => setShowDestMap(true)}>
            Pin Destination Location
          </Button>
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
        autoHideDuration={3000}
        onClose={() => setSnackbarMessage("")}
      >
        <Alert severity="success" onClose={() => setSnackbarMessage("")}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RouteStep;
