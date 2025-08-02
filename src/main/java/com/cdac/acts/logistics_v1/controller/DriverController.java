package com.cdac.acts.logistics_v1.controller;


import com.cdac.acts.logistics_v1.dto.DriverRequestDTO;
import com.cdac.acts.logistics_v1.dto.DriverResponseDTO;
import com.cdac.acts.logistics_v1.model.Driver;
import com.cdac.acts.logistics_v1.service.DriverService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

	@CrossOrigin(origins = "http://localhost:3000")
	@RestController
	@RequestMapping("/driver") // Base path for all driver APIs
	public class DriverController {
	    
	    @Autowired
	    private DriverService driverService;

	    // ✅ Add Driver
	    @PostMapping("/addDriver")
	    public void addDriver(@RequestBody DriverRequestDTO driverDTO) {
	        driverService.createDriver(driverDTO);
	    }

	    // ✅ Update Driver
	    @PostMapping("/updateDriver")
	    public String updateDriver(@RequestBody DriverRequestDTO driverDTO) {
	        return driverService.updateDriver(driverDTO.getVehicleId(),driverDTO) != null 
	                ? "Driver updated successfully !!!" 
	                : "Driver could not be updated";
	    }

	    // ✅ Delete Driver by ID
	    @DeleteMapping("/deleteDriver/{id}")
	    public String deleteDriver(@PathVariable Long id) {
	        return driverService.deleteDriver(id) 
	                ? "Driver deleted successfully !!!" 
	                : "Driver could not be deleted";
	    }

//	    // ✅ Get All Drivers with Pagination
//	    @GetMapping("/getDrivers")
//	    public List<Driver> getDrivers(@RequestParam int pageNo, @RequestParam int pageSize) {
//	        return driverService.getDrivers(pageNo - 1, pageSize);
//	    }

	    // ✅ Get Driver by ID
	    @GetMapping("/getDriverById/{id}")
	    public DriverResponseDTO getDriverById(@PathVariable Long id) {
	        return driverService.getDriverById(id);
	    }
	}

	


