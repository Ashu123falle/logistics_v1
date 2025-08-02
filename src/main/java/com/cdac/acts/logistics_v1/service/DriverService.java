package com.cdac.acts.logistics_v1.service;

import java.util.List;

import com.cdac.acts.logistics_v1.dto.DriverRequestDTO;
import com.cdac.acts.logistics_v1.dto.DriverResponseDTO;
import com.cdac.acts.logistics_v1.model.Driver;

public interface DriverService {
    DriverResponseDTO createDriver(DriverRequestDTO request);
    DriverResponseDTO getDriverById(Long id);
    List<DriverResponseDTO> getAllDrivers();
    DriverResponseDTO updateDriver(Long id, DriverRequestDTO request);
    boolean deleteDriver(Long id);

    // Extra
    List<DriverResponseDTO> findAvailableDrivers();
    DriverResponseDTO assignVehicle(Long driverId, Long vehicleId);
//	List<Driver> getDrivers(int i, int pageSize);
}

