package com.cdac.acts.logistics_v1.service;

import com.cdac.acts.logistics_v1.dto.DriverLocationRequestDTO;
import com.cdac.acts.logistics_v1.dto.DriverLocationResponseDTO;

public interface DriverLocationService {
    DriverLocationResponseDTO updateLocation(Long driverId, DriverLocationRequestDTO request);
    DriverLocationResponseDTO getCurrentLocation(Long driverId);
}

