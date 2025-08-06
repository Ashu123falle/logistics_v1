import React from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

export default function ServicesCards() {
  const cards = [
    {
      title: "Express Parcel Service",
      img: "https://via.placeholder.com/400x250",
      description: "Dummy text for Express Parcel Service card."
    },
    {
      title: "Warehousing",
      img: "https://via.placeholder.com/400x250",
      description: "Dummy text for Warehousing card."
    },
    {
      title: "Part Truckload Freight (PTL)",
      img: "https://via.placeholder.com/400x250",
      description: "Dummy text for PTL card."
    },
    {
      title: "Full Truckload Freight (FTL)",
      img: "https://via.placeholder.com/400x250",
      description: "Dummy text for FTL card."
    },
    {
      title: "Cross Border Shipping",
      img: "https://via.placeholder.com/400x250",
      description: "Dummy text for Cross Border card."
    },
    {
      title: "Data Intelligence",
      img: "https://via.placeholder.com/400x250",
      description: "Dummy text for Data Intelligence card."
    }
  ];

  return (
    <Box sx={{ backgroundColor: "#f8f9fb", py: 6, px: 4 ,mt:10}}>
      {/* Heading */}
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ mb: 4, textAlign: "left" }}
      >
        <span style={{ borderBottom: "3px solid red" }}>Services</span> that
        power our solutions ecosystem
      </Typography>

      {/* Cards Grid */}
      <Grid container spacing={3} alignItems="stretch">
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                height: "100%", // fill the grid cell height
                minHeight: 320 // fixed minimum height for uniformity
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={card.img}
                alt={card.title}
                sx={{
                  objectFit: "cover" // keeps image consistent
                }}
              />
              <CardContent
                sx={{
                  flexGrow: 1 // fills remaining space
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {card.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}
                >
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
