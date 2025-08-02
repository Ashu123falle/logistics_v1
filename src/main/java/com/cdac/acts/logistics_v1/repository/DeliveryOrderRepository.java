package com.cdac.acts.logistics_v1.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.acts.logistics_v1.model.DeliveryOrder;

public interface DeliveryOrderRepository extends JpaRepository<DeliveryOrder, Long>{

	
//	    Methods added 
	    List<DeliveryOrder> findByShipmentId(Long shipmentId);
	    List<DeliveryOrder> findByAssignedDriverId(Long driverId);
}
