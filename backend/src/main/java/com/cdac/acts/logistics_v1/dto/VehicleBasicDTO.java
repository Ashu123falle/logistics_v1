package com.cdac.acts.logistics_v1.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VehicleBasicDTO {
	private Long id;
	private String vehicleNumber;
	private String model;
	private String type;
	private Double capacity;
	private String status;

}
