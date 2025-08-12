import React from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

export default function ServicesCards() {
  const cards = [
    {
      title: "Express Parcel Service",
      img: "http://localhost:5173/images/Expressdelivery.jpg",
      description: "Our express parcel service offers reliable and rapid delivery for your time-sensitive shipments. We ensure your packages reach their destination safely and on schedule, providing real-time tracking every step of the way."
    },
    {
      title: "Warehousing",
      img: "http://localhost:5173/images/Warehousing.jpg",
      description: "Leverage our state-of-the-art warehousing solutions for efficient inventory management. We provide secure storage, expert handling, and streamlined fulfillment services to optimize your supply chain operations."
    },
    {
      title: "Part Truckload Freight (PTL)",
      img: "http://localhost:5173/images/partturk.png",
      description: "For shipments that don't fill an entire truck, our PTL service is the perfect cost-effective solution. We consolidate your freight with other shipments to reduce costs without compromising on delivery timelines or safety."
    },
    {
      title: "Full Truckload Freight (FTL)",
      img: "http://localhost:5173/images/Fulltrack.png",
      description: "When you need a dedicated truck for your large-volume shipments, our FTL service provides a seamless and exclusive transport solution. Your goods are the sole cargo, ensuring fast, direct, and secure delivery."
    },
    {
      title: "Cross Border Shipping",
      img: "http://localhost:5173/images/crossborder.png",
      description: "Expand your reach with our comprehensive cross-border shipping services. We navigate customs, regulations, and logistics to ensure your international shipments are delivered smoothly and efficiently, opening up new markets for your business."
    },
    {
      title: "Data Intelligence",
      img: "http://localhost:5173/images/dataintelligence.png",
      description: "Our data intelligence platform provides deep insights into your logistics operations. By analyzing shipping data, we help you identify trends, optimize routes, and make smarter business decisions to enhance efficiency and profitability."
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
                height: "100%", 
                minHeight: 320 
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={card.img}
                alt={card.title}
                sx={{
                  objectFit: "cover" 
                }}
              />
              <CardContent
                sx={{
                  flexGrow: 1 
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