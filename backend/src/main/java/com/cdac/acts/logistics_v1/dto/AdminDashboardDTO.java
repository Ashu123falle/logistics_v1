package com.cdac.acts.logistics_v1.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminDashboardDTO {
    private Long totalDrivers;
    private Long activeDrivers;
    private Long pendingOrders;
    private Double totalRevenue;
}
