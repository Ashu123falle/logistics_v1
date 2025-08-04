package com.cdac.acts.logistics_v1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.acts.logistics_v1.dto.DriverRequestDTO;
import com.cdac.acts.logistics_v1.dto.DriverResponseDTO;
import com.cdac.acts.logistics_v1.dto.OtpVerificationRequest;
import com.cdac.acts.logistics_v1.service.DriverService;
import com.cdac.acts.logistics_v1.service.OtpService;

@RestController
@RequestMapping("/api/driver")
@CrossOrigin("*")
public class DriverController {
	
	@Autowired
	private DriverService driverService;
	
	@Autowired
    private OtpService otpService;
	
	@GetMapping("/{id}")
	public ResponseEntity<DriverResponseDTO> getDriverById(@PathVariable Long id) {
		DriverResponseDTO driver = driverService.getDriverById(id);
		return driver != null 
		? ResponseEntity.ok(driver)
	            : ResponseEntity.notFound().build();
	}
	
	 @PostMapping("register-driver")
	    public ResponseEntity<String> register(@RequestBody DriverRequestDTO request) {
		 driverService.registerTempDriver(request);
	        return ResponseEntity.ok("OTP sent to email");
	    }

	    @PostMapping("verify-driver-otp")
	    public ResponseEntity<String> verifyOtp(@RequestBody OtpVerificationRequest otpRequest) {
	        boolean isValid = otpService.verifyOtp(otpRequest.getEmail(), otpRequest.getOtp());
	        if (isValid) {
	        	driverService.saveDriverIfOtpVerified(otpRequest.getEmail());
	            return ResponseEntity.ok("Registration successful");
	        }
	        return ResponseEntity.badRequest().body("Invalid or expired OTP");
	    }

}
