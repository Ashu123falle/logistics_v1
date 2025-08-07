import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CustomerDashboardLayout from "../layouts/CustomerDashboardLayout";
import Dashboard from "../pages/customer/Dashboard";
// import TrackShipment from "../pages/customer/TrackShipment";
// import Invoices from "../pages/customer/Invoices";
import Support from "../pages/customer/Support";
import PlaceOrder from "../pages/customer/PlaceOrder";

const CustomerRoutes = (
  <Route element={<PrivateRoute allowedRoles={["ROLE_CUSTOMER"]} />}>
    <Route path="/customer" element={<CustomerDashboardLayout />}>
      <Route path="dashboard" element={<Dashboard />} />
      {/* <Route path="track" element={<TrackShipment />} /> */}
      {/* <Route path="invoices" element={<Invoices />} /> */}
      <Route path="support" element={<Support />} />
      <Route path="place-order" element={<PlaceOrder />} />
    </Route>
  </Route>
);

export default CustomerRoutes;
