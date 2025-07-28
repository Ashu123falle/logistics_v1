package com.cdac.acts.logistics_v1.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.cdac.acts.logistics_v1.model.DeliveryOrder;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceDTO {

	private Long id;
    private DeliveryOrder deliveryOrder;

    private BigDecimal amount;
    private String paymentStatus; // Pending, Paid, Failed
    private String paymentMethod; // Online, Cash, Credit
    private LocalDate generatedDate;
    private LocalDate paidDate;
}
