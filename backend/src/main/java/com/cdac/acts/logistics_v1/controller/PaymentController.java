package com.cdac.acts.logistics_v1.controller;

import com.cdac.acts.logistics_v1.dto.PaymentRequestDTO;
import com.cdac.acts.logistics_v1.enums.PaymentStatus;
import com.cdac.acts.logistics_v1.model.Payment;
import com.cdac.acts.logistics_v1.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Hex;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin("*")
@RequiredArgsConstructor
public class PaymentController {

    private final RazorpayClient razorpayClient;
    private final PaymentRepository paymentRepository;

    @Value("${razorpay.secret}")   // ✅ From application.properties or env variable
    private String razorpaySecret;

    /**
     * Create Razorpay Order
     */
    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody PaymentRequestDTO request) {
        try {
            // Create Razorpay Order
            Map<String, Object> options = new HashMap<>();
            options.put("amount", request.getAmount() * 100); // Razorpay expects paise
            options.put("currency", "INR");
            options.put("payment_capture", true);

            Order order = razorpayClient.orders.create(new org.json.JSONObject(options));

            // Response to frontend
            Map<String, Object> response = new HashMap<>();
            response.put("razorpayOrderId", order.get("id"));
            response.put("amount", order.get("amount"));
            response.put("currency", order.get("currency"));

            return ResponseEntity.status(HttpStatus.CREATED).body(response); // 201 Created
        } catch (RazorpayException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("message", "Failed to create payment order");
            error.put("details", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Verify Payment & Save in DB
     */
    @PostMapping("/verify")
    public ResponseEntity<Map<String, Object>> verifyPayment(@RequestBody Map<String, String> payload) {
        String razorpayOrderId = payload.get("razorpayOrderId");
        String razorpayPaymentId = payload.get("razorpayPaymentId");
        String razorpaySignature = payload.get("razorpaySignature");

        try {
            // ✅ Step 1: Verify Razorpay Signature
            String generatedSignature = hmacSHA256(razorpayOrderId + "|" + razorpayPaymentId, razorpaySecret);
            if (!generatedSignature.equals(razorpaySignature)) {
                return ResponseEntity.badRequest().body(Map.of("message", "Invalid signature"));
            }

            // ✅ Step 2: Save Payment in DB
            Payment payment = new Payment();
            payment.setRazorpayOrderId(razorpayOrderId);
            payment.setRazorpayPaymentId(razorpayPaymentId);
            payment.setRazorpaySignature(razorpaySignature);
            payment.setStatus(PaymentStatus.SUCCESS);
            payment.setPaymentDate(LocalDateTime.now());
            paymentRepository.save(payment);

            // ✅ Step 3: Respond with success JSON
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("paymentId", razorpayPaymentId);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Payment verification failed", "details", e.getMessage()));
        }
    }

    /**
     * Utility Method for HMAC SHA256
     */
    private String hmacSHA256(String data, String secret) {
        try {
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
            sha256_HMAC.init(secretKeySpec);
            return Hex.encodeHexString(sha256_HMAC.doFinal(data.getBytes()));
        } catch (Exception e) {
            throw new RuntimeException("Failed to compute HMAC SHA256", e);
        }
    }
}
