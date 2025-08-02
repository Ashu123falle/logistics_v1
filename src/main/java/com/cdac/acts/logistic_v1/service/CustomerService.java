package com.cdac.acts.logistic_v1.service;

import java.util.List;

import com.cdac.acts.logistic_v1.DTO.CustomerDTO;
import com.cdac.acts.logistics_v1.model.Customer;


public interface CustomerService {
	public boolean addCustomer(CustomerDTO customerDTO);
	public String updateCustomer(CustomerDTO customerDTO);
	public boolean deleteCustomer(Long id);
	public boolean getCustomerById(Long id);
	public List<Customer> getCustomer(int pageNo, int pageSize);
	
}
