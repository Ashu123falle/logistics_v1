package com.cdac.acts.logistics_v1.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShipmentRequestDTO {
    private String shipmentId;
    private Long customerId;
    private Long sourceAddressId;
    private Long destinationAddressId;
    private String contentDescription;
    private Double weight;
    private String status;
}
