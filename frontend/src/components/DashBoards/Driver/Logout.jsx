import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session/token if needed
    navigate("/login");
  }, [navigate]);

  return null;
}
