package com.cdac.acts.logistics_v1.service;

import com.cdac.acts.logistics_v1.model.Vehicle;
import java.util.List;

public interface VehicleService {
    Vehicle addVehicle(Vehicle vehicle);
    Vehicle getVehicleById(Long id);
    List<Vehicle> getAllVehicles();
    Vehicle updateVehicle(Long id, Vehicle updatedVehicle);
    void deleteVehicle(Long id);
}
