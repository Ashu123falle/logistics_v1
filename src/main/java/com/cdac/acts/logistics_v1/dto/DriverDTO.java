package com.cdac.acts.logistics_v1.dto;

import com.cdac.acts.logistics_v1.model.Vehicle;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverDTO {

	 private Long id;

	    private String name;
	    private String licenseNumber;	
	    private String phone;

	    private Vehicle assignedVehicle;

	    private String status; // Available, On Delivery, Off Duty
}
