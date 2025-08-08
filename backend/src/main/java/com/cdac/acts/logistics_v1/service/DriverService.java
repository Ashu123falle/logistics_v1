package com.cdac.acts.logistics_v1.service;

import java.util.List;

import com.cdac.acts.logistics_v1.dto.DriverLocationRequestDTO;
import com.cdac.acts.logistics_v1.dto.DriverLocationResponseDTO;
import com.cdac.acts.logistics_v1.dto.DriverRequestDTO;
import com.cdac.acts.logistics_v1.dto.DriverResponseDTO;

public interface DriverService {

    // Create a new driver
    DriverResponseDTO createDriver(DriverRequestDTO request);

    // Retrieve driver details by ID
    DriverResponseDTO getDriverById(Long id);

    // Retrieve all drivers
    List<DriverResponseDTO> getAllDrivers();

    // Update driver details
    DriverResponseDTO updateDriver(Long id, DriverRequestDTO request);

    // Delete a driver by ID
    void deleteDriver(Long id);

    // Find all available drivers
    List<DriverResponseDTO> findAvailableDrivers();

    // Assign a vehicle to a driver
    DriverResponseDTO assignVehicle(Long driverId, Long vehicleId);

    // Update the current location of a driver
    DriverLocationResponseDTO updateLocation(DriverLocationRequestDTO driverLocaction);

    // Register a driver temporarily (pending OTP verification)
    void registerTempDriver(DriverRequestDTO request);

    // Save driver details if OTP is verified
    void saveDriverIfOtpVerified(String email);
}
