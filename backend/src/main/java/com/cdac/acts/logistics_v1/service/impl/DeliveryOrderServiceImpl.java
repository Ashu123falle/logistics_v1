package com.cdac.acts.logistics_v1.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
@Transactional

public class DeliveryOrderServiceImpl implements DeliveryOrderService {

    private final DeliveryOrderRepository deliveryOrderRepository;
    private final ShipmentRepository shipmentRepository;
    private final RouteRepository routeRepository;
    private final DriverRepository driverRepository;

    public DeliveryOrderServiceImpl(
            DeliveryOrderRepository deliveryOrderRepository,
            ShipmentRepository shipmentRepository,
            RouteRepository routeRepository,
            DriverRepository driverRepository
    ) {
        this.deliveryOrderRepository = deliveryOrderRepository;
        this.shipmentRepository = shipmentRepository;
        this.routeRepository = routeRepository;
        this.driverRepository = driverRepository;
    }

    @Override
    public DeliveryOrderResponseDTO createOrder(DeliveryOrderRequestDTO request) {
        Shipment shipment = shipmentRepository.findById(request.getShipmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Shipment not found with id: " + request.getShipmentId()));

        Route route = routeRepository.findById(request.getRouteId())
                .orElseThrow(() -> new ResourceNotFoundException("Route not found with id: " + request.getRouteId()));

        Driver driver = driverRepository.findById(request.getDriverId())
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found with id: " + request.getDriverId()));

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

        return mapToResponse(deliveryOrderRepository.save(order));
    }

    @Override
    public DeliveryOrderResponseDTO getOrderById(Long id) {
        DeliveryOrder order = deliveryOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        return mapToResponse(order);
    }

    @Override
    public List<DeliveryOrderResponseDTO> getAllOrders(int pageNo, int pageSize) {
        return deliveryOrderRepository.findAll(PageRequest.of(pageNo, pageSize)).getContent()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public DeliveryOrderResponseDTO updateOrder(Long id, DeliveryOrderRequestDTO request) {
        DeliveryOrder order = deliveryOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));

        Shipment shipment = shipmentRepository.findById(request.getShipmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Shipment not found with id: " + request.getShipmentId()));

        Route route = routeRepository.findById(request.getRouteId())
                .orElseThrow(() -> new ResourceNotFoundException("Route not found with id: " + request.getRouteId()));

        Driver driver = driverRepository.findById(request.getDriverId())
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found with id: " + request.getDriverId()));

        order.setShipment(shipment);
        order.setRoute(route);
        order.setAssignedDriver(driver);
        order.setCost(request.getCost());
        order.setStatus(DeliveryStatus.valueOf(request.getStatus()));
        order.setScheduledPickupDate(request.getScheduledPickupDate());
        order.setNotes(request.getNotes());

        return mapToResponse(deliveryOrderRepository.save(order));
    }

    @Override
    public void deleteOrder(Long id) {
        DeliveryOrder order = deliveryOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        deliveryOrderRepository.delete(order);
    }

    @Override
    public List<DeliveryOrderResponseDTO> getOrdersByShipmentId(Long shipmentId) {
        return deliveryOrderRepository.findByShipmentId(shipmentId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<DeliveryOrderResponseDTO> getOrdersByDriverId(Long driverId) {
        return deliveryOrderRepository.findByAssignedDriverUserId(driverId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private DeliveryOrderResponseDTO mapToResponse(DeliveryOrder order) {
        return new DeliveryOrderResponseDTO(
                order.getId(),
                order.getShipment().getId(),
                order.getRoute().getId(),
                order.getAssignedDriver().getUserId(),
                order.getCost(),
                order.getStatus().name(),
                order.getScheduledPickupDate(),
                order.getScheduledDeliveryDate(),
                order.getNotes()
        );
    }
}
