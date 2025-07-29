package com.cdac.acts.logistics_v1.service;

import java.util.List;

import com.cdac.acts.logistics_v1.dto.VehicleRequestDTO;
import com.cdac.acts.logistics_v1.dto.VehicleResponseDTO;

public interface VehicleService {
    VehicleResponseDTO createVehicle(VehicleRequestDTO request);
    VehicleResponseDTO getVehicleById(Long id);
    List<VehicleResponseDTO> getAllVehicles();
    VehicleResponseDTO updateVehicle(Long id, VehicleRequestDTO request);
    void deleteVehicle(Long id);

    // Extra
    List<VehicleResponseDTO> findAvailableVehicles();
}

