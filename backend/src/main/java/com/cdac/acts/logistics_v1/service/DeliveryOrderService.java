package com.cdac.acts.logistics_v1.service;

import java.util.List;

import com.cdac.acts.logistics_v1.dto.DeliveryOrderRequestDTO;
import com.cdac.acts.logistics_v1.dto.DeliveryOrderResponseDTO;

public interface DeliveryOrderService {

    // Create a new delivery order
    DeliveryOrderResponseDTO createOrder(DeliveryOrderRequestDTO request);


    // Retrieve a delivery order by its ID
    DeliveryOrderResponseDTO getOrderById(Long id);

    // Retrieve all delivery orders with pagination

    List<DeliveryOrderResponseDTO> getAllOrders(int pageNo, int pageSize);

    // Update an existing delivery order by ID
    DeliveryOrderResponseDTO updateOrder(Long id, DeliveryOrderRequestDTO request);

    // Delete a delivery order by ID
    void deleteOrder(Long id);

    // Retrieve all delivery orders linked to a specific shipment
    List<DeliveryOrderResponseDTO> getOrdersByShipmentId(Long shipmentId);

    // Retrieve all delivery orders assigned to a specific driver
    List<DeliveryOrderResponseDTO> getOrdersByDriverId(Long driverId);

    // Update the status of a delivery order
    DeliveryOrderResponseDTO updateStatus(Long id, String status);
	DeliveryOrderResponseDTO getOrderById(Long id);
	DeliveryOrderResponseDTO optVerifyOrderTrack(String email);
	String getOrderByIdTrack(Long id);
}
