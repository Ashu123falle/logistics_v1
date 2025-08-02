package com.cdac.acts.logistics_v1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.acts.logistics_v1.dto.CustomerRequestDTO;
import com.cdac.acts.logistics_v1.dto.CustomerResponseDTO;
import com.cdac.acts.logistics_v1.service.CustomerService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CustomerController {

	@Autowired
	CustomerService customerService;
	
	@PostMapping("addCustomer")
	public void addCustomer(@RequestBody CustomerRequestDTO customerDTO  ) {
		customerService.createCustomer(customerDTO);
	}
	
	@PostMapping("updateCustomer/{id}")
	public String updateCustomer(@RequestBody CustomerRequestDTO customerDTO,@RequestParam long id) {
		return customerService.updateCustomer(id,customerDTO) != null? "User updated successfully !!!" : "User could not be updated";
	}
	
	@GetMapping("deleteCustomer/{ID}")
	public String deleteCustomer(@RequestParam Long id) {
		customerService.deleteCustomer(id);
		return   "User deleted successfully !!!";
	}
	
	@GetMapping("getCustomer")
	public List<CustomerResponseDTO> getCustomer(@RequestParam int pageNo, @RequestParam int pageSize) {
		return customerService.getAllCustomers();
	}
	
	//Change return type to user 
	@GetMapping("getCustomerById/{ID}")
	public CustomerResponseDTO getUserById(@PathVariable Long id) {
		return customerService.getCustomerById(id);
	}
	
	
}
