package com.cdac.acts.logistics_v1.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.cdac.acts.logistics_v1.model.Customer;
import com.cdac.acts.logistics_v1.model.Driver;
import com.cdac.acts.logistics_v1.model.Shipment;
import com.cdac.acts.logistics_v1.model.Vehicle;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeliveryOrderDTO {

	private Long id;

   
    private Customer customer;

    
    private Shipment shipment;

    private String pickupLocation;
    private String deliveryLocation;
    private LocalDate scheduledPickupDate;
    private LocalDate scheduledDeliveryDate;

    private String deliveryStatus; // Pending, In Transit, Delivered, Cancelled

    
    private Vehicle assignedVehicle;

  
    private Driver assignedDriver;

    private BigDecimal deliveryCost;
    private String trackingNumber;
}
