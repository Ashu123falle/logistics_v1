package com.cdac.acts.logistics_v1.service;

import com.cdac.acts.logistics_v1.model.Driver;
import java.util.List;

public interface DriverService {
    Driver addDriver(Driver driver);
    Driver getDriverById(Long id);
    List<Driver> getAllDrivers();
    Driver updateDriver(Long id, Driver updatedDriver);
    void deleteDriver(Long id);
}
