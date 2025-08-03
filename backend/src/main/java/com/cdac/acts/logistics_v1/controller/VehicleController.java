package com.cdac.acts.logistics_v1.controller;

import com.cdac.acts.logistics_v1.dto.VehicleRequestDTO;
import com.cdac.acts.logistics_v1.dto.VehicleResponseDTO;
import com.cdac.acts.logistics_v1.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin("*")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    /**
     * Create a new vehicle
     */
    @PostMapping
    public ResponseEntity<VehicleResponseDTO> createVehicle(@RequestBody VehicleRequestDTO vehicleDTO) {
        VehicleResponseDTO createdVehicle = vehicleService.createVehicle(vehicleDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdVehicle);
    }

    /**
     * Update an existing vehicle by ID
     */
    @PutMapping("/{id}")
    public ResponseEntity<VehicleResponseDTO> updateVehicle(
            @PathVariable Long id,
            @RequestBody VehicleRequestDTO vehicleDTO) {

        VehicleResponseDTO updatedVehicle = vehicleService.updateVehicle(id, vehicleDTO);
        return ResponseEntity.ok(updatedVehicle);
    }

    /**
     * Delete vehicle by ID
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build(); 
    }

    /**
     * Get vehicle by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<VehicleResponseDTO> getVehicleById(@PathVariable Long id) {
        VehicleResponseDTO vehicle = vehicleService.getVehicleById(id);
        return ResponseEntity.ok(vehicle);
    }

    /**
     * Get all vehicles (with optional pagination)
     */
//    @GetMapping
//    public ResponseEntity<List<VehicleResponseDTO>> getAllVehicles(
//            @RequestParam(defaultValue = "1") int pageNo,
//            @RequestParam(defaultValue = "10") int pageSize) {
//
//        List<VehicleResponseDTO> vehicles = vehicleService.getAllVehicles(Math.max(pageNo - 1, 0), pageSize);
//        return ResponseEntity.ok(vehicles);
//    }
    
    
    // Get all vehicle (without optional pagination)
    @GetMapping
    public ResponseEntity<List<VehicleResponseDTO>> getAllVehicles() {

        List<VehicleResponseDTO> vehicles = vehicleService.getAllVehicles();
        return ResponseEntity.ok(vehicles);
    }
    
    
}
