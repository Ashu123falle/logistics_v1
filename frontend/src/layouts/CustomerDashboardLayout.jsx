import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import CustomerNavbar from "../pages/customer/CustomerNavbar";

const CustomerDashboardLayout = () => {
  const [userData, setUserData] = useState({});
  const { auth } = useAuth();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const res = await API.post(`/customer/${auth.userId}`);
        setUserData(res.data);
      } catch (err) {
        console.error("Error fetching customer data:", err);
      }
    };
    if (auth?.userId) {
      fetchCustomerData();
    }
  }, [auth?.userId]);

  return (
    <>
    <CustomerNavbar/>
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      {/* <Sidebar
        userData={userData}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        /> */}

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "#f5f5f5",
          width: { xs: "100%", md: `calc(100% - 240px)` }, // 240px is drawer width
        }}
        >
        <Outlet />
      </Box>
    </Box>
        </>
  );
};

export default CustomerDashboardLayout;
