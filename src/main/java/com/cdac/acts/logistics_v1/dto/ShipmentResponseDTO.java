package com.cdac.acts.logistics_v1.dto;

import com.cdac.acts.logistics_v1.model.Shipment;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipmentResponseDTO {
	private long id;
	private String type;
	private String name;
	private String description;
	private Double value;
	private String dimensions;
	private Double weight;;
	private long customerId;

}
