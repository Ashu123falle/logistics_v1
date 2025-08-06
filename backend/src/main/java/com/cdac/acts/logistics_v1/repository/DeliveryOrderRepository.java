package com.cdac.acts.logistics_v1.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cdac.acts.logistics_v1.enums.DeliveryStatus;
import com.cdac.acts.logistics_v1.model.DeliveryOrder;
@Repository
public interface DeliveryOrderRepository extends JpaRepository<DeliveryOrder, Long> {

    List<DeliveryOrder> findByShipmentId(Long shipmentId);
    List<DeliveryOrder> findByAssignedDriverUserId(Long userId);

    Long countByPlacedBy_UserId(Long userId); 

    @Query("SELECT SUM(o.cost) FROM DeliveryOrder o WHERE o.placedBy.userId = :userId")
    Double sumTotalCostByPlacedByUserId(@Param("userId") Long userId);

    Long countByStatus(DeliveryStatus status); 

    @Query("SELECT SUM(o.cost) FROM DeliveryOrder o WHERE o.status = 'DELIVERED'")
    Double sumAllDeliveredOrderCosts();
}
