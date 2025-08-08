package com.cdac.acts.logistics_v1.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.acts.logistics_v1.model.Shipment;
@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
	
    Page<Shipment> findByType(String type, Pageable pageable);
    
    List<Shipment> findByCustomer_UserId(long id);

//	Shipment findByDeliveryOrderId(Long id);
}
