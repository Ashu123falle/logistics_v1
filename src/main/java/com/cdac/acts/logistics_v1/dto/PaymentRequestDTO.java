package com.cdac.acts.logistics_v1.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequestDTO {
    private Long customerId;
    private Long deliveryOrderId;
    private Double amount;
    private String method;              // e.g. "Cash", "UPI", "Razorpay"
    private String status;              // e.g. "SUCCESS", "FAILED"
    private String razorpayPaymentId;   // optional, if using Razorpay
}
