import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  Divider,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const CustomerProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user?.userId) {
      API.get(`/customer/${user.userId}`)
        .then((res) => {
          setProfile(res.data);
          setFormData(res.data);
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [user]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    API.put(`/customer/${user.userId}`, formData)
      .then((res) => {
        setProfile(res.data);
        setEditMode(false);
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  if (!profile) {
    return (
      <Typography variant="h6" sx={{ mt: 4, textAlign: "center" }}>
        Loading profile...
      </Typography>
    );
  }

  const fullName = `${profile.firstName} ${profile.lastName}`;
  const initials = `${profile.firstName?.[0] || ""}${profile.lastName?.[0] || ""}`;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      {/* Header */}
      <Paper sx={{ p: 3, display: "flex", alignItems: "center", gap: 3 }}>
        <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main", fontSize: 32 }}>
          {initials}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          {editMode ? (
            <>
              <TextField
                size="small"
                label="First Name"
                value={formData.firstName || ""}
                onChange={(e) => handleChange("firstName", e.target.value)}
                sx={{ mr: 1 }}
              />
              <TextField
                size="small"
                label="Last Name"
                value={formData.lastName || ""}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                {profile.email}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h5" fontWeight="bold">
                {fullName}
              </Typography>
              <Typography color="text.secondary">{profile.email}</Typography>
              <Typography color="text.secondary">{profile.phoneNumber}</Typography>
            </>
          )}
        </Box>
        {editMode ? (
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{ borderRadius: 2 }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={() => {
                setFormData(profile);
                setEditMode(false);
              }}
              sx={{ borderRadius: 2 }}
            >
              Cancel
            </Button>
          </Stack>
        ) : (
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setEditMode(true)}
            sx={{ borderRadius: 2 }}
          >
            Edit Profile
          </Button>
        )}
      </Paper>

      {/* Info Section */}
      <Paper sx={{ mt: 3, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Company Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {[
            { label: "Company Name", field: "companyName" },
            { label: "Industry Type", field: "industryType" },
            { label: "GST Number", field: "gstNumber" },
            { label: "PAN Number", field: "panNumber" },
            { label: "Company Address", field: "companyAddress", full: true },
          ].map(({ label, field, full }) => (
            <Grid item xs={12} sm={full ? 12 : 6} key={field}>
              <Typography fontWeight="bold">{label}</Typography>
              {editMode ? (
                <TextField
                  fullWidth
                  size="small"
                  value={formData[field] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                />
              ) : (
                <Typography>{profile[field] || "-"}</Typography>
              )}
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Contact Person */}
      <Paper sx={{ mt: 3, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Contact Person
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {[
            { label: "Name", field: "contactPersonName" },
            { label: "Phone", field: "contactPersonPhone" },
            { label: "Email", field: "companyEmail", full: true },
          ].map(({ label, field, full }) => (
            <Grid item xs={12} sm={full ? 12 : 6} key={field}>
              <Typography fontWeight="bold">{label}</Typography>
              {editMode ? (
                <TextField
                  fullWidth
                  size="small"
                  value={formData[field] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                />
              ) : (
                <Typography>{profile[field] || "-"}</Typography>
              )}
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default CustomerProfile;
