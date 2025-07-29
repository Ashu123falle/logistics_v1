package com.cdac.acts.logistics_v1.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponseDTO {
    private Long id;
    private Long customerId;
    private Long deliveryOrderId;
    private Double amount;
    private String method;              // e.g., "Cash", "UPI", "Razorpay"
    private String status;              // e.g., "SUCCESS", "PENDING"
    private String razorpayPaymentId;   // Optional for online payments
}
