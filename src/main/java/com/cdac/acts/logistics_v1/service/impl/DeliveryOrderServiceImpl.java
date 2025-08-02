package com.cdac.acts.logistics_v1.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.cdac.acts.logistics_v1.dto.DeliveryOrderRequestDTO;
import com.cdac.acts.logistics_v1.dto.DeliveryOrderResponseDTO;
import com.cdac.acts.logistics_v1.enums.DeliveryStatus;
import com.cdac.acts.logistics_v1.exception.ResourceNotFoundException;
import com.cdac.acts.logistics_v1.model.DeliveryOrder;
import com.cdac.acts.logistics_v1.model.Driver;
import com.cdac.acts.logistics_v1.model.Route;
import com.cdac.acts.logistics_v1.model.Shipment;
import com.cdac.acts.logistics_v1.repository.DeliveryOrderRepository;
import com.cdac.acts.logistics_v1.repository.DriverRepository;
import com.cdac.acts.logistics_v1.repository.RouteRepository;
import com.cdac.acts.logistics_v1.repository.ShipmentRepository;
import com.cdac.acts.logistics_v1.service.DeliveryOrderService;

@Service
public class DeliveryOrderServiceImpl implements DeliveryOrderService {

    @Autowired
    private DeliveryOrderRepository deliveryOrderRepository;

    @Autowired
    private ShipmentRepository shipmentRepository;

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private DriverRepository driverRepository;

    
//      Create Delivery Order
    @Override
    public DeliveryOrderResponseDTO createOrder(DeliveryOrderRequestDTO request) {
        Shipment shipment = shipmentRepository.findById(request.getShipmentId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Shipment not found with id: " + request.getShipmentId()));

        Route route = routeRepository.findById(request.getRouteId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Route not found with id: " + request.getRouteId()));

        Driver driver = driverRepository.findById(request.getDriverId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Driver not found with id: " + request.getDriverId()));

        DeliveryOrder order = DeliveryOrder.builder()
                .shipment(shipment)
                .route(route)
                .assignedDriver(driver)
                .cost(request.getCost())
                .status(DeliveryStatus.valueOf(request.getStatus()))
                .scheduledPickupDate(request.getScheduledPickupDate())
                .notes(request.getNotes())
                .createdAt(LocalDateTime.now())
                .build();

        DeliveryOrder saved = deliveryOrderRepository.save(order);
        return mapToResponse(saved);
    }

    
//    Get Delivery Order by ID
//    to handle exception need to make exceptionhandling global and unchecked 
    @Override
    public DeliveryOrderResponseDTO getOrderById(Long id) {
        DeliveryOrder order = deliveryOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        return mapToResponse(order);
    }

    
//  Get all Delivery Orders with pagination
    @Override
    public List<DeliveryOrderResponseDTO> getAllOrders(int pageNo, int pageSize) {
        return deliveryOrderRepository.findAll(PageRequest.of(pageNo, pageSize))
                .getContent()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    
//  Update Delivery Order
    @Override
    public DeliveryOrderResponseDTO updateOrder(Long id, DeliveryOrderRequestDTO request) {
        DeliveryOrder order = deliveryOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));

        Shipment shipment = shipmentRepository.findById(request.getShipmentId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Shipment not found with id: " + request.getShipmentId()));

        Route route = routeRepository.findById(request.getRouteId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Route not found with id: " + request.getRouteId()));

        Driver driver = driverRepository.findById(request.getDriverId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Driver not found with id: " + request.getDriverId()));

        order.setShipment(shipment);
        order.setRoute(route);
        order.setAssignedDriver(driver);
        order.setCost(request.getCost());
        order.setStatus(DeliveryStatus.valueOf(request.getStatus()));
        order.setScheduledPickupDate(request.getScheduledPickupDate());
        order.setNotes(request.getNotes());

        DeliveryOrder updated = deliveryOrderRepository.save(order);
        return mapToResponse(updated);
    }

    
//    Delete Delivery Order 
//    to handle exception need to make exceptionhandling global and unchecked 
    @Override
    public void deleteOrder(Long id) {
        DeliveryOrder order = deliveryOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        deliveryOrderRepository.delete(order);
    }

    
//     Get Orders by Shipment ID
    @Override
    public List<DeliveryOrderResponseDTO> getOrdersByShipmentId(Long shipmentId) {
        return deliveryOrderRepository.findByShipmentId(shipmentId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    
//  Get Orders by Driver ID
    @Override
    public List<DeliveryOrderResponseDTO> getOrdersByDriverId(Long driverId) {
        return deliveryOrderRepository.findByAssignedDriverId(driverId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

   
//     Map Entity to DTO
    private DeliveryOrderResponseDTO mapToResponse(DeliveryOrder order) {
        return new DeliveryOrderResponseDTO(
                order.getId(),
                order.getShipment().getId(),
                order.getRoute().getId(),
                order.getAssignedDriver().getId(),
                order.getCost(),
                order.getStatus().name(),
                order.getScheduledPickupDate(),
                order.getScheduledDeliveryDate(),
                order.getNotes()
        );
    }
}

