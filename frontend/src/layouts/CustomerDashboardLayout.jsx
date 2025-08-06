import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const CustomerDashboardLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Box sx={{ p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerDashboardLayout;
