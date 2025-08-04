package com.cdac.acts.logistics_v1.service.impl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//import javax.crypto.Mac;
//import javax.crypto.spec.SecretKeySpec;

//import org.apache.commons.codec.binary.Hex;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.cdac.acts.logistics_v1.dto.PaymentRequestDTO;
import com.cdac.acts.logistics_v1.dto.PaymentResponseDTO;
import com.cdac.acts.logistics_v1.enums.PaymentStatus;
import com.cdac.acts.logistics_v1.model.Customer;
import com.cdac.acts.logistics_v1.model.DeliveryOrder;
import com.cdac.acts.logistics_v1.model.Payment;
import com.cdac.acts.logistics_v1.repository.CustomerRepository;
import com.cdac.acts.logistics_v1.repository.DeliveryOrderRepository;
import com.cdac.acts.logistics_v1.repository.PaymentRepository;
import com.cdac.acts.logistics_v1.service.PaymentService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final RazorpayClient razorpayClient;
    private final PaymentRepository paymentRepository;
    private final CustomerRepository customerRepository;
    private final DeliveryOrderRepository deliveryOrderRepository;

    @Value("${razorpay.secret}")
    private String razorpaySecret;

    @Override
    public Map<String, Object> createPayment(PaymentRequestDTO request) {
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

            return response;
        } catch (RazorpayException e) {
            throw new RuntimeException("Failed to create Razorpay order: " + e.getMessage());
        }
    }

    @Override
    public String verifyTransaction(Map<String, String> payload) {
        try {
            String razorpayOrderId = payload.get("razorpay_order_id");
            String razorpayPaymentId = payload.get("razorpay_payment_id");
            String razorpaySignature = payload.get("razorpay_signature");

            JSONObject params = new JSONObject();
            params.put("razorpay_order_id", razorpayOrderId);
            params.put("razorpay_payment_id", razorpayPaymentId);
            params.put("razorpay_signature", razorpaySignature);

            boolean isValid = Utils.verifyPaymentSignature(params, razorpaySecret);
;
            if (!isValid) {
                return "Invalid signature";
            }

            com.razorpay.Payment razorpayPayment = razorpayClient.payments.fetch(razorpayPaymentId);
            if (!"captured".equalsIgnoreCase(razorpayPayment.get("status"))) {
                return "Payment not captured yet";
            }

            Payment payment = new Payment();
            payment.setRazorpayOrderId(razorpayOrderId);
            payment.setRazorpayPaymentId(razorpayPaymentId);
            payment.setRazorpaySignature(razorpaySignature);
            payment.setStatus(PaymentStatus.SUCCESS);
            payment.setMethod(razorpayPayment.get("method"));
            payment.setPaymentDate(LocalDateTime.now());
            payment.setCurrency("INR");

            Object amountObj = razorpayPayment.get("amount");
            double amount = amountObj instanceof Number
                    ? ((Number) amountObj).doubleValue()
                    : Double.parseDouble(amountObj.toString());
            payment.setAmountPaid(amount / 100);

            paymentRepository.save(payment);
            return "Payment verified and saved";

        } catch (Exception e) {
            return "Verification failed: " + e.getMessage();
        }
    }

//    private String hmacSHA256(String data, String secret) {
//        try {
//            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
//            SecretKeySpec secretKey = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
//            sha256_HMAC.init(secretKey);
//            return Hex.encodeHexString(sha256_HMAC.doFinal(data.getBytes()));
//        } catch (Exception e) {
//            throw new RuntimeException("Failed to compute HMAC SHA256", e);
//        }
//    }
    
    @Override
    public PaymentResponseDTO getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        return toDTO(payment);
    }

    @Override
    public List<PaymentResponseDTO> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    @Override
    public PaymentResponseDTO updatePayment(Long id, PaymentRequestDTO dto) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        if (dto.getAmount() != null) payment.setAmountPaid(dto.getAmount());
        if (dto.getMethod() != null) payment.setMethod(dto.getMethod());
        if (dto.getStatus() != null) payment.setStatus(PaymentStatus.valueOf(dto.getStatus()));

        if (dto.getCustomerId() != null) {
            Customer customer = customerRepository.findById(dto.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Customer not found"));
            payment.setPaidBy(customer);
        }

        if (dto.getDeliveryOrderId() != null) {
            DeliveryOrder order = deliveryOrderRepository.findById(dto.getDeliveryOrderId())
                    .orElseThrow(() -> new RuntimeException("Delivery Order not found"));
            payment.setDeliveryOrder(order);
        }

        return toDTO(paymentRepository.save(payment));
    }

    @Override
    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
    
    private PaymentResponseDTO toDTO(Payment p) {
        return new PaymentResponseDTO(
                p.getId(),
                p.getPaidBy() != null ? p.getPaidBy().getUserId() : null,
                p.getDeliveryOrder() != null ? p.getDeliveryOrder().getId() : null,
                p.getAmountPaid(),
                p.getMethod(),
                p.getStatus() != null ? p.getStatus().name() : null,
                p.getRazorpayPaymentId()
        );
    }
}
