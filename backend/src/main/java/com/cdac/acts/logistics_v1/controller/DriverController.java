package com.cdac.acts.logistics_v1.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.acts.logistics_v1.dto.DriverLocationRequestDTO;
import com.cdac.acts.logistics_v1.dto.DriverLocationResponseDTO;
import com.cdac.acts.logistics_v1.dto.DriverRequestDTO;
import com.cdac.acts.logistics_v1.dto.DriverResponseDTO;
import com.cdac.acts.logistics_v1.service.DriverService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/drivers")
@RequiredArgsConstructor 
public class DriverController {

    private final DriverService driverService;

    // Create driver
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DriverResponseDTO> createDriver(@RequestBody DriverRequestDTO request) {
        DriverResponseDTO createdDriver = driverService.createDriver(request);
        return ResponseEntity.ok(createdDriver);
    }

    // Get driver by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DRIVER')")
    public ResponseEntity<DriverResponseDTO> getDriverById(@PathVariable Long id) {
        DriverResponseDTO driver = driverService.getDriverById(id);
        return ResponseEntity.ok(driver);
    }

    // Get all drivers
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<DriverResponseDTO>> getAllDrivers() {
        return ResponseEntity.ok(driverService.getAllDrivers());
    }

    // Update driver
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DRIVER')")
    public ResponseEntity<DriverResponseDTO> updateDriver(
            @PathVariable Long id,
            @RequestBody DriverRequestDTO request) {
        DriverResponseDTO updatedDriver = driverService.updateDriver(id, request);
        return ResponseEntity.ok(updatedDriver);
    }

    // Delete driver
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteDriver(@PathVariable Long id) {
        driverService.deleteDriver(id);
        return ResponseEntity.noContent().build();
    }

    // Find available drivers
    @GetMapping("/available")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<DriverResponseDTO>> getAvailableDrivers() {
        return ResponseEntity.ok(driverService.findAvailableDrivers());
    }

    // Assign vehicle to driver
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{driverId}/assign-vehicle/{vehicleId}")
    public ResponseEntity<DriverResponseDTO> assignVehicle(
            @PathVariable Long driverId,
            @PathVariable Long vehicleId) {
        return ResponseEntity.ok(driverService.assignVehicle(driverId, vehicleId));
    }
    @PreAuthorize("hasRole('DRIVER')")
    @PostMapping("/update-location")
    public ResponseEntity<DriverLocationResponseDTO> updateLocation(
            @RequestBody DriverLocationRequestDTO locationRequest) {
    	
        DriverLocationResponseDTO updated = driverService.updateLocation(locationRequest);        
        return ResponseEntity.ok(updated);
        
    }
    
}
