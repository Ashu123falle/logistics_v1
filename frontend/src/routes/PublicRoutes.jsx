import React from "react";
import { Route } from "react-router-dom";
import Home from "../components/Landing/Home";
import User from "../components/logins/User";
import Signup from "../components/Signups/Signup";
import Unauthorized from "../components/Unauthorized"; 
const PublicRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<User />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/unauthorized" element={<Unauthorized />} />

  </>
);

export default PublicRoutes;
