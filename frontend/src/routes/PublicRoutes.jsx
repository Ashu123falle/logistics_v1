import React from "react";
import { Route } from "react-router-dom";
import Home from "../components/Landing/Home";
import User from "../components/logins/User";
import Signup from "../components/Signups/Signup";
import Unauthorized from "../components/Unauthorized"; 
import TrackOrderForm from "../pages/TrackOrderForm";
import ForgotPassword from "../components/logins/ForgetPassword";
import AboutUs from "../pages/AboutUs";
import { Support } from "@mui/icons-material";
import SupportPage from "../pages/SupportPage";
import VerifyOtp from "../components/VerifyOtp";
const PublicRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<User />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forgot-password" element={<ForgotPassword />} /> 
    <Route path="/verify-otp" element={<VerifyOtp />} /> 
    {/* <Route path="/forgot-password" element={<div>Forgot Password Page</div>} /> */}
    <Route path="/track-order" element={<TrackOrderForm/>} />
    <Route path="/about-us" element={<AboutUs/>} />
    <Route path="/support" element={<SupportPage/>} />
       
    <Route path="/unauthorized" element={<Unauthorized />} />

  </>
);

export default PublicRoutes;
