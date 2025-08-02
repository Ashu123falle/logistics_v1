//package com.cdac.acts.logistics_v1.repository;
//
//import java.util.List;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import com.cdac.acts.logistics_v1.model.DeliveryOrder;
//import com.cdac.acts.logistics_v1.model.Driver;
//
//public interface DriverRepository extends JpaRepository< Driver , Long>{
//
//
//    List<DeliveryOrder> findByShipmentId(Long shipmentId);
//
//    // Get all delivery orders assigned to a specific driver
//    List<DeliveryOrder> findByAssignedDriverId(Long driverId);
//
//    // Optional: get by status
//    List<DeliveryOrder> findByStatus(String status);
//}

package com.cdac.acts.logistics_v1.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.acts.logistics_v1.model.DeliveryOrder;
import com.cdac.acts.logistics_v1.model.Driver;

public interface DriverRepository extends JpaRepository< Driver , Long>{


//    List<DeliveryOrder> findByShipmentId(Long shipmentId);

    // Get all delivery orders assigned to a specific driver
//    List<DeliveryOrder> findByAssignedDriverId(Long driverId);

    Optional<Driver> findById(Long id);

    List<Driver> findByCurrentVehicle_Id(Long vehicleId);

    
    // Optional: get by status
    List<DeliveryOrder> findByStatus(String status);

}
