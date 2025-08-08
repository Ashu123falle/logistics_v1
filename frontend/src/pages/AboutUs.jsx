import React from "react";
import Footer from "../components/Landing/Footer"

import { Box, Typography, Grid, Paper } from "@mui/material";

export default function AboutUs() {
  return (
    <>
    <Box sx={{ bgcolor: "#f9f9fb" }}>
      {/* Header */}
      <Box sx={{ px: { xs: 2, md: 6 }, py: 8 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, mb: 3, textAlign: "center", color: "#1e1e2f" }}
          data-aos="fade-up"
        >
          About <span style={{ color: "#1976d2" }}>MoveBiz</span>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 6,
            maxWidth: "900px",
            mx: "auto",
            color: "#555",
            textAlign: "center",
          }}
          data-aos="fade-up"
        >
          <strong>MoveBiz</strong> is a B2B tech-driven logistics platform transforming how businesses ship
          goods across India. From express parcels to full truckloads, we empower enterprises with reliable,
          fast, and transparent transportation solutions.
        </Typography>
      </Box>

      {/* Mission Section */}
      <Box sx={{ px: { xs: 2, md: 6 }, py: 6, bgcolor: "#fff" }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: "#1976d2" }} data-aos="fade-right">
          Our Mission
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#444", maxWidth: "800px" }}
          data-aos="fade-left"
        >
          To build India’s most trusted and scalable logistics ecosystem — enabling businesses to deliver
          their promises efficiently, every time.
        </Typography>
      </Box>

      {/* Offerings */}
      <Box sx={{ px: { xs: 2, md: 6 }, py: 8, bgcolor: "#f0f4ff" }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, mb: 4, color: "#1e1e2f", textAlign: "center" }}
          data-aos="zoom-in"
        >
          What We Offer
        </Typography>
        <Grid container spacing={4}>
          {[
            "Express Parcel Solutions",
            "Smart Warehousing & Fulfillment",
            "Full Truckload (FTL) Services",
            "Real-Time Order Tracking",
          ].map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} data-aos="fade-up">
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  textAlign: "center",
                  fontWeight: 500,
                  color: "#fff",
                  bgcolor: "#1976d2",
                  borderRadius: 3,
                  height: "100%",
                  transition: "all 0.3s",
                  "&:hover": {
                    bgcolor: "#115293",
                    transform: "translateY(-5px)",
                  },
                }}
              >
                {service}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Why Choose Us */}
      <Box sx={{ px: { xs: 2, md: 6 }, py: 6, bgcolor: "#fff" }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, mb: 4, color: "#1976d2" }}
          data-aos="fade-right"
        >
          Why Businesses Choose MoveBiz
        </Typography>
        <Grid container spacing={2}>
          {[
            "1.PAN India Logistics Coverage",
            " 2.Verified Drivers & Fleet Operations",
            " 3.End-to-End Shipment Visibility",
            "4.24/7 Dedicated Business Support",
          ].map((reason, index) => (
            <Grid item xs={12} sm={6} key={index} data-aos="fade-up">
              <Typography variant="body1" sx={{ color: "#444", pl: 1 }}>
                {reason}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      
      <Box sx={{ px: { xs: 2, md: 6 }, py: 10, bgcolor: "#e3f2fd", textAlign: "center" }} data-aos="zoom-in">
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#1e1e2f" }}>
          Ready to move your business forward?
        </Typography>
        <Typography variant="body1" sx={{ color: "#555", maxWidth: "700px", mx: "auto" }}>
          Explore our logistics services or connect with our experts today to streamline your
          transportation operations across India.
        </Typography>
      </Box>
    </Box>
    <Footer/>
</>
  );
}