import React from "react";
import { Route } from "react-router-dom";
import Home from "../components/Landing/Home";
import User from "../components/logins/User";
import Signup from "../components/Signups/Signup";
import Unauthorized from "../components/Unauthorized"; 
import TrackOrderForm from "../pages/TrackOrderForm";
import AboutUs from "../pages/AboutUs";
import { Support } from "@mui/icons-material";
import SupportPage from "../pages/SupportPage";
import ForgetPassword from "../components/logins/ForgetPassword";
const PublicRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<User />} />
    <Route path="/forgot-password" element={<ForgetPassword/>} />
    <Route path="/signup" element={<Signup />} />
       <Route path="/track-order" element={<TrackOrderForm/>} />
       <Route path="/about-us" element={<AboutUs/>} />
       <Route path="/support" element={<SupportPage/>} />
       
    <Route path="/unauthorized" element={<Unauthorized />} />

  </>
);

export default PublicRoutes;
