package com.cdac.acts.logistics_v1.dto;

import java.math.BigDecimal;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipmentDTO {

	 private Long id;

	    private String description;
	    private Double weight;
	    private String dimensions;
	    private BigDecimal value;
	    private String handlingInstructions;
	    private String category; // Machinery, Raw Material, etc.

}
