package com.cdac.acts.logistics_v1.service;

import com.cdac.acts.logistics_v1.model.Customer;
import java.util.List;

public interface CustomerService {
    Customer addCustomer(Customer customer);
    Customer getCustomerById(Long id);
    List<Customer> getAllCustomers();
    Customer updateCustomer(Long id, Customer updatedCustomer);
    void deleteCustomer(Long id);
}
