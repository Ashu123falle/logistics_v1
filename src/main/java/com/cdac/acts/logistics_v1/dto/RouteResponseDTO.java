package com.cdac.acts.logistics_v1.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RouteResponseDTO {
    private Long id;

    private String sourceAddress;
    private Double sourceLatitude;
    private Double sourceLongitude;

    private String destinationAddress;
    private Double destinationLatitude;
    private Double destinationLongitude;

    private Double distance;
    private Double duration;

    private String geometry;
    private String instructions;

    private String travelMode;
    private Boolean isActive;
    private LocalDateTime createdAt;
}
