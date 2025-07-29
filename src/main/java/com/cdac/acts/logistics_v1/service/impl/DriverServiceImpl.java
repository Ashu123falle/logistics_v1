package com.cdac.acts.logistics_v1.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.acts.logistics_v1.dto.DriverDTO;
import com.cdac.acts.logistics_v1.model.Driver;
import com.cdac.acts.logistics_v1.repository.DriverRepository;
import com.cdac.acts.logistics_v1.service.DriverService;


@Service
public class DriverServiceImpl implements DriverService {
	
	@Autowired
	private DriverRepository driverRepository;

	@Override
	public DriverDTO addDriver(DriverDTO driver) {
		Driver newDriver = new Driver();
		BeanUtils.copyProperties(driver, newDriver);
		try {
			driverRepository.save(newDriver);
			return driver;
		} catch (Exception e) {
			// Handle the exception, e.g., log it or rethrow it
			return null;
		}
		
	}

	@Override
	public DriverDTO getDriverById(Long id) {
		Driver driver = driverRepository.findById(id).orElse(null);
		if (driver != null) {
			DriverDTO driverDTO = new DriverDTO();
			BeanUtils.copyProperties(driver, driverDTO);
			return driverDTO;
		}
		return null; // or throw an exception if driver not found
	}

	@Override
	public List<DriverDTO> getAllDrivers() {
		List<Driver> drivers = driverRepository.findAll();
		List<DriverDTO> driverDTOs = new ArrayList<>();
		for (Driver driver : drivers) {
			DriverDTO driverDTO = new DriverDTO();
			BeanUtils.copyProperties(driver, driverDTO);
			driverDTOs.add(driverDTO);
		}
		return driverDTOs;
	}

	@Override
	public DriverDTO updateDriver(Long id, DriverDTO updatedDriver) {
		Driver existingDriver = driverRepository.findById(id).orElse(null);
		if (existingDriver != null) {
			BeanUtils.copyProperties(updatedDriver, existingDriver, "id"); // Exclude id from update
			try {
				driverRepository.save(existingDriver);
				return updatedDriver;
			} catch (Exception e) {
				// Handle the exception, e.g., log it or rethrow it
				return null;
			}
		}
		return null; // or throw an exception if driver not found
	}

	@Override
	public void deleteDriver(Long id) {
		if (!driverRepository.existsById(id)) {
			// Optionally, you can throw an exception or return a specific response
			return; // or throw an exception if driver not found
		}
		try {
			driverRepository.deleteById(id);
		} catch (Exception e) {
			// Handle the exception, e.g., log it or rethrow it
			// You might want to log the error or throw a custom exception
		}
		
	}

}
