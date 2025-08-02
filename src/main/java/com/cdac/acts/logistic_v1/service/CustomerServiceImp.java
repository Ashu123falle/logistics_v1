package com.cdac.acts.logistic_v1.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.cdac.acts.logistic_v1.DTO.CustomerDTO;
import com.cdac.acts.logistics_v1.model.Customer;
import com.cdac.acts.logistics_v1.repository.CustomerRepository;

public class CustomerServiceImp implements CustomerService {
	
	@Autowired
	CustomerRepository customerRepository;

	@Override
	public boolean addCustomer(CustomerDTO customerDTO) {
		Customer customer = new Customer();
		BeanUtils.copyProperties(customerDTO, customer);
		try{
			customerRepository.save(customer);
		}catch(Exception e) {
			return false;
		}
		return true;
	}

	@Override
	public String updateCustomer(CustomerDTO customerDTO) {
		
		return null;
	}

	@Override
	public boolean deleteCustomer(Long id) {
		
		return false;
	}

	@Override
	public boolean getCustomerById(Long id) {
		
		return false;
	}

	@Override
	public List<Customer> getCustomer(int pageNo, int pageSize) {
		
		return null;
	}
	

}
