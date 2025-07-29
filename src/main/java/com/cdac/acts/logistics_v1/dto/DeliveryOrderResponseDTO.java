package com.cdac.acts.logistics_v1.dto;

import com.cdac.acts.logistics_v1.model.DeliveryOrder;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryOrderResponseDTO {
    private Long id;
    private Long shipmentId;
    private Long routeId;
    private Long driverId;
    private Double cost;
    private String status;

   
}
