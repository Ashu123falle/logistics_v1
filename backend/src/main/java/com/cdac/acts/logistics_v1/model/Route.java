package com.cdac.acts.logistics_v1.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sourceAddress;
    private Double sourceLatitude;
    private Double sourceLongitude;

    private String destinationAddress;
    private Double destinationLatitude;
    private Double destinationLongitude;

    private Double distance;
    private Double duration;

    @Lob
    private String geometry;

    @Lob
    private String instructions;

    private String travelMode;
    private Boolean isActive;
    private LocalDateTime createdAt;
}
