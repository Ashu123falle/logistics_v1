package com.cdac.acts.logistics_v1.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.acts.logistics_v1.dto.CustomerRequestDTO;
import com.cdac.acts.logistics_v1.dto.CustomerResponseDTO;
import com.cdac.acts.logistics_v1.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;	

    // ✅ Create Customer
    @PostMapping
    public ResponseEntity<String> createCustomer(@RequestBody CustomerRequestDTO customerDTO) {
        customerService.createCustomer(customerDTO);
        return ResponseEntity.status(201).body("Customer created successfully.");
    }

    // ✅ Update Customer
    @PutMapping("/{id}")
    public ResponseEntity<String> updateCustomer(@PathVariable Long id,
                                                 @RequestBody CustomerRequestDTO customerDTO) {
        boolean isUpdated = customerService.updateCustomer(id, customerDTO) != null;
        return isUpdated 
            ? ResponseEntity.ok("Customer updated successfully.")
            : ResponseEntity.badRequest().body("Failed to update customer.");
    }

    // ✅ Delete Customer
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.ok("Customer deleted successfully.");
    }

    // ✅ Get All Customers (with pagination placeholders)
    @GetMapping
    public ResponseEntity<List<CustomerResponseDTO>> getAllCustomers(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {

        List<CustomerResponseDTO> customers = customerService.getAllCustomers(); // You can add pagination later
        return ResponseEntity.ok(customers);
    }

    // ✅ Get Customer by ID
    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponseDTO> getCustomerById(@PathVariable Long id) {
        CustomerResponseDTO customer = customerService.getCustomerById(id);
        return customer != null 
            ? ResponseEntity.ok(customer)
            : ResponseEntity.notFound().build();
    }
}
