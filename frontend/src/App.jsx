import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Public Components
import Home from "./components/Landing/Home";
import User from "./components/logins/User";
import Signup from "./components/Signups/Signup";

// Admin Dashboard Components
import AdminDashBoard from "./components/DashBoards/Admin/AdminDashBoard";
import Tracking from "./components/DashBoards/Admin/Tracking";
// import DashBoard from "./components/DashBoards/Admin/DashBoard";
import CompliancePage from "./components/DashBoards/Admin/CompliancePage";
import PaymentReceipts from "./components/DashBoards/Admin/PaymentReceipts";
import Payment from "./components/DashBoards/Admin/Payment";
// import DriverManagement from "./components/DashBoards/Admin/DriverManagement";
import TrucksManagement from "./components/DashBoards/Admin/TrucksManagement";
import CustomerManagement from "./components/DashBoards/Admin/CustomerManagement";
import JobManagement from "./components/DashBoards/Admin/JobManagement";

// Driver Dashboard Components
import DriverDashboardLayout from "./components/DashBoards/Driver/DriverDashboardLayout";
import DriverDashboardHome from "./components/DashBoards/Driver/DriverDashboardHome";
import MyTrips from "./components/DashBoards/Driver/MyTrips";
import RouteDetails from "./components/DashBoards/Driver/RouteDetails";
import Payments from "./components/DashBoards/Driver/Payments";
import Documents from "./components/DashBoards/Driver/Documents";
import Settings from "./components/DashBoards/Driver/Settings";
import Logout from "./components/DashBoards/Driver/Logout";

// Customer Dashboard Components
import CustomerDashboardLayout from "./layouts/CustomerDashboardLayout";
// import Dashboard from "./pages/customer/Dashboard";
import TrackShipment from "./pages/customer/TrackShipment";
import Invoices from "./pages/customer/Invoices";
import Support from "./pages/customer/Support";
import PlaceOrder from "./pages/customer/PlaceOrder";
import { Dashboard } from "@mui/icons-material";



function App() {
  return (
    // <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        {/* <Route path="/" element={<Home />} />
        <Route path="/login" element={<User />} />
        <Route path="/signup" element={<Signup />} /> */}

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashBoard />}>
          {/* <Route path="dashboard" element={<DashBoard/>} /> */}
          <Route path="tracking" element={<Tracking />} />
          <Route path="tracking/:orderId" element={<Tracking />} />
          <Route path="payments" element={<Payment />} />
          <Route path="payment-receipts" element={<PaymentReceipts />} />
          <Route path="file-uploads" element={<CompliancePage />} />
          <Route path="Customermanagement" element={<CustomerManagement />} />
          {/* <Route path="driver" element={<DriverManagement />} /> */}
          <Route path="trucks" element={<TrucksManagement />} />
          <Route path="jobs" element={<JobManagement />} />
        </Route>

        {/* Driver Dashboard */}
        {/* <Route path="/driver" element={<DriverDashboardLayout />}>
          <Route index element={<DriverDashboardHome />} />
          <Route path="trips" element={<MyTrips />} />
          <Route path="routes/:routeName" element={<RouteDetails />} />
          <Route path="payments" element={<Payments />} />
          <Route path="documents" element={<Documents />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logout" element={<Logout />} />
        </Route> */}

        {/* Customer Dashboard */}
        {/* <Route path="/customer" element={<CustomerDashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="track" element={<TrackShipment />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="support" element={<Support />} />
          <Route path="place-order" element={<PlaceOrder />} />
        </Route>

        {/* Redirect base route */}
        {/* <Route path="*" element={<Navigate to="/" />} />  */}
        
      </Routes>
    // </BrowserRouter>
  );
}

export default App;
