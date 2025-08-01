package com.cdac.acts.logistics_v1.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.acts.logistics_v1.model.Shipment;

public interface ShipmentRepository extends JpaRepository<Shipment, Long>{
	List<Shipment> findByCustomer_UserId(Long userId);

//	    // Find all shipments for a specific driver
//	    List<Shipment> findByDriverId(Long driverId);
//
//	    // Find all shipments by status
//	    List<Shipment> findByStatus(String status);

	    // Find shipments between date ranges (if you have LocalDateTime fields like createdAt)
	    // List<Shipment> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

	    // Optional: Track shipment by tracking number if exists
	    // Optional<Shipment> findByTrackingNumber(String trackingNumber);
}
