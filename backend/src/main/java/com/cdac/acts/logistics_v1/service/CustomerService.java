package com.cdac.acts.logistics_v1.service;

import java.util.List;

import com.cdac.acts.logistics_v1.dto.CustomerDashboardDTO;
import com.cdac.acts.logistics_v1.dto.CustomerRequestDTO;
import com.cdac.acts.logistics_v1.dto.CustomerResponseDTO;
import com.cdac.acts.logistics_v1.dto.ShipmentResponseDTO;

public interface CustomerService {

    // Register a new customer
    CustomerResponseDTO register(CustomerRequestDTO request);

    // Retrieve a customer by their ID
    CustomerResponseDTO getCustomerById(Long id);

    // Retrieve a list of all customers
    List<CustomerResponseDTO> getAllCustomers();

    // Update an existing customer by ID
    CustomerResponseDTO updateCustomer(Long id, CustomerRequestDTO request);

    // Delete a customer by ID
    void deleteCustomer(Long id);

    // Retrieve all shipments belonging to a specific customer
    List<ShipmentResponseDTO> getCustomerShipments(Long customerId);

    // Retrieve customer dashboard data
    CustomerDashboardDTO getCustomerDashboard(Long customerId);

    // Temporarily register a customer before OTP verification
    void registerTempCustomer(CustomerRequestDTO request);

    // Save customer details after OTP verification
    void saveCustomerIfOtpVerified(String email);
}
