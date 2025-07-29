package com.cdac.acts.logistics_v1.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverResponseDTO extends UserResponseDTO {
    private String licenseNumber;
    private VehicleBasicDTO vehicle; // Optional DTO to avoid circular references
}
