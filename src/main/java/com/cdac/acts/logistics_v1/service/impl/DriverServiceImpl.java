package com.cdac.acts.logistics_v1.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.cdac.acts.logistics_v1.dto.DriverRequestDTO;
import com.cdac.acts.logistics_v1.dto.DriverResponseDTO;
import com.cdac.acts.logistics_v1.dto.VehicleBasicDTO;
import com.cdac.acts.logistics_v1.model.Driver;
import com.cdac.acts.logistics_v1.model.Vehicle;
import com.cdac.acts.logistics_v1.repository.DriverRepository;
import com.cdac.acts.logistics_v1.repository.VehicleRepository;
import com.cdac.acts.logistics_v1.service.DriverService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DriverServiceImpl implements DriverService {

    private final DriverRepository driverRepository;
    private final VehicleRepository vehicleRepository;

    @Override
    public DriverResponseDTO createDriver(DriverRequestDTO request) {
        Driver driver = Driver.builder()
                .name(request.getFirstName()+" " + request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .licenseNumber(request.getLicenseNumber())
                .build();

        if (request.getVehicleId() != null) {
            Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                    .orElseThrow(() -> new RuntimeException("Vehicle not found"));
            driver.setCurrentVehicle(vehicle);
        }

        driverRepository.save(driver);
        return mapToResponseDTO(driver);
    }

    @Override
    public DriverResponseDTO getDriverById(Long id) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found"));
        return mapToResponseDTO(driver);
    }

    @Override
    public List<DriverResponseDTO> getAllDrivers() {
        return driverRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DriverResponseDTO updateDriver(Long id, DriverRequestDTO request) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        driver.setName(request.getName());
        driver.setEmail(request.getEmail());
        driver.setPhone(request.getPhone());
        driver.setAddress(request.getAddress());
        driver.setLicenseNumber(request.getLicenseNumber());

        if (request.getVehicleId() != null) {
            Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                    .orElseThrow(() -> new RuntimeException("Vehicle not found"));
            driver.setCurrentVehicle(vehicle);
        } else {
            driver.setCurrentVehicle(null);
        }

        driverRepository.save(driver);
        return mapToResponseDTO(driver);
    }

    @Override
    public void deleteDriver(Long id) {
        driverRepository.deleteById(id);
    }

    @Override
    public List<DriverResponseDTO> findAvailableDrivers() {
        return driverRepository.findAll()
                .stream()
                .filter(driver -> driver.getCurrentVehicle() == null)
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DriverResponseDTO assignVehicle(Long driverId, Long vehicleId) {
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        driver.setCurrentVehicle(vehicle);
        driverRepository.save(driver);

        return mapToResponseDTO(driver);
    }

    private DriverResponseDTO mapToResponseDTO(Driver driver) {
        VehicleBasicDTO vehicleDTO = null;
        if (driver.getCurrentVehicle() != null) {
            vehicleDTO = VehicleBasicDTO.builder()
                    .id(driver.getCurrentVehicle().getId())
                    .plateNumber(driver.getCurrentVehicle().getPlateNumber())
                    .type(driver.getCurrentVehicle().getType())
                    .build();
        }

        return DriverResponseDTO.builder()
                .id(driver.getId())
                .name(driver.getName())
                .email(driver.getEmail())
                .phone(driver.getPhone())
                .address(driver.getAddress())
                .licenseNumber(driver.getLicenseNumber())
                .vehicle(vehicleDTO)
                .build();
    }
}
