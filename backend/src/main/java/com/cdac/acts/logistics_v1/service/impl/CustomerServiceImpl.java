package com.cdac.acts.logistics_v1.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdac.acts.logistics_v1.dto.CustomerDashboardDTO;
import com.cdac.acts.logistics_v1.dto.CustomerRequestDTO;
import com.cdac.acts.logistics_v1.dto.CustomerResponseDTO;
import com.cdac.acts.logistics_v1.dto.ShipmentResponseDTO;
import com.cdac.acts.logistics_v1.exception.ResourceNotFoundException;
import com.cdac.acts.logistics_v1.exception.ResourceNotFoundException;
import com.cdac.acts.logistics_v1.model.Customer;
import com.cdac.acts.logistics_v1.model.Shipment;
import com.cdac.acts.logistics_v1.repository.CustomerRepository;
import com.cdac.acts.logistics_v1.repository.DeliveryOrderRepository;
import com.cdac.acts.logistics_v1.repository.ShipmentRepository;
import com.cdac.acts.logistics_v1.service.CustomerService;

import com.cdac.acts.logistics_v1.utilities.OtpStore;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {


	
	private final DeliveryOrderRepository deliveryOrderRepository;
	
    private final CustomerRepository customerRepository;

    private final ShipmentRepository shipmentRepository;

    private final PasswordEncoder passwordEncoder;

    private final OtpServiceImpl otpService;
  
    @Override
    public CustomerResponseDTO register(CustomerRequestDTO dto) {
    Customer customer = Customer.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .username(dto.getUsername())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .phoneNumber(dto.getPhoneNumber())
                .role(dto.getRole())
                .status(dto.getStatus())
                .onboardingDate(LocalDateTime.now())
                .companyName(dto.getCompanyName())
                .gstNumber(dto.getGstNumber())
                .panNumber(dto.getPanNumber())
                .industryType(dto.getIndustryType())
                .companyAddress(dto.getCompanyAddress())
                .contactPersonName(dto.getContactPersonName())
                .contactPersonPhone(dto.getContactPersonPhone())
                .companyEmail(dto.getCompanyEmail())
                .build();

        Customer saved = customerRepository.save(customer);
        return mapToDTO(saved);
    }


    @Override
    public CustomerResponseDTO getCustomerById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + id));
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
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + id));

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
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + id));
        customerRepository.delete(customer);
    }

    @Override
    public List<ShipmentResponseDTO> getCustomerShipments(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

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
                        .build())
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


    @Override
    public CustomerDashboardDTO getCustomerDashboard(Long customerId) {
        Long totalOrders = deliveryOrderRepository.countByPlacedBy_UserId(customerId);
        Double totalSpent = deliveryOrderRepository.sumTotalCostByPlacedByUserId(customerId);

        return CustomerDashboardDTO.builder()
                .totalOrders(totalOrders)
                .totalSpent(totalSpent != null ? totalSpent : 0.0)
                .build();
    }

    // Registration-related methods
    @Override
    public void registerTempCustomer(CustomerRequestDTO request) {
    	
    	if(customerRepository.existsByEmail(request.getEmail()) || customerRepository.getCustomerByUsername(request.getUsername()) != null) {
			// If email or username already exists, throw an exception
			throw new IllegalArgumentException("Email already registered");
		}
    	
        OtpStore.tempUsers.put(request.getEmail(), request);
        otpService.generateAndSendOtp(request.getEmail());
    }

    @Override
    public void saveCustomerIfOtpVerified(String email) {
        CustomerRequestDTO request = OtpStore.tempUsers.get(email);
        if (request != null) {
            Customer customer = Customer.builder()
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .username(request.getUsername())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .phoneNumber(request.getPhoneNumber())
                    .role(com.cdac.acts.logistics_v1.enums.Role.CUSTOMER)
                    .status(com.cdac.acts.logistics_v1.enums.UserStatus.ACTIVE)
                    .onboardingDate(LocalDateTime.now())
                    .createdAt(LocalDateTime.now())
                    .companyName(request.getCompanyName())
                    .gstNumber(request.getGstNumber())
                    .panNumber(request.getPanNumber())
                    .industryType(request.getIndustryType())
                    .companyAddress(request.getCompanyAddress())
                    .contactPersonName(request.getContactPersonName())
                    .contactPersonPhone(request.getContactPersonPhone())
                    .companyEmail(request.getCompanyEmail())
                    .build();

            customerRepository.save(customer);
            OtpStore.tempUsers.remove(email); // Clear the temporary user after saving
        }
    }

}
