package com.cdac.acts.logistics_v1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.acts.logistics_v1.dto.CustomerDashboardDTO;
import com.cdac.acts.logistics_v1.dto.CustomerRequestDTO;
import com.cdac.acts.logistics_v1.dto.CustomerResponseDTO;
import com.cdac.acts.logistics_v1.dto.OtpVerificationRequest;
import com.cdac.acts.logistics_v1.service.CustomerService;
import com.cdac.acts.logistics_v1.service.OtpService;
import com.cdac.acts.logistics_v1.utilities.JwtUtil;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private OtpService otpService;
    
    @Autowired
    private JwtUtil jwtUtil;	

    // Create a new customer
    @PostMapping
    public ResponseEntity<String> createCustomer(@RequestBody CustomerRequestDTO customerDTO) {
        customerService.register(customerDTO);
        return ResponseEntity.status(201).body("Customer created successfully.");
    }

    // Update an existing customer
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<String> updateCustomer(@PathVariable Long id,
                                                 @RequestBody CustomerRequestDTO customerDTO) {
        boolean isUpdated = customerService.updateCustomer(id, customerDTO) != null;
        return isUpdated 
            ? ResponseEntity.ok("Customer updated successfully.")
            : ResponseEntity.badRequest().body("Failed to update customer.");
    }

    // Delete a customer by ID
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.ok("Customer deleted successfully.");
    }

    // Get all customers (admin only)
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<CustomerResponseDTO>> getAllCustomers(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {


        List<CustomerResponseDTO> customers = customerService.getAllCustomers(); 

        return ResponseEntity.ok(customers);
    }

    // Get customer details by ID (self or admin)
    @PreAuthorize("#id == authentication.principal.user.userId or hasRole('ADMIN') or hasRole('DRIVER')")
    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponseDTO> getCustomerById(@PathVariable Long id) {
        CustomerResponseDTO customer = customerService.getCustomerById(id);
        return customer != null 
            ? ResponseEntity.ok(customer)
            : ResponseEntity.notFound().build();
    }

    // Get dashboard metrics for a customer by ID (admin)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/dashboard/{customerId}")
    public ResponseEntity<CustomerDashboardDTO> getCustomerDashboard(@PathVariable Long customerId) {
        return ResponseEntity.ok(customerService.getCustomerDashboard(customerId));
    }
    
    // Get dashboard metrics for a logged-in customer (via JWT token)
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/dashboard")
    public ResponseEntity<CustomerDashboardDTO> getCustomerDashboard(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        Long customerId = jwtUtil.extractUserId(token); 
        return ResponseEntity.ok(customerService.getCustomerDashboard(customerId));
    }

    // Register a customer with OTP verification
    @PostMapping("register-customer")
    public ResponseEntity<String> register(@RequestBody CustomerRequestDTO request) {
        customerService.registerTempCustomer(request);
        return ResponseEntity.ok("OTP sent to email");
    }

    // Verify OTP and finalize customer registration
    @PostMapping("verify-customer-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody OtpVerificationRequest otpRequest) {
        boolean isValid = otpService.verifyOtp(otpRequest.getEmail(), otpRequest.getOtp());
        if (isValid) {
            customerService.saveCustomerIfOtpVerified(otpRequest.getEmail());
            return ResponseEntity.ok("Registration successful");
        }
        return ResponseEntity.badRequest().body("Invalid or expired OTP");
    }
}
