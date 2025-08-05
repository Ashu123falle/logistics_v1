package com.cdac.acts.logistics_v1.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponseDTO {
    private Long id;
    private Long customerId;
    private Long deliveryOrderId;
    private Double amount;
    private String method;
    private String status;
    private String razorpayPaymentId;
    private LocalDateTime timeStamp;
}

