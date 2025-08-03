package com.cdac.acts.logistics_v1.controller;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Hex;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.acts.logistics_v1.dto.PaymentRequestDTO;
import com.cdac.acts.logistics_v1.enums.PaymentStatus;
import com.cdac.acts.logistics_v1.model.Payment;
import com.cdac.acts.logistics_v1.repository.CustomerRepository;
import com.cdac.acts.logistics_v1.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin("*")
public class PaymentController {

    @Autowired
    private RazorpayClient razorpayClient;
    
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private CustomerRepository customerRepository;

    
//    @PostMapping("/create")
//    public ResponseEntity<PaymentResponseDTO> createOrder(@RequestBody PaymentRequestDTO request) {
//        try {
//            // Step 1: Create Razorpay Order
//            JSONObject options = new JSONObject();
//            options.put("amount", request.getAmount() * 100); // Razorpay expects amount in paise
//            options.put("currency", "INR");
//            options.put("payment_capture", true);
//
//            Order order = razorpayClient.orders.create(options);
//
//            // Step 2: Save order info in DB with status PENDING
//            Payment payment = Payment.builder()
//                .razorpayOrderId(order.get("id"))
//                .amountPaid(request.getAmount())
//                .currency("INR")
//                .status(PaymentStatus.PENDING)
//                .method("RAZORPAY")
//                .paymentDate(LocalDateTime.now())
//                .paidBy(customerRepository.findById(request.getCustomerId()).orElse(null))
//                .deliveryOrder(DeliveryOrder.builder().id(request.getDeliveryOrderId()).build())
//                .build();
//
//            payment = paymentRepository.save(payment); // Assume `paymentRepository` is already injected
//
//            // Step 3: Return minimal data to frontend (order_id only)
//            PaymentResponseDTO response = new PaymentResponseDTO(
//                payment.getId(),
//                request.getCustomerId(),
//                request.getDeliveryOrderId(),
//                request.getAmount(),
//                payment.getMethod(),
//                payment.getStatus().name(),
//                null // razorpayPaymentId will be updated after payment success
//            );
//
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//    }
    
    @PostMapping("/create")
    @CrossOrigin("*")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody PaymentRequestDTO request) {
        try {
            JSONObject options = new JSONObject();
            options.put("amount", request.getAmount() * 100);
            options.put("currency", "INR");
            options.put("payment_capture", true);

            Order order = razorpayClient.orders.create(options);

            Map<String, Object> response = new HashMap<>();
            response.put("razorpayOrderId", order.get("id"));
            response.put("amount", order.get("amount"));
            response.put("currency", order.get("currency"));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Payment order creation failed");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    
//    @PostMapping("/verify")
//    @CrossOrigin("*")    
//    public ResponseEntity<String> verifyAndSavePayment(@RequestBody Map<String, String> payload) {
//        try {
//        	String razorpayOrderId = payload.get("razorpayOrderId");
//            String razorpayPaymentId = payload.get("razorpayPaymentId");
//            String razorpaySignature = payload.get("razorpaySignature");
//
//            // Optional: Verify signature here for extra safety
//
//            Payment payment = paymentRepository.findByRazorpayOrderId(razorpayOrderId);
//            if(payment !=null) {
//            	
//            	payment.setRazorpayPaymentId(razorpayPaymentId);
//            	payment.setRazorpaySignature(razorpaySignature);
//            	payment.setStatus(PaymentStatus.SUCCESS); // or FAILED based on status
//            	payment.setPaymentDate(LocalDateTime.now());
//            }else {
//            	payment.setRazorpayOrderId(razorpayOrderId);
//            	payment.setRazorpayPaymentId(razorpayPaymentId);
//            	payment.setRazorpaySignature(razorpaySignature);
//            	payment.setStatus(PaymentStatus.SUCCESS); // or FAILED based on status
//            	payment.setPaymentDate(LocalDateTime.now());
//            }
//
//            paymentRepository.save(payment);
//            return ResponseEntity.ok("Payment verified and saved");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to verify payment");
//        }
//    }
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> payload) {
        String razorpayOrderId = payload.get("razorpayOrderId");
        String razorpayPaymentId = payload.get("razorpayPaymentId");
        String razorpaySignature = payload.get("razorpaySignature");

        // Step 1: Verify Razorpay signature
        String generatedSignature = hmacSHA256(razorpayOrderId + "|" + razorpayPaymentId, "RxUAz4gozqB4a1Gxk3bdhyex");
        if (!generatedSignature.equals(razorpaySignature)) {
            return ResponseEntity.badRequest().body("Invalid signature");
        }

        try {
            // Step 2: Fetch payment from Razorpay API
        	com.razorpay.Payment razorpayPayment = razorpayClient.payments.fetch(razorpayPaymentId);

            // Optional: check status
            String status = razorpayPayment.get("status");
            if (!"captured".equals(status)) {
                return ResponseEntity.badRequest().body("Payment not captured yet");
            }

            // Step 3: Save in DB
            Payment payment = new Payment();
            payment.setRazorpayPaymentId(razorpayPaymentId);
            payment.setRazorpayOrderId(razorpayOrderId);
            payment.setRazorpaySignature(razorpaySignature);
            
            Object amountObj =razorpayPayment.get("amount");
            Double amount = null;

            if (amountObj instanceof Integer) {
                amount = ((Integer) amountObj).doubleValue();
            } else if (amountObj instanceof Double) {
                amount = (Double) amountObj;
            } else if (amountObj instanceof String) {
                amount = Double.parseDouble((String) amountObj);
            } else {
                throw new IllegalArgumentException("Unsupported amount type: " + amountObj.getClass());
            }

            
            payment.setAmountPaid(amount/100);
            payment.setStatus(PaymentStatus.SUCCESS);
            payment.setMethod(razorpayPayment.get("method"));
            payment.setPaymentDate(LocalDateTime.now());

            paymentRepository.save(payment);

            return ResponseEntity.ok("Payment verified and saved");
        } catch (RazorpayException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to verify payment: " + e.getMessage());
        }
    }

    private String hmacSHA256(String data, String secret) {
        try {
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secret_key = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
            sha256_HMAC.init(secret_key);
            byte[] hash = sha256_HMAC.doFinal(data.getBytes());
            return Hex.encodeHexString(hash);  
        } catch (Exception e) {
            throw new RuntimeException("Failed to compute HMAC SHA256", e);
        }
    }


}
