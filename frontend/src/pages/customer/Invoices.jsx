import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import API from "../../services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const Invoices = () => {
  const { auth } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    fetchInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await API.get(`/customer/invoices/${auth.userId}`);
      setInvoices(response.data || []);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = (invoice) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("MoveBizz Logistics Pvt. Ltd.", 20, 20);

    doc.setFontSize(10);
    doc.text("Email: support@movebizz.com", 20, 26);
    doc.text("Website: www.movebizz.com", 20, 31);

    const now = new Date();
    doc.text(`Date: ${now.toLocaleDateString()}`, 160, 20);
    doc.text(`Invoice ID: ${invoice.deliveryOrderId}`, 160, 26);
    doc.text(`Status: ${invoice.status}`, 160, 32);

    doc.line(20, 35, 190, 35);

    // Customer details
    doc.setFontSize(12);
    doc.text("Customer Details", 20, 45);
    doc.setFontSize(10);
    doc.text(`Company: ${invoice.customer?.companyName || "N/A"}`, 25, 53);
    doc.text(`Contact: ${invoice.customer?.contactPersonName || "N/A"}`, 25, 60);
    doc.text(`Email: ${invoice.customer?.companyEmail || "N/A"}`, 25, 67);

    // Route details
    doc.setFontSize(12);
    doc.text("Route Details", 20, 80);
    doc.setFontSize(10);
    doc.text(`Source: ${invoice.route?.sourceAddress || "N/A"}`, 25, 88);
    doc.text(`Destination: ${invoice.route?.destinationAddress || "N/A"}`, 25, 95);
    doc.text(
      `Pickup Date: ${new Date(invoice.scheduledPickupDate).toLocaleString()}`,
      25,
      102
    );
    doc.text(
      `Delivery Date: ${new Date(invoice.scheduledDeliveryDate).toLocaleString()}`,
      25,
      109
    );

    // Shipments summary
    doc.setFontSize(12);
    doc.text("Shipment Details", 20, 125);
    doc.setFontSize(10);
    const shipmentCount = invoice.shipment?.length || 0;
    doc.text(`Number of Shipments: ${shipmentCount}`, 25, 133);
    if (shipmentCount > 0) {
      invoice.shipment.forEach((s, index) => {
        const y = 140 + index * 10;
        if (y > 270) return; // Avoid overflow
        doc.text(
          `- ${s.name} (${s.type}), Weight: ${s.weight}kg, Value: ₹${s.value}`,
          30,
          y
        );
      });
    }

    // Cost summary
    const gst = +(invoice.cost * 0.18).toFixed(2);
    const total = +(invoice.cost + gst).toFixed(2);

    const baseY = 200;
    doc.setFontSize(12);
    doc.text("Charges Summary", 20, baseY);

    doc.setFontSize(10);
    doc.text("Description", 25, baseY + 10);
    doc.text("Amount (₹)", 150, baseY + 10);
    doc.line(20, baseY + 12, 190, baseY + 12);

    doc.text("Base Shipping Charges", 25, baseY + 20);
    doc.text(`${invoice.cost.toFixed(2)}`, 150, baseY + 20);

    doc.text("GST (18%)", 25, baseY + 28);
    doc.text(`${gst.toFixed(2)}`, 150, baseY + 28);

    doc.line(20, baseY + 32, 190, baseY + 32);

    doc.setFontSize(11);
    doc.text("Total Amount Payable", 25, baseY + 40);
    doc.text(`₹${total.toFixed(2)}`, 150, baseY + 40);

    doc.setFontSize(10);
    doc.text("Thank you for your business!", 20, 280);
    doc.text("This is a computer-generated invoice.", 20, 285);

    doc.save(`Invoice-${invoice.deliveryOrderId}.pdf`);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          marginLeft: isMobile ? 0 : "240px",
          p: { xs: 2, sm: 3 },
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        marginRight: isMobile ? 0 :"25",
        transition: "margin-left 0.3s ease",
        width: "100%",
        overflowX: "auto",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
          fontWeight: "bold",
        }}
      >
        Customer Invoices
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          overflowX: "auto",
        }}
      >
        <Table size={isMobile ? "small" : "medium"}>
          <TableHead>
            <TableRow>
              <TableCell><b>Invoice ID</b></TableCell>
              <TableCell><b>Customer</b></TableCell>
              <TableCell><b>Pickup Date</b></TableCell>
              <TableCell><b>Delivery Date</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Source Address</b></TableCell>
              <TableCell><b>Destination Address</b></TableCell>
              <TableCell><b>Total Cost (₹)</b></TableCell>
              <TableCell><b>Download</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No invoices found.
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice) => (
                <TableRow key={invoice.deliveryOrderId}>
                  <TableCell>{invoice.deliveryOrderId}</TableCell>
                  <TableCell>{invoice.customer?.companyName || "N/A"}</TableCell>
                  <TableCell>
                    {invoice.scheduledPickupDate
                      ? new Date(invoice.scheduledPickupDate).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {invoice.scheduledDeliveryDate
                      ? new Date(invoice.scheduledDeliveryDate).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell>{invoice.route?.sourceAddress || "N/A"}</TableCell>
                  <TableCell>{invoice.route?.destinationAddress || "N/A"}</TableCell>
                  <TableCell>₹{invoice.cost?.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => downloadPDF(invoice)}
                      fullWidth={isMobile}
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" } }}
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Invoices;
