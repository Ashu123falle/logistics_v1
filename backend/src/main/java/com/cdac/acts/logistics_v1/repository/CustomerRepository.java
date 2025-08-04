package com.cdac.acts.logistics_v1.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.acts.logistics_v1.dto.CustomerResponseDTO;
import com.cdac.acts.logistics_v1.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
	List<Customer> findByCompanyNameContainingIgnoreCase(String companyName);
    List<Customer> findByIndustryType(String industryType);
	Customer getCustomerByUsername(String username);
}
