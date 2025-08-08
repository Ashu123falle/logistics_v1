package com.cdac.acts.logistics_v1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.acts.logistics_v1.dto.AuthRequestDTO;
import com.cdac.acts.logistics_v1.dto.AuthResponseDTO;
import com.cdac.acts.logistics_v1.dto.ResetPasswordRequestDTO;
import com.cdac.acts.logistics_v1.dto.UserRequestDTO;
import com.cdac.acts.logistics_v1.dto.UserResponseDTO;
import com.cdac.acts.logistics_v1.service.OtpService;
import com.cdac.acts.logistics_v1.service.UserService;

@RestController 
@RequestMapping("/api/auth") 
public class AuthController {

    @Autowired

    private UserService userService; // Service for user authentication and registration

    @Autowired
    private OtpService otpService;


    @PostMapping("/register") // Handles user registration
    public ResponseEntity<UserResponseDTO> register(@RequestBody UserRequestDTO request) {
        return ResponseEntity.status(201).body(userService.register(request)); // Returns created user with 201 status
    }

    @PostMapping("/login") // Handles user login
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO request) {
        try {
            AuthResponseDTO response = userService.authenticate(request); // Authenticate user
            return ResponseEntity.ok(response); // Return successful authentication response
        } catch (RuntimeException e) {
            // Return error response if authentication fails
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(AuthResponseDTO.builder()
                            .message("Login failed: " + e.getMessage())
                            .token(null)
                            .build());
        }
    }
    
    
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody String email) {
		try {
			userService.forgotPassword(email);
			return ResponseEntity.ok("Password reset link sent to your email.");
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
		}
	}


    @PostMapping("/verify-otp")
	public ResponseEntity<String> verifyOtp(@RequestBody ResetPasswordRequestDTO request) {
			boolean isValid = otpService.verifyOtp(request.getEmail(), request.getOtp());
			if (isValid) {
				userService.resetPassword(request.getEmail(), request.getNewPassword());
				return ResponseEntity.ok("Password reset successfully.");
			}
		
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired OTP. Please try again.");
	}

}
