// src/routes/AdminRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AdminDashBoard from "../components/DashBoards/Admin/AdminDashBoard";
import Tracking from "../components/DashBoards/Admin/Tracking";
import CompliancePage from "../components/DashBoards/Admin/CompliancePage";
import PaymentReceipts from "../components/DashBoards/Admin/PaymentReceipts";
import Payment from "../components/DashBoards/Admin/Payment";
import TrucksManagement from "../components/DashBoards/Admin/TrucksManagement";
import CustomerManagement from "../components/DashBoards/Admin/CustomerManagement";
import JobManagement from "../components/DashBoards/Admin/JobManagement";

const AdminRoutes = (
  <Route element={<PrivateRoute allowedRoles={["ROLE_ADMIN"]} />}>
    <Route path="/admin" element={<AdminDashBoard />}>
      <Route path="tracking" element={<Tracking />} />
      <Route path="tracking/:orderId" element={<Tracking />} />
      <Route path="payments" element={<Payment />} />
      <Route path="payment-receipts" element={<PaymentReceipts />} />
      <Route path="file-uploads" element={<CompliancePage />} />
      <Route path="customermanagement" element={<CustomerManagement />} />
      <Route path="trucks" element={<TrucksManagement />} />
      <Route path="jobs" element={<JobManagement />} />
    </Route>
  </Route>
);

export default AdminRoutes;
