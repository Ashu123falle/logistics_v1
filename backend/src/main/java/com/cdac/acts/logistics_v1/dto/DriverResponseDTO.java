package com.cdac.acts.logistics_v1.dto;

import com.cdac.acts.logistics_v1.model.Vehicle;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class DriverResponseDTO extends UserResponseDTO {
	
    private String licenseNumber;
    private Vehicle vehicle; // Optional DTO to avoid circular references
}
