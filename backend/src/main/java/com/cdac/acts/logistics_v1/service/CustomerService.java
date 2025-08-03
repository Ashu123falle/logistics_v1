package com.cdac.acts.logistics_v1.service;

import java.util.List;

import com.cdac.acts.logistics_v1.dto.CustomerRequestDTO;
import com.cdac.acts.logistics_v1.dto.CustomerResponseDTO;
import com.cdac.acts.logistics_v1.dto.ShipmentResponseDTO;

public interface CustomerService {
    CustomerResponseDTO createCustomer(CustomerRequestDTO request);
    CustomerResponseDTO getCustomerById(Long id);
    List<CustomerResponseDTO> getAllCustomers();
    CustomerResponseDTO updateCustomer(Long id, CustomerRequestDTO request);
    void deleteCustomer(Long id);

    // Extra
    List<ShipmentResponseDTO> getCustomerShipments(Long customerId);
    
  //Registration
    void registerTempCustomer(CustomerRequestDTO request);
    void saveCustomerIfOtpVerified(String email);
}
