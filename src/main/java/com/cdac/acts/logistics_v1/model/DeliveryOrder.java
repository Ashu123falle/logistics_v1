package com.cdac.acts.logistics_v1.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
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

    @ManyToOne
    private Customer customer;

    @ManyToOne
    private Shipment shipment;

    private String pickupLocation;
    private String deliveryLocation;
    private LocalDate scheduledPickupDate;
    private LocalDate scheduledDeliveryDate;

    private String deliveryStatus; // Pending, In Transit, Delivered, Cancelled

    @ManyToOne
    private Vehicle assignedVehicle;

    @ManyToOne
    private Driver assignedDriver;

    private BigDecimal deliveryCost;
    private String trackingNumber;
}
