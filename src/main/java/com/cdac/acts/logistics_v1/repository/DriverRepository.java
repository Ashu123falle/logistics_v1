package com.cdac.acts.logistics_v1.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.acts.logistics_v1.model.DeliveryOrder;
import com.cdac.acts.logistics_v1.model.Driver;

public interface DriverRepository extends JpaRepository< Driver , Long>{

	 // Get all delivery orders linked to a specific shipment
//    List<DeliveryOrder> findByShipmentId(Long shipmentId);
//
//    // Get all delivery orders assigned to a specific driver
////    List<DeliveryOrder> findByAssignedDriver_Id(Long driverId);
//	List<DeliveryOrder> findByAssignedDriver_Id(Driver driver);
//
//    // Optional: get by status
//    List<DeliveryOrder> findByStatus(String status);
}
