package com.cdac.acts.logistics_v1.service;

import com.cdac.acts.logistics_v1.dto.DriverDTO;
import com.cdac.acts.logistics_v1.model.Driver;
import java.util.List;

public interface DriverService {
    DriverDTO addDriver(DriverDTO driver);
    DriverDTO getDriverById(Long id);
    List<DriverDTO> getAllDrivers();
    DriverDTO updateDriver(Long id, DriverDTO updatedDriver);
    void deleteDriver(Long id);
}
