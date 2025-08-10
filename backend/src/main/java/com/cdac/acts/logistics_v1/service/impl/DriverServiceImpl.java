package com.cdac.acts.logistics_v1.service.impl;


import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdac.acts.logistics_v1.dto.DriverLocationRequestDTO;
import com.cdac.acts.logistics_v1.dto.DriverLocationResponseDTO;
import com.cdac.acts.logistics_v1.dto.DriverRequestDTO;
import com.cdac.acts.logistics_v1.dto.DriverResponseDTO;
import com.cdac.acts.logistics_v1.enums.Role;
import com.cdac.acts.logistics_v1.enums.UserStatus;
import com.cdac.acts.logistics_v1.exception.ResourceNotFoundException;
import com.cdac.acts.logistics_v1.model.Driver;
import com.cdac.acts.logistics_v1.model.DriverLocation;
import com.cdac.acts.logistics_v1.model.Vehicle;
import com.cdac.acts.logistics_v1.repository.DriverLocationRepository;
import com.cdac.acts.logistics_v1.repository.DriverRepository;
import com.cdac.acts.logistics_v1.repository.VehicleRepository;
import com.cdac.acts.logistics_v1.service.DriverService;
import com.cdac.acts.logistics_v1.utilities.OtpStore;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DriverServiceImpl implements DriverService {

    private final DriverRepository driverRepository;
    
    private final VehicleRepository vehicleRepository;
    
    private final DriverLocationRepository driverLocationRepository;
    
    private final OtpServiceImpl otpService;
  
    private final PasswordEncoder passwordEncoder;
    
    private DriverResponseDTO mapToResponseDTO(Driver driver) {
        return DriverResponseDTO.builder()
        		.userId(driver.getUserId())
        		.firstName(driver.getFirstName())
        		.lastName(driver.getLastName())
        		.username(driver.getUsername())
        		.email(driver.getEmail())
        		.phoneNumber(driver.getPhoneNumber())
        		.role(driver.getRole())
        		.status(driver.getStatus())
        		.licenseNumber(driver.getLicenseNumber())
        		.vehicle(driver.getCurrentVehicle())
                .build();
    }

    private Driver mapToEntity(DriverRequestDTO driver) {
    	return Driver.builder()
    			     .firstName(driver.getFirstName())
    			     .lastName(driver.getLastName())
    			     .username(driver.getUsername())
    			     .password(driver.getPassword())
    			     .email(driver.getEmail())
    			     .phoneNumber(driver.getPhoneNumber())
    			     .role(Role.DRIVER)
    			     .status(UserStatus.ACTIVE)
    			     .licenseNumber(driver.getLicenseNumber())
    			     .build();
    }
    
	@Override
	public DriverResponseDTO createDriver(DriverRequestDTO request) {
		Driver newDriver = mapToEntity(request);
		newDriver.setCreatedAt(LocalDateTime.now());
		newDriver.setPassword(passwordEncoder.encode(newDriver.getPassword()));
		return mapToResponseDTO(driverRepository.save(newDriver));
		
	}
	@Override
	public DriverResponseDTO getDriverById(Long id) {
		Driver driver = driverRepository.findById(id)
				                        .orElseThrow(() -> new ResourceNotFoundException("Driver not Found( id: "+id+" )"));
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
		Driver updateDriver = driverRepository.findById(id)
                                              .orElseThrow(() -> new ResourceNotFoundException("Driver not Found( id: "+id+" )"));
        updateDriver = mapToEntity(request);
        updateDriver.setUserId(id);
        updateDriver.setUpdatedAt(LocalDateTime.now());
        updateDriver.setStatus(request.getStatus());
        
        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
        		                           .orElse(null);
        updateDriver.setCurrentVehicle(vehicle);
        
		return mapToResponseDTO(driverRepository.save(updateDriver));
	}
	@Override
	public void deleteDriver(Long id) {
		Driver deleteDriver = driverRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Driver not Found( id: "+id+" )"));
		driverRepository.delete(deleteDriver);
		
	}
	@Override
	public List<DriverResponseDTO> findAvailableDrivers() {
		
		return driverRepository.findAll()
				                .stream()
				                .filter(driver -> driver.getStatus() == UserStatus.ACTIVE)
				                .map(this::mapToResponseDTO)
				                .collect(Collectors.toList());
	}
	@Override
	public DriverResponseDTO assignVehicle(Long driverId, Long vehicleId) {
		Driver updateDriver = driverRepository.findById(driverId)
				.orElseThrow(() -> new ResourceNotFoundException("Driver not Found( id: "+driverId+" )"));
		Vehicle vehicle = vehicleRepository.findById(vehicleId)
				.orElseThrow(() -> new ResourceNotFoundException("Vehicle not Found( id: "+vehicleId+" )"));
        updateDriver.setCurrentVehicle(vehicle);
        
		return mapToResponseDTO(driverRepository.save(updateDriver));
	}

	@Override
	public DriverLocationResponseDTO updateLocation(DriverLocationRequestDTO driverLocaction) {
	    
		System.out.println("Incoming location update: " + driverLocaction.getDriverId() + ", " + driverLocaction.getLatitude() + ", " + driverLocaction.getLongitude());

	    Driver driver = driverRepository.findById(driverLocaction.getDriverId())
	            .orElseThrow(() -> new ResourceNotFoundException("Driver not Found( id: " + driverLocaction.getDriverId() + " )"));

	    DriverLocation updateLocation = driverLocationRepository.findByDriverUserId(driverLocaction.getDriverId());

	    if (updateLocation == null) {
	        updateLocation = DriverLocation.builder()
	                .driver(driver)
	                .latitude(driverLocaction.getLatitude())
	                .longitude(driverLocaction.getLongitude())
	                .timestamp(LocalDateTime.now())
	                .build();
	    } else {
	        updateLocation.setLatitude(driverLocaction.getLatitude());
	        updateLocation.setLongitude(driverLocaction.getLongitude());
	        updateLocation.setTimestamp(LocalDateTime.now());
	    }

	    updateLocation = driverLocationRepository.save(updateLocation);

	    return DriverLocationResponseDTO.builder()
	            .id(updateLocation.getId())
	            .driverId(updateLocation.getDriver().getUserId())
	            .latitude(updateLocation.getLatitude())
	            .longitude(updateLocation.getLongitude())
	            .timestamp(updateLocation.getTimestamp())
	            .build();
	}


	@Override
	public void registerTempDriver(DriverRequestDTO request) {
		if(driverRepository.existsByEmail(request.getEmail())) {
			throw new RuntimeException("Driver with this email already exists");
		}
		OtpStore.tempDriver.put(request.getEmail(), request);
		otpService.generateAndSendOtp(request.getEmail());
		
		
	}

	@Override
	public void saveDriverIfOtpVerified(String email) {
		DriverRequestDTO driverRequestDTO = OtpStore.tempDriver.get(email);
		if (driverRequestDTO != null) {
			Driver driver = Driver.builder()
					.firstName(driverRequestDTO.getFirstName())
					.lastName(driverRequestDTO.getLastName())
					.username(driverRequestDTO.getUsername())
					.email(driverRequestDTO.getEmail())
					.phoneNumber(driverRequestDTO.getPhoneNumber())
					.role(Role.DRIVER)
					.status(UserStatus.ACTIVE)
					.licenseNumber(driverRequestDTO.getLicenseNumber())
					.password(passwordEncoder.encode(driverRequestDTO.getPassword())) // Hash the password
					.createdAt(LocalDateTime.now())
					.build();
			
			if (driverRequestDTO.getVehicleId() != null) {
				Vehicle vehicle = vehicleRepository.findById(driverRequestDTO.getVehicleId())
						.orElseThrow(() -> new RuntimeException("Vehicle not found"));
				driver.setCurrentVehicle(vehicle);
			}
			
			driverRepository.save(driver);
			OtpStore.tempDriver.remove(email); // Clear the temporary driver after saving
		}
		
	}
    

}

