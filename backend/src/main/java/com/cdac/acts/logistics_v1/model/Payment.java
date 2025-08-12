package com.cdac.acts.logistics_v1.model;

import java.time.LocalDateTime;

import com.cdac.acts.logistics_v1.enums.PaymentStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String razorpayPaymentId;
    private String razorpayOrderId;
    private String razorpaySignature;
    private Double amountPaid;
    private String currency;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    private String method;
    private String description;
    private String failureReason;
    private String notes;

    private LocalDateTime paymentDate;

    @JsonBackReference
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "delivery_order_id")
    private DeliveryOrder deliveryOrder;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer paidBy;
}

