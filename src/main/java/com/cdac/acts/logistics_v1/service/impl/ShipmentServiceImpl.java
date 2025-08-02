package com.cdac.acts.logistics_v1.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.cdac.acts.logistics_v1.dto.ShipmentRequestDTO;
import com.cdac.acts.logistics_v1.dto.ShipmentResponseDTO;
import com.cdac.acts.logistics_v1.model.Customer;
import com.cdac.acts.logistics_v1.model.Shipment;
import com.cdac.acts.logistics_v1.repository.CustomerRepository;
import com.cdac.acts.logistics_v1.repository.ShipmentRepository;
import com.cdac.acts.logistics_v1.service.ShipmentService;

@Service
public class ShipmentServiceImpl implements ShipmentService {

    @Autowired
    private ShipmentRepository shipmentRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public ShipmentResponseDTO createShipment(ShipmentRequestDTO request) {
        Shipment shipment = mapToEntity(request);
        Shipment saved = shipmentRepository.save(shipment);
        return mapToDTO(saved);
    }

    @Override
    public ShipmentResponseDTO getShipmentById(Long id) {
        Shipment shipment = shipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shipment not found"));
        return mapToDTO(shipment);
    }

    @Override
    public List<ShipmentResponseDTO> getAllShipments(int pageNo, int pageSize) {
        return shipmentRepository.findAll(PageRequest.of(pageNo, pageSize))
                .getContent()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ShipmentResponseDTO updateShipment(Long id, ShipmentRequestDTO request) {
        Shipment shipment = shipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shipment not found"));

        shipment.setType(request.getType());
        shipment.setName(request.getName());
        shipment.setDescription(request.getDescription());
        shipment.setValue(request.getValue());
        shipment.setDimensions(request.getDimensions());
        shipment.setWeight(request.getWeight());
        shipment.setImages(request.getImages());

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        shipment.setCustomer(customer);

        Shipment updated = shipmentRepository.save(shipment);
        return mapToDTO(updated);
    }

    @Override
    public void deleteShipment(Long id) {
        shipmentRepository.deleteById(id);
    }

    @Override
    public List<ShipmentResponseDTO> getShipmentsByType(String type, int pageNo, int pageSize) {
        return shipmentRepository.findByType(type, PageRequest.of(pageNo, pageSize))
                .getContent()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Utility methods
    private Shipment mapToEntity(ShipmentRequestDTO dto) {
        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return Shipment.builder()
                .type(dto.getType())
                .name(dto.getName())
                .description(dto.getDescription())
                .value(dto.getValue())
                .dimensions(dto.getDimensions())
                .weight(dto.getWeight())
                .images(dto.getImages())
                .customer(customer)
                .build();
    }

    private ShipmentResponseDTO mapToDTO(Shipment shipment) {
        return ShipmentResponseDTO.builder()
                .id(shipment.getId())
                .type(shipment.getType())
                .name(shipment.getName())
                .description(shipment.getDescription())
                .value(shipment.getValue())
                .dimensions(shipment.getDimensions())
                .weight(shipment.getWeight())
                .customerId(shipment.getCustomer().getId())
                .build();
    }
}
