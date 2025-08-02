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

import com.cdac.acts.logistic_v1.DTO.CustomerDTO;
import com.cdac.acts.logistic_v1.DTO.UserDTO;
import com.cdac.acts.logistic_v1.service.CustomerService;
import com.cdac.acts.logistic_v1.service.UserService;
import com.cdac.acts.logistics_v1.model.Customer;
import com.cdac.acts.logistics_v1.model.User;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CustomerController {

	@Autowired
	CustomerService customerService;
	
	@PostMapping("addCustomer")
	public void addCustomer(@RequestBody CustomerDTO customerDTO  ) {
		customerService.addCustomer(customerDTO);
	}
	
	@PostMapping("updateCustomer")
	public String updateCustomer(@RequestBody CustomerDTO customerDTO) {
		return customerService.updateCustomer(customerDTO) != null? "User updated successfully !!!" : "User could not be updated";
	}
	
	@GetMapping("deleteCustomer/{ID}")
	public String deleteCustomer(@RequestParam Long id) {
		return customerService.deleteCustomer(id) ? "User deleted successfully !!!" : "User could not be deleted";
	}
	
	@GetMapping("getCustomer")
	public List<Customer> getCustomer(@RequestParam int pageNo, @RequestParam int pageSize) {
		return customerService.getCustomer(pageNo-1,pageSize);
	}
	
	//Change return type to user 
	@GetMapping("getUsersById/{ID}")
	public boolean getUserById(@PathVariable Long id) {
		return customerService.getCustomerById(id);
	}
	
	
}
