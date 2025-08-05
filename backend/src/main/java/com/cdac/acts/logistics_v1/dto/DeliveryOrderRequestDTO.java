package com.cdac.acts.logistics_v1.dto;

import java.time.LocalDateTime;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryOrderRequestDTO {
    private Long shipmentId;
    private Long routeId;
    private Long driverId;
    private Double cost;
    private String status;
    private LocalDateTime scheduledPickupDate;
    private LocalDateTime scheduledDeliveredDate;
    private String notes;

}
