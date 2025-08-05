package com.cdac.acts.logistics_v1.service;

import java.util.List;

import com.cdac.acts.logistics_v1.dto.DriverLocationRequestDTO;
import com.cdac.acts.logistics_v1.dto.DriverLocationResponseDTO;
import com.cdac.acts.logistics_v1.dto.DriverRequestDTO;
import com.cdac.acts.logistics_v1.dto.DriverResponseDTO;

public interface DriverService {
//    DriverResponseDTO createDriver(DriverRequestDTO request);
    DriverResponseDTO getDriverById(Long id);
    List<DriverResponseDTO> getAllDrivers();
    DriverResponseDTO updateDriver(Long id, DriverRequestDTO request);
    void deleteDriver(Long id);

    // Extra
    List<DriverResponseDTO> findAvailableDrivers();
    DriverResponseDTO assignVehicle(Long driverId, Long vehicleId);
    

    DriverLocationResponseDTO updateLocation(DriverLocationRequestDTO driverLocaction);

  //Registration
    void registerTempDriver(DriverRequestDTO request);
    void saveDriverIfOtpVerified(String email);

}

