package com.cdac.acts.logistics_v1.service.impl;

import com.cdac.acts.logistics_v1.dto.VehicleRequestDTO;
import com.cdac.acts.logistics_v1.dto.VehicleResponseDTO;
import com.cdac.acts.logistics_v1.model.Vehicle;
import com.cdac.acts.logistics_v1.repository.VehicleRepository;
import com.cdac.acts.logistics_v1.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    // Create vehicle
    @Override
    public VehicleResponseDTO createVehicle(VehicleRequestDTO request) {
        Vehicle vehicle = new Vehicle();
//        vehicle.setVehicleNumber(request.getVehicleNumber());
        vehicle.setModel(request.getModel());
        vehicle.setType(request.getType());
        vehicle.setCapacity(request.getCapacity());
        vehicle.setIsAvailable(true); // default as available

        Vehicle savedVehicle = vehicleRepository.save(vehicle);
        return mapToResponseDTO(savedVehicle);
    }

    // Get by ID 
    @Override
    public VehicleResponseDTO getVehicleById(Long id) {
        return vehicleRepository.findById(id)
                .map(this::mapToResponseDTO)
                .orElse(null); // or throw custom VehicleNotFoundException
    }

    // Get all 
    @Override
    public List<VehicleResponseDTO> getAllVehicles() {
        return vehicleRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    // Update 
    @Override
    public VehicleResponseDTO updateVehicle(Long id, VehicleRequestDTO request) {
        Optional<Vehicle> vehicleOpt = vehicleRepository.findById(id);
        if (vehicleOpt.isPresent()) {
            Vehicle vehicle = vehicleOpt.get();
//            vehicle.setVehicleNumber(request.getVehicleNumber());
            vehicle.setModel(request.getModel());
            vehicle.setType(request.getType());
            vehicle.setCapacity(request.getCapacity());

            Vehicle updatedVehicle = vehicleRepository.save(vehicle);
            return mapToResponseDTO(updatedVehicle);
        }
        return null;
    }

    // ------------------ Delete ------------------
    @Override
    public void deleteVehicle(Long id) {
        if (vehicleRepository.existsById(id)) {
            vehicleRepository.deleteById(id);
        }
    }

    // Find Available Vehicles 
    @Override
    public List<VehicleResponseDTO> findAvailableVehicles() {
        return vehicleRepository.findByIsAvailableTrue()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    // DTO Mapper 
    private VehicleResponseDTO mapToResponseDTO(Vehicle vehicle) {
        VehicleResponseDTO dto = new VehicleResponseDTO();
        dto.setId(vehicle.getId());
//        dto.setVehicleNumber(vehicle.getVehicleNumber());
        dto.setModel(vehicle.getModel());
        dto.setType(vehicle.getType());
        dto.setCapacity(vehicle.getCapacity());
        dto.setStatus(vehicle.getIsAvailable() ? "Available" : "Unavailable");
        return dto;
    }
}
