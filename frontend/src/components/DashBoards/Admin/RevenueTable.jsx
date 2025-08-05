import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

const rowsData = [
  { source: "Jobs", revenue: 92300, spread: "10-15%", notes: "Primary source" },
  { source: "Direct Deals", revenue: 60000, spread: "8%", notes: "Manual agreements" },
  { source: "Insurance", revenue: 100000, spread: "12%", notes: "Partnership income" },
];

export default function RevenueTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [filterOption, setFilterOption] = useState("All");

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterSelect = (option) => {
    setFilterOption(option);
    setFilterAnchorEl(null);
  };

  // Apply both search and filter
  const filteredRows = rowsData
    .filter((row) =>
      row.source.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((row) => {
      if (filterOption === "High Revenue") return row.revenue > 80000;
      if (filterOption === "Low Revenue") return row.revenue <= 80000;
      return true;
    });

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "#fff",
        border: "1px solid #e5e7eb",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      {/* Header with search and filter */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Revenue streams table
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          {/* Search Bar */}
          <TextField
            size="small"
            placeholder="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              sx: { borderRadius: "12px", background: "#f9fafb" },
            }}
          />

          {/* Filter Button */}
          <Button
            size="small"
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleFilterClick}
            sx={{ textTransform: "none", borderRadius: "12px" }}
          >
            {filterOption}
          </Button>

          {/* Filter Dropdown Menu */}
          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterClose}
          >
            <MenuItem onClick={() => handleFilterSelect("All")}>All</MenuItem>
            <MenuItem onClick={() => handleFilterSelect("High Revenue")}>
              High Revenue(80k)
            </MenuItem>
            <MenuItem onClick={() => handleFilterSelect("Low Revenue")}>
              Low Revenue ( ≤ 80k )
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Source</TableCell>
            <TableCell>Revenue</TableCell>
            <TableCell>Spread %</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.length > 0 ? (
            filteredRows.map((row) => (
              <TableRow key={row.source}>
                <TableCell>{row.source}</TableCell>
                <TableCell>${row.revenue.toLocaleString()}</TableCell>
                <TableCell>{row.spread}</TableCell>
                <TableCell>{row.notes}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}
