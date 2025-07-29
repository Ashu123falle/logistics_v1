package com.cdac.acts.logistics_v1.service;

import com.cdac.acts.logistics_v1.dto.CustomerDTO;
import com.cdac.acts.logistics_v1.model.Customer;
import java.util.List;

public interface CustomerService {
    CustomerDTO addCustomer(CustomerDTO customer);
    CustomerDTO getCustomerById(Long id);
    List<CustomerDTO> getAllCustomers();
    CustomerDTO updateCustomer(Long id, CustomerDTO updatedCustomer);
    void deleteCustomer(Long id);
}
