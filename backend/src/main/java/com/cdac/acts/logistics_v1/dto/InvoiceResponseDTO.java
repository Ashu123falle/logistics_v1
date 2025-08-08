package com.cdac.acts.logistics_v1.dto;

import java.sql.Driver;
import java.time.LocalDateTime;
import java.util.List;

import com.cdac.acts.logistics_v1.enums.DeliveryStatus;
import com.cdac.acts.logistics_v1.model.Customer;
import com.cdac.acts.logistics_v1.model.Route;
import com.cdac.acts.logistics_v1.model.Shipment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// Main invoice DTO
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceResponseDTO {
    private Long deliveryOrderId;
    private Double cost;
    private DeliveryStatus status;
    private LocalDateTime scheduledPickupDate;
    private LocalDateTime scheduledDeliveryDate;
    private String notes;

    private List<Shipment> shipment;
    private Route route;
//    private Driver driver;
    private Customer customer;

}
