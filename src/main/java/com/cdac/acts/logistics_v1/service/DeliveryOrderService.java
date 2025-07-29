package com.cdac.acts.logistics_v1.service;

import java.util.List;

import com.cdac.acts.logistics_v1.dto.DeliveryOrderRequestDTO;
import com.cdac.acts.logistics_v1.dto.DeliveryOrderResponseDTO;

public interface DeliveryOrderService {
    DeliveryOrderResponseDTO createOrder(DeliveryOrderRequestDTO request);
    DeliveryOrderResponseDTO getOrderById(Long id);
    List<DeliveryOrderResponseDTO> getAllOrders();
    DeliveryOrderResponseDTO updateOrder(Long id, DeliveryOrderRequestDTO request);
    void deleteOrder(Long id);

    // Extra
    List<DeliveryOrderResponseDTO> getOrdersByShipmentId(Long shipmentId);
    List<DeliveryOrderResponseDTO> getOrdersByDriverId(Long driverId);
}
