import React, { useState } from "react";
import Footer from "../components/Landing/Footer";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
  Divider,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  AppBar,
  Toolbar, 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelIcon from "@mui/icons-material/Cancel";
import PaymentIcon from "@mui/icons-material/Payment";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import RefundIcon from "@mui/icons-material/ReceiptLong";
const faqs = [
  {
    category: "Shipping & Delivery",
    question: "How can I track my order?",
    answer: "You can track your shipment using the tracking ID sent to your email or SMS."
  },
  {
    category: "Payments",
    question: "Can I pay on delivery?",
    answer: "Currently, we support prepaid orders only."
  },
  {
    category: "Account & Profile",
    question: "How to update profile info?",
    answer: "Go to your profile settings and click 'Edit' to update your information."
  },
  {
    category: "Technical",
    question: "App not working properly?",
    answer: "Try restarting the app. If the issue persists, contact our support team."
  }
];

const quickHelp = [
  { icon: <LocalShippingIcon fontSize="large" color="primary" />, label: "Delay in Delivery" },
  { icon: <CancelIcon fontSize="large" color="error" />, label: "Cancel Shipment" },
  { icon: <PaymentIcon fontSize="large" color="success" />, label: "Payment Issues" },
  { icon: <ReportProblemIcon fontSize="large" color="warning" />, label: "Report Damaged Goods" },
  { icon: <RefundIcon fontSize="large" color="secondary" />, label: "Raise Refund Request" },
];

export default function SupportPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [form, setForm] = useState({ name: "", email: "", issue: "" });
  const [trackId, setTrackId] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleFormChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleFormSubmit = () => {
    if (!form.name || !form.email || !form.issue) {
      setSnackbar({ open: true, message: "Please fill all fields.", severity: "error" });
      return;
    }
    console.log("Support Request Submitted:", form);
    setSnackbar({ open: true, message: "Support request submitted!", severity: "success" });
    setForm({ name: "", email: "", issue: "" });
  };

  const handleTrackShipment = () => {
    if (!trackId.trim()) {
      setSnackbar({ open: true, message: "Enter a valid tracking ID.", severity: "error" });
      return;
    }

    // Simulate sending OTP
    console.log("OTP sent for Order ID:", trackId);
    setOtpSent(true);
    setSnackbar({ open: true, message: "OTP sent to your registered mobile/email.", severity: "info" });
  };

  const handleVerifyOtp = () => {
    if (!otp.trim()) {
      setSnackbar({ open: true, message: "Please enter the OTP.", severity: "error" });
      return;
    }

    console.log("Verifying OTP:", otp, "for Order ID:", trackId);
    setSnackbar({ open: true, message: `Order verified successfully for ID: ${trackId}`, severity: "success" });
    setTrackId("");
    setOtp("");
    setOtpSent(false);
  };

  return (
    <>
     <AppBar
        position="static"
        sx={{
          bgcolor: "#1d1819",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          borderBottom: "2px solid #ff0000",
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
            MoveBiz
          </Typography>
        </Toolbar>
      </AppBar>
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6, backgroundColor: "#f9f9fb" }}>
      <Typography variant="h3" fontWeight={700} gutterBottom color="primary">
        Support Center
      </Typography>

      <TextField
        fullWidth
        placeholder="Search for help..."
        variant="outlined"
        sx={{ mb: 5, backgroundColor: "white", borderRadius: 1 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {quickHelp.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                textAlign: "center",
                p: 2,
                backgroundColor: "#ffffff",
                borderRadius: 3,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6
                }
              }}
            >
              <CardContent>
                {item.icon}
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  {item.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Track Shipment */}
      <Paper sx={{ p: 4, mb: 6, backgroundColor: "#e3f2fd" }}>
        <Typography variant="h6" gutterBottom color="primary">
          Track Your Shipment
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={otpSent ? 6 : 9}>
            <TextField
              fullWidth
              label="Enter Order ID"
              variant="outlined"
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
              disabled={otpSent}
              sx={{ backgroundColor: "white" }}
            />
          </Grid>

          {otpSent && (
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Enter OTP"
                variant="outlined"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
          )}

          <Grid item xs={12} sm={otpSent ? 3 : 3}>
            <Button
              variant="contained"
              color={otpSent ? "success" : "primary"}
              fullWidth
              onClick={otpSent ? handleVerifyOtp : handleTrackShipment}
              sx={{ height: "100%" }}
            >
              {otpSent ? "Verify OTP" : "Track"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* FAQs and Contact Form */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom color="primary">
            Frequently Asked Questions
          </Typography>
          <List>
            {faqs.map((faq, index) => (
              <Box key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" fontWeight="bold">
                        [{faq.category}] {faq.question}
                      </Typography>
                    }
                    secondary={<Typography variant="body2">{faq.answer}</Typography>}
                  />
                </ListItem>
                {index !== faqs.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom color="primary">
            Contact Support
          </Typography>
          <Paper sx={{ p: 3, backgroundColor: "#fff3e0" }}>
            <TextField
              fullWidth
              label="Your Name"
              sx={{ mb: 2, backgroundColor: "white" }}
              value={form.name}
              onChange={handleFormChange("name")}
            />
            <TextField
              fullWidth
              label="Email Address"
              sx={{ mb: 2, backgroundColor: "white" }}
              value={form.email}
              onChange={handleFormChange("email")}
            />
            <TextField
              fullWidth
              label="Issue Description"
              multiline
              rows={4}
              sx={{ mb: 2, backgroundColor: "white" }}
              value={form.issue}
              onChange={handleFormChange("issue")}
            />
            <Button variant="contained" fullWidth color="warning" onClick={handleFormSubmit}>
              Submit Request
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Contact Info */}
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          📧 Email: support@movebiz.com | ☎️ Phone: +91-9999999999
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ⏰ Support available 9 AM to 9 PM IST (Mon–Sat)
        </Typography>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

    
    </Box>
    <Footer/>
    
    </>
  );
}
