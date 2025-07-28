package com.cdac.acts.logistics_v1.dto;

import java.time.LocalDateTime;

import com.cdac.acts.logistics_v1.model.DeliveryOrder;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrackingEventDTO {

	private Long id;

 
    private DeliveryOrder deliveryOrder;

    private LocalDateTime timestamp;
    private String location;
    private String statusUpdate; // "Arrived at hub", "Delivered", etc.
    private String remarks;
}
