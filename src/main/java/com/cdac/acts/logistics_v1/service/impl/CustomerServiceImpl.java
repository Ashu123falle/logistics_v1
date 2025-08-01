package com.cdac.acts.logistics_v1.service.impl;

import com.cdac.acts.logistics_v1.dto.CustomerRequestDTO;
import com.cdac.acts.logistics_v1.dto.CustomerResponseDTO;
import com.cdac.acts.logistics_v1.dto.ShipmentResponseDTO;
import com.cdac.acts.logistics_v1.model.Customer;
import com.cdac.acts.logistics_v1.model.Shipment;
import com.cdac.acts.logistics_v1.repository.CustomerRepository;
import com.cdac.acts.logistics_v1.repository.ShipmentRepository;
import com.cdac.acts.logistics_v1.service.CustomerService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private final CustomerRepository customerRepository;
	@Autowired
	private final ShipmentRepository shipmentRepository;

	@Override
	public CustomerResponseDTO createCustomer(CustomerRequestDTO request) {
		Customer customer = Customer.builder()
				.firstName(request.getFirstName())
				.lastName(request.getLastName())
				.username(request.getUsername())
				.email(request.getEmail())
				.password(request.getPassword()) // You can encode password if using Spring Security
				.phoneNumber(request.getPhoneNumber())
				.role(com.cdac.acts.logistics_v1.enums.Role.CUSTOMER)
				.status(com.cdac.acts.logistics_v1.enums.UserStatus.ACTIVE)
				.onboardingDate(LocalDateTime.now())
				//                .kycStatus("PENDING")
				.companyName(request.getCompanyName())
				.gstNumber(request.getGstNumber())
				.panNumber(request.getPanNumber())
				.industryType(request.getIndustryType())
				.companyAddress(request.getCompanyAddress())
				.contactPersonName(request.getContactPersonName())
				.contactPersonPhone(request.getContactPersonPhone())
				.companyEmail(request.getCompanyEmail())
				.build();

		Customer saved = customerRepository.save(customer);
		return mapToDTO(saved);
	}

	@Override
	public CustomerResponseDTO getCustomerById(Long id) {
		Customer customer = customerRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));
		return mapToDTO(customer);
	}

	@Override
	public List<CustomerResponseDTO> getAllCustomers() {
		return customerRepository.findAll()
				.stream()
				.map(this::mapToDTO)
				.collect(Collectors.toList());
	}

	@Override
	public CustomerResponseDTO updateCustomer(Long id, CustomerRequestDTO request) {
		Customer existing = customerRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));

		existing.setFirstName(request.getFirstName());
		existing.setLastName(request.getLastName());
		existing.setEmail(request.getEmail());
		existing.setPhoneNumber(request.getPhoneNumber());

		existing.setCompanyName(request.getCompanyName());
		existing.setGstNumber(request.getGstNumber());
		existing.setPanNumber(request.getPanNumber());
		existing.setIndustryType(request.getIndustryType());
		existing.setCompanyAddress(request.getCompanyAddress());
		existing.setContactPersonName(request.getContactPersonName());
		existing.setContactPersonPhone(request.getContactPersonPhone());
		existing.setCompanyEmail(request.getCompanyEmail());

		Customer updated = customerRepository.save(existing);
		return mapToDTO(updated);
	}

	@Override
	public void deleteCustomer(Long id) {
		Customer customer = customerRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));
		customerRepository.delete(customer);
	}

	@Override
	public List<ShipmentResponseDTO> getCustomerShipments(Long customerId) {
		Customer customer = customerRepository.findById(customerId)
				.orElseThrow(() -> new RuntimeException("Customer not found"));

		List<Shipment> shipments = shipmentRepository.findByCustomer_UserId(customer.getUserId());

		return shipments.stream()
				         .map(shipment -> ShipmentResponseDTO.builder()
				                                             .id(shipment.getId())
															 .type(shipment.getType())
															 .name(shipment.getName())
															 .description(shipment.getDescription())
															 .value(shipment.getValue())
															 .dimensions(shipment.getDimensions())
															 .weight(shipment.getWeight())
															 .customerId(shipment.getCustomer().getUserId())
															 .build()
				            )
				         .collect(Collectors.toList());
	}

	private CustomerResponseDTO mapToDTO(Customer customer) {
		return CustomerResponseDTO.builder()
				.userId(customer.getUserId())
				.firstName(customer.getFirstName())
				.lastName(customer.getLastName())
				.username(customer.getUsername())
				.email(customer.getEmail())
				.phoneNumber(customer.getPhoneNumber())
				.role(customer.getRole())
				.status(customer.getStatus())
				.companyName(customer.getCompanyName())
				.gstNumber(customer.getGstNumber())
				.panNumber(customer.getPanNumber())
				.industryType(customer.getIndustryType())
				.companyAddress(customer.getCompanyAddress())
				.contactPersonName(customer.getContactPersonName())
				.contactPersonPhone(customer.getContactPersonPhone())
				.companyEmail(customer.getCompanyEmail())
				.build();
	}
}
