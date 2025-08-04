package com.cdac.acts.logistics_v1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.acts.logistics_v1.dto.CustomerRequestDTO;
import com.cdac.acts.logistics_v1.dto.CustomerResponseDTO;
import com.cdac.acts.logistics_v1.dto.OtpVerificationRequest;
import com.cdac.acts.logistics_v1.model.Customer;
import com.cdac.acts.logistics_v1.repository.CustomerRepository;
import com.cdac.acts.logistics_v1.service.CustomerService;
import com.cdac.acts.logistics_v1.service.OtpService;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin("*")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private OtpService otpService;
    
   
    @PutMapping("/{id}")
    public ResponseEntity<String> updateCustomer(@PathVariable Long id,
                                                 @RequestBody CustomerRequestDTO customerDTO) {
        boolean isUpdated = customerService.updateCustomer(id, customerDTO) != null;
        return isUpdated 
            ? ResponseEntity.ok("Customer updated successfully.")
            : ResponseEntity.badRequest().body("Failed to update customer.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.ok("Customer deleted successfully.");
    }

    @GetMapping
    public ResponseEntity<List<CustomerResponseDTO>> getAllCustomers(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {

        List<CustomerResponseDTO> customers = customerService.getAllCustomers(); // Add pagination later if needed
        return ResponseEntity.ok(customers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponseDTO> getCustomerById(@PathVariable Long id) {
        CustomerResponseDTO customer = customerService.getCustomerById(id);
        return customer != null 
            ? ResponseEntity.ok(customer)
            : ResponseEntity.notFound().build();
    }

    @PostMapping("register-customer")
    public ResponseEntity<String> register(@RequestBody CustomerRequestDTO request) {
        customerService.registerTempCustomer(request);
        return ResponseEntity.ok("OTP sent to email");
    }

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
