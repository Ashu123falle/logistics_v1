package com.cdac.acts.logistics_v1.model;

import java.time.LocalDateTime;

import com.cdac.acts.logistics_v1.enums.DeliveryStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeliveryOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "shipment_id")
    private Shipment shipment;

    @OneToOne
    @JoinColumn(name = "route_id")
    private Route route;

    @OneToOne
    @JoinColumn(name = "driver_id")
    private Driver assignedDriver;

    private Double cost;

    private LocalDateTime scheduledPickupDate;
    private LocalDateTime scheduledDeliveryDate;

    @Enumerated(EnumType.STRING)
    private DeliveryStatus status;

    private String notes;
    private LocalDateTime createdAt;
}