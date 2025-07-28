package com.cdac.acts.logistics_v1.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleDTO {
	
    private Long id;

    private String vehicleNumber;
    private String type; // Truck, Trailer, etc.
    private Double capacity; // kg or tons
    private String status; // Available, In Transit, Maintenance
    private String currentLocation;

}
