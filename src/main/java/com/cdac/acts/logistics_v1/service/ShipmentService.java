package com.cdac.acts.logistics_v1.service;

import java.util.List;

import com.cdac.acts.logistics_v1.dto.ShipmentRequestDTO;
import com.cdac.acts.logistics_v1.dto.ShipmentResponseDTO;

public interface ShipmentService {
    ShipmentResponseDTO createShipment(ShipmentRequestDTO request);
    ShipmentResponseDTO getShipmentById(Long id);
    List<ShipmentResponseDTO> getAllShipments();
    ShipmentResponseDTO updateShipment(Long id, ShipmentRequestDTO request);
    void deleteShipment(Long id);

    // Extra
    List<ShipmentResponseDTO> getShipmentsByType(String type);
}

