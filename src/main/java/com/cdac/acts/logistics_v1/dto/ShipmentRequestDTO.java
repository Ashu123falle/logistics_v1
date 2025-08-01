package com.cdac.acts.logistics_v1.dto;


import java.util.List;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShipmentRequestDTO {
	private String type;
	private String name;
	private String description;
	private Double value;
	private String dimensions;
	private Double weight;
	private List<String> images;
	private long customerId;

}
