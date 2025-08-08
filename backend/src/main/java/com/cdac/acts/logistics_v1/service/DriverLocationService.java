package com.cdac.acts.logistics_v1.service;

import com.cdac.acts.logistics_v1.dto.DriverLocationRequestDTO;
import com.cdac.acts.logistics_v1.dto.DriverLocationResponseDTO;

public interface DriverLocationService {

    // Update the current location of a driver
    DriverLocationResponseDTO updateLocation(Long driverId, DriverLocationRequestDTO request);

    // Retrieve the most recent location of a driver
    DriverLocationResponseDTO getCurrentLocation(Long driverId);
}
