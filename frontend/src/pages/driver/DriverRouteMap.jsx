import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import axios from "axios";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext"; 
import L from "leaflet";
import truckIconImg from "../../assets/box-truck.png";

const OPENROUTESERVICE_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6Ijc5MjZjYTE4MDRkMzQ4ZjBhNTRlODJhZWViOWM4ZmE5IiwiaCI6Im11cm11cjY0In0="; // 🔁 Replace with your key

const truckIcon = L.icon({
  iconUrl: truckIconImg,
  iconSize: [40, 40],     // size of the icon (adjust as needed)
  iconAnchor: [20, 40],   // point of the icon which corresponds to marker's location
  popupAnchor: [0, -40],  // point from which the popup should open relative to the iconAnchor
});


// Dynamic map view controller like Google Maps
const FlyToDriver = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 1.5 });
    }
  }, [position, map]);
  return null;
};

const DriverRouteMap = () => {
    const { auth } = useAuth();
  
  const { routeId } = useParams();
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tracking, setTracking] = useState(false);
  const [driverPosition, setDriverPosition] = useState(null);
  const [liveRoutePoints, setLiveRoutePoints] = useState([]);
  const [liveEta, setLiveEta] = useState(null);
  const intervalRef = useRef(null);

  // Decode backend polyline geometry
  const decodePolyline = (encoded) => {
    let points = [], index = 0, lat = 0, lng = 0;
    while (index < encoded.length) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0; result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push([lat / 1e5, lng / 1e5]);
    }
    return points;
  };

  const fetchRouteDetails = async () => {
    try {
      const response = await API.get(`/routes/${routeId}`);
      setRouteData(response.data);
    } catch (error) {
      console.error("Failed to fetch route data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLiveRoute = async (fromLat, fromLng, toLat, toLng) => {
  try {
    const response = await axios.post(
      "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
      {
        coordinates: [
          [fromLng, fromLat], // driver's current
          [sourceLongitude, sourceLatitude], // source
          [toLng, toLat], // destination
        ],
      },
      {
        headers: {
          Authorization: OPENROUTESERVICE_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const coords = response.data.features[0].geometry.coordinates.map(
      ([lng, lat]) => [lat, lng]
    );
    const etaSeconds = response.data.features[0].properties.summary.duration;
    setLiveRoutePoints(coords);
setLiveEta((etaSeconds / 60).toFixed(1));
  } catch (err) {
    console.error("Failed to fetch live route:", err);
  }
};


  const startTracking = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setTracking(true);

   const sendLocation = () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      const driverId = auth.userId; // adjust to your storage
      console.log("Sending location to backend:",driverId, latitude, longitude);
      setDriverPosition([latitude, longitude]);

      try {
        await API.post("/drivers/update-location", {
          driverId,
          latitude,
          longitude,
        });
      } catch (err) {
        console.error("Failed to update location:", err);
      }

      fetchLiveRoute(
        latitude,
        longitude,
        routeData.destinationLatitude,
        routeData.destinationLongitude
      );
    },
    (error) => {
      console.error("Error getting location:", error);
    }
  );
};

sendLocation(); // Immediately
intervalRef.current = setInterval(sendLocation, 900000); // Every 15 mins
  };

  const stopTracking = () => {
    clearInterval(intervalRef.current);
    setTracking(false);
    setLiveRoutePoints([]);
    setDriverPosition(null);
    setLiveEta(null);
  };

  useEffect(() => {
    fetchRouteDetails();
    return () => clearInterval(intervalRef.current);
  }, [routeId]);

  if (loading) return <CircularProgress />;
  if (!routeData) return <Typography>Error loading route data.</Typography>;

  const {
    sourceLatitude,
    sourceLongitude,
    destinationLatitude,
    destinationLongitude,
    sourceAddress,
    destinationAddress,
    distance,
    duration,
    geometry,
  } = routeData;

  const routePoints = geometry ? decodePolyline(geometry) : [];

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Route Navigation
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography><strong>From:</strong> {sourceAddress}</Typography>
        <Typography><strong>To:</strong> {destinationAddress}</Typography>
        <Typography><strong>Distance:</strong> {distance?.toFixed(2)} km</Typography>
        <Typography>
  <strong>ETA:</strong>{" "}
  {liveEta
    ? liveEta > 60
      ? `${(liveEta / 60).toFixed(2)} hrs`
      : `${liveEta} mins`
    : duration > 60
    ? `${(duration / 60).toFixed(2)} hrs`
    : `${duration?.toFixed(2)} mins`}
</Typography>

        <Box mt={2}>
          {!tracking ? (
            <Button variant="contained" color="primary" onClick={startTracking}>
              Start Trip
            </Button>
          ) : (
            <Button variant="outlined" color="secondary" onClick={stopTracking}>
              Stop Trip
            </Button>
          )}
        </Box>
      </Paper>

      <MapContainer
        center={[sourceLatitude, sourceLongitude]}
        zoom={13}
        style={{ height: "60vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Static Markers */}
        <Marker position={[sourceLatitude, sourceLongitude]}>
          <Popup>Source: {sourceAddress}</Popup>
        </Marker>
        <Marker position={[destinationLatitude, destinationLongitude]}>
          <Popup>Destination: {destinationAddress}</Popup>
        </Marker>

        {/* Original backend route */}
        {routePoints.length > 0 && (
          <Polyline positions={routePoints} color="blue" />
        )}

        {/* Driver marker */}
        {driverPosition && (
  <>
    <Marker position={driverPosition} icon={truckIcon}>
      <Popup>Driver’s Current Location</Popup>
    </Marker>
    <FlyToDriver position={driverPosition} />
  </>
)}


        {/* Live dynamic route */}
        {liveRoutePoints.length > 0 && (
          <Polyline positions={liveRoutePoints} color="green" />
        )}
      </MapContainer>
    </Box>
  );
};

export default DriverRouteMap;
