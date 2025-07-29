package com.cdac.acts.logistics_v1.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RouteRequestDTO {
    private String sourceAddress;
    private Double sourceLatitude;
    private Double sourceLongitude;

    private String destinationAddress;
    private Double destinationLatitude;
    private Double destinationLongitude;

    private String travelMode;
}
