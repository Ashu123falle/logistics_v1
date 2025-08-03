package com.cdac.acts.logistics_v1.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class DriverRequestDTO extends UserRequestDTO {
    private String licenseNumber;
    private Long vehicleId; // optional: ID reference instead of full entity
}
