import React from 'react';
import { Box, Typography, Link, Grid, IconButton, List, ListItem } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

const footerLinks = [
  { title: "Services", links: ["Express Parcel", "Warehousing", "Part Truckload", "Full Truckload"] },
  { title: "Company", links: ["About Us", "Careers", "Press Release", "Governance"] },
  { title: "Legal", links: ["Privacy Policy", "Terms & Conditions", "Cookie Policy"] },
  { title: "Support", links: ["Help Center", "Contact Us"] },
];

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#1d1819", color: "#fff", py: 6, px: 4, mt: 6 }}>
      <Grid container spacing={4}>
        {/* Logo and Socials */}
        <Grid item xs={12} md={4}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
            MoveBiz
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "#aaa" }}>
            The operating system for commerce in India.
          </Typography>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <IconButton disabled sx={{ backgroundColor: "#333", "&:hover": { backgroundColor: "#555" } }}>
              <FacebookIcon sx={{ color: "#aaa" }} />
            </IconButton>
            <IconButton disabled sx={{ backgroundColor: "#333", "&:hover": { backgroundColor: "#555" } }}>
              <TwitterIcon sx={{ color: "#aaa" }} />
            </IconButton>
            <IconButton disabled sx={{ backgroundColor: "#333", "&:hover": { backgroundColor: "#555" } }}>
              <LinkedInIcon sx={{ color: "#aaa" }} />
            </IconButton>
            <IconButton disabled sx={{ backgroundColor: "#333", "&:hover": { backgroundColor: "#555" } }}>
              <YouTubeIcon sx={{ color: "#aaa" }} />
            </IconButton>
            <IconButton disabled sx={{ backgroundColor: "#333", "&:hover": { backgroundColor: "#555" } }}>
              <InstagramIcon sx={{ color: "#aaa" }} />
            </IconButton>
          </Box>
        </Grid>

        {/* Footer Links */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={4}>
            {footerLinks.map((section, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {section.title}
                </Typography>
                <List sx={{ p: 0 }}>
                  {section.links.map((link, linkIndex) => (
                    <ListItem key={linkIndex} disablePadding sx={{ py: 0.5 }}>
                      <Link href="#" underline="hover" sx={{ fontSize: "0.9rem", color: "#ccc" }}>
                        {link}
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ borderTop: "1px solid #333", mt: 6, pt: 2, textAlign: "center" }}>
        <Typography variant="body2" color="#666">
          &copy; {new Date().getFullYear()} MoveBiz. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
