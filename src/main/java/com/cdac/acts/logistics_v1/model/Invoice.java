package com.cdac.acts.logistics_v1.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private DeliveryOrder deliveryOrder;

    private BigDecimal amount;
    private String paymentStatus; // Pending, Paid, Failed
    private String paymentMethod; // Online, Cash, Credit
    private LocalDate generatedDate;
    private LocalDate paidDate;
}
