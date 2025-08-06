import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Chip,
  TextField,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

const initialDocs = [
  {
    id: 1,
    name: "DOT operating authority (MC)",
    date: "01/02/2025",
    size: "3 MB",
    status: "Pending",
    img: "/images/dot.png",
  },
  {
    id: 2,
    name: "Driver's license",
    date: "01/02/2025",
    size: "1 MB",
    status: "Reviewed",
    img: "/images/license.png",
  },
  {
    id: 3,
    name: "Vehicle registration",
    date: "01/02/2025",
    size: "3 MB",
    status: "Reviewed",
    img: "/images/vehicle.png",
  },
  {
    id: 4,
    name: "Livestock transport permit",
    date: "01/02/2025",
    size: "3 MB",
    status: "Expired",
    img: "/images/permit.png",
  },
];

export default function CompliancePage() {
  const [docs] = useState(initialDocs);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Filter Menu State
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterSelect = (status) => {
    setFilterStatus(status);
    setAnchorEl(null);
  };

  // Filtered Documents based on search and status filter
  const filteredDocs = docs.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "All" || doc.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ p: 3, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      {/* Top Section */}
      <Box
        sx={{
          bgcolor: "#fff",
          p: 2,
          borderRadius: 3,
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: "600", color: "#111827" }}>
          Total storage{" "}
          <Chip
            label={`${filteredDocs.length} documents • 291 MB`}
            size="small"
            sx={{
              bgcolor: "#f3f4f6",
              fontWeight: "500",
              ml: 1,
            }}
          />
        </Typography>

        {/* Search + Filter */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            size="small"
            placeholder="Search documents"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{
              bgcolor: "#f3f4f6",
              borderRadius: 3,
              "& fieldset": { border: "none" },
              width: 220,
            }}
          />
          <IconButton
            onClick={handleFilterClick}
            sx={{
              bgcolor: "#f3f4f6",
              "&:hover": { bgcolor: "#e5e7eb" },
              borderRadius: 3,
            }}
          >
            <FilterListIcon />
          </IconButton>

          {/* Filter Menu */}
          <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => handleFilterSelect("All")}>All</MenuItem>
            <MenuItem onClick={() => handleFilterSelect("Pending")}>Pending</MenuItem>
            <MenuItem onClick={() => handleFilterSelect("Reviewed")}>Reviewed</MenuItem>
            <MenuItem onClick={() => handleFilterSelect("Expired")}>Expired</MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Document Grid */}
      <Grid container spacing={2}>
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={doc.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
                  bgcolor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "all 0.2s ease",
                  height: 250,
                  "&:hover": { boxShadow: "0px 4px 10px rgba(0,0,0,0.12)" },
                }}
              >
                {/* Document Image */}
                <Box
                  component="img"
                  src={doc.img}
                  alt={doc.name}
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    height: 120,
                    objectFit: "cover",
                    mb: 1,
                  }}
                />

                {/* Document Name */}
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "600",
                    color: "#111827",
                    textAlign: "left",
                    alignSelf: "flex-start",
                    mb: 0.5,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: "100%",
                  }}
                >
                  {doc.name}
                </Typography>

                {/* Date & Size */}
                <Typography
                  variant="caption"
                  display="block"
                  sx={{
                    mb: 1,
                    color: "#6b7280",
                    textAlign: "left",
                    alignSelf: "flex-start",
                  }}
                >
                  {doc.date} • {doc.size}
                </Typography>

                {/* Status or Button */}
                <Box sx={{ mt: "auto", width: "100%" }}>
                  {doc.status === "Pending" ? (
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        textTransform: "none",
                        borderRadius: 10,
                        borderColor: "#d1d5db",
                        color: "#111827",
                        fontWeight: "500",
                        bgcolor: "#f9fafb",
                        "&:hover": { bgcolor: "#e5e7eb" },
                      }}
                    >
                      Review
                    </Button>
                  ) : (
                    <Chip
                      label={doc.status}
                      size="small"
                      sx={{
                        width: "100%",
                        borderRadius: 10,
                        bgcolor:
                          doc.status === "Reviewed"
                            ? "#e0fce4"
                            : doc.status === "Expired"
                            ? "#fee2e2"
                            : "#fff7ed",
                        color:
                          doc.status === "Reviewed"
                            ? "#16a34a"
                            : doc.status === "Expired"
                            ? "#dc2626"
                            : "#f59e0b",
                        fontWeight: "600",
                      }}
                    />
                  )}
                </Box>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" sx={{ p: 3, color: "#6b7280" }}>
            No documents found
          </Typography>
        )}
      </Grid>
    </Box>
  );
}
