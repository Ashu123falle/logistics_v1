import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DriverDashboardLayout from "../components/DashBoards/Driver/DriverDashboardLayout";
import DriverDashboardHome from "../components/DashBoards/Driver/DriverDashboardHome";
import MyTrips from "../components/DashBoards/Driver/MyTrips";
import RouteDetails from "../components/DashBoards/Driver/RouteDetails";
import Payments from "../components/DashBoards/Driver/Payments";
import Documents from "../components/DashBoards/Driver/Documents";
import Settings from "../components/DashBoards/Driver/Settings";
import Logout from "../components/DashBoards/Driver/Logout";
import DriverLayout from "../pages/driver/DriverLayout";
import DriverDashboard from "../pages/driver/DriverDashboard";
import DriverDeliveries from "../pages/driver/DriverDeliveries";
import DriverProfile from "../pages/driver/DriverProfile";
import DriverRouteMap from "../pages/driver/DriverRouteMap";

const DriverRoutes = (
  <Route element={<PrivateRoute allowedRoles={["ROLE_DRIVER"]} />}>
    {/* <Route path="/driver" element={<DriverDashboardLayout />}>
      <Route index element={<DriverDashboardHome />} />
      <Route path="trips" element={<MyTrips />} />
      <Route path="routes/:routeName" element={<RouteDetails />} />
      <Route path="payments" element={<Payments />} />
      <Route path="documents" element={<Documents />} />
      <Route path="settings" element={<Settings />} />
      <Route path="logout" element={<Logout />} />
    </Route> */}

      <Route path="/driver" element={<DriverLayout />}>
        <Route index element={<DriverDashboard />} />
        {/* <Route path="trips" element={<MyTrips />} /> */}
        <Route path="deliveries" element={<DriverDeliveries />} />
        <Route path="dashboard" element={<DriverDashboard />} />
        <Route path="profile" element={<DriverProfile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="route/:routeId" element={<DriverRouteMap />} />

      </Route>

  </Route>
);

export default DriverRoutes;
