package com.cdac.acts.logistics_v1.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverRequestDTO extends UserRequestDTO {
    private String licenseNumber;
    private Long vehicleId; // optional: ID reference instead of full entity
}
