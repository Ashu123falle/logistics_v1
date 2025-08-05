package com.cdac.acts.logistics_v1.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ImageResponseDTO {

	private Long shipmentId;
	private Long customerId;
	private List<String> imageUrls;
}
