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
public class RouteDTO {

	private Long id;

	private String fromCity;
	private String toCity;
	private Double distanceKm;
	private Double averageTravelTime;
	private BigDecimal tollCost;
}
