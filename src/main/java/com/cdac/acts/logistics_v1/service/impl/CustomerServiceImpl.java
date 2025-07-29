package com.cdac.acts.logistics_v1.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.acts.logistics_v1.dto.CustomerDTO;
import com.cdac.acts.logistics_v1.model.Customer;
import com.cdac.acts.logistics_v1.model.User;
import com.cdac.acts.logistics_v1.repository.CustomerRepository;
import com.cdac.acts.logistics_v1.service.CustomerService;

@Service
public class CustomerServiceImpl implements CustomerService {
	
	@Autowired
	CustomerRepository customerRepository;

	@Override
	public CustomerDTO addCustomer(CustomerDTO customerDTO) {
		Customer customer = new Customer();
		BeanUtils.copyProperties(customerDTO, customer);
		try{
			customerRepository.save(customer);
		}catch(Exception e) {
			// Handle the exception, e.g., log it or rethrow it
			return null;
		}
		return customerDTO;
	}

	@Override
	public CustomerDTO updateCustomer(Long id, CustomerDTO customerDTO) {
		Customer customer = new Customer();
		if(customerRepository.existsById(id)) {
			User user = new User();
			BeanUtils.copyProperties(customerDTO, user);
			try{
				customerRepository.save(customer);
				return customerDTO;
			}catch(Exception e) {
				// Handle the exception, e.g., log it or rethrow it
				return null;
			}
		}
		// If the customer does not exist, return null or throw an exception
		return null;
	}

	@Override
	public void deleteCustomer(Long id) {
		if (customerRepository.existsById(id)) {		
            try {        	
            	customerRepository.deleteById(id); 
                 
            } catch (Exception e) {
                // Handle the exception, e.g., log it or rethrow it
            }         
        }
		else {            
			//throw ecxception or return a specific response
		}
	}

	@Override
	public CustomerDTO getCustomerById(Long id) {
		
//		return customerRepository.findById(id).isEmpty() ? false : true;
		Customer customer = customerRepository.findById(id).orElse(null);
		if (customer != null) {
			CustomerDTO customerDTO = new CustomerDTO();
			BeanUtils.copyProperties(customer, customerDTO);
			return customerDTO;
		}
		return null; // or throw an exception if preferred
	}

//	@Override
//	public List<Customer> getAllCustomers(int pageNo, int pageSize) {
//		Pageable page = PageRequest.of(pageNo, pageSize);
//		return customerRepository.findAll(page).toList();
//	}

	@Override
	public List<CustomerDTO> getAllCustomers() {
		List<Customer> customers = customerRepository.findAll();
		List<CustomerDTO> customerDTOs = new ArrayList<>();
		for (Customer customer : customers) {
			CustomerDTO customerDTO = new CustomerDTO();
			BeanUtils.copyProperties(customer, customerDTO);
			customerDTOs.add(customerDTO);
		}
		return customerDTOs;
	}
	

}