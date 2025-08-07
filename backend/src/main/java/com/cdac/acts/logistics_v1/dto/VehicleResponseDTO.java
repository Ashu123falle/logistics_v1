package com.cdac.acts.logistics_v1.dto;

import lombok.Data;
@Data
public class VehicleResponseDTO {
    private Long id;
    private String registrationNumber;
    private String model;
    private String type;
    private Double capacity;
    private String status;
    // Getters and setters
}
