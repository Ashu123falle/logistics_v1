package com.cdac.acts.logistics_v1.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomerDashboardDTO {
    private Long totalOrders;
    private Double totalSpent;
}
