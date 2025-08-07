package com.cdac.acts.logistics_v1.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.acts.logistics_v1.dto.DeliveryOrderRequestDTO;
import com.cdac.acts.logistics_v1.dto.DeliveryOrderResponseDTO;
import com.cdac.acts.logistics_v1.enums.DeliveryStatus;
import com.cdac.acts.logistics_v1.exception.ResourceNotFoundException;
import com.cdac.acts.logistics_v1.model.Customer;
import com.cdac.acts.logistics_v1.model.DeliveryOrder;
import com.cdac.acts.logistics_v1.model.Driver;
import com.cdac.acts.logistics_v1.model.Route;
import com.cdac.acts.logistics_v1.model.Shipment;
import com.cdac.acts.logistics_v1.repository.DeliveryOrderRepository;
import com.cdac.acts.logistics_v1.repository.DriverRepository;
import com.cdac.acts.logistics_v1.repository.RouteRepository;
import com.cdac.acts.logistics_v1.repository.ShipmentRepository;
import com.cdac.acts.logistics_v1.service.DeliveryOrderService;
import com.cdac.acts.logistics_v1.service.EmailService;
import com.cdac.acts.logistics_v1.utilities.OtpStore;

@Service
@Transactional
public class DeliveryOrderServiceImpl implements DeliveryOrderService {

    private final DeliveryOrderRepository deliveryOrderRepository;
    private final ShipmentRepository shipmentRepository;
    private final RouteRepository routeRepository;
    private final DriverRepository driverRepository;
    
    
    @Autowired
    private EmailService emailService;
    
    @Autowired
    private OtpServiceImpl otpService;

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

    
    private void sendOrderConfirmationEmail(DeliveryOrder order) {
        Customer customer = order.getShipment().getCustomer();
        String to = customer.getCompanyEmail();
        String subject = "Order Confirmation - Order ID: " + order.getId();

        String text = "Dear " + customer.getContactPersonName() + ",\n\n"
            + "Your order has been successfully placed. Please find the details below:\n\n"
            + "Order ID       : " + order.getId() + "\n"
            + "Status         : " + order.getStatus().name() + "\n"
            + "Pickup Date    : " + order.getScheduledPickupDate() + "\n"
            + "Driver Name    : " + order.getAssignedDriver().getFirstName() + " "+order.getAssignedDriver().getLastName()+"\n"
            + "Contact Number : " + order.getAssignedDriver().getPhoneNumber() + "\n"
            + "Vehicle Number : " + order.getAssignedDriver().getCurrentVehicle().getRegistrationNumber() + "\n"
            + "Cost           : ₹" + order.getCost() + "\n\n"
            + "Thank you for choosing MoveBiz.\n\n"
            + "Best regards,\n"
            + "Team MoveBiz";

        emailService.sendSimpleEmail(to, subject, text);
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
                .status(DeliveryStatus.CONFIRMED)
                .scheduledPickupDate(request.getScheduledPickupDate())
                .notes(request.getNotes())
                .createdAt(LocalDateTime.now())
                .build();
        order = deliveryOrderRepository.save(order);
        sendOrderConfirmationEmail(order);
        return mapToResponse(deliveryOrderRepository.save(order));
    }
    
    
    
    @Override
    public DeliveryOrderResponseDTO getOrderById(Long id) {
        DeliveryOrder order = deliveryOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        return mapToResponse(order);
    }
    

    @Override
    public String getOrderByIdTrack(Long id) {
        DeliveryOrder order = deliveryOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        
        DeliveryOrderResponseDTO orderResponse = mapToResponse(order);
        OtpStore.tempEmailTrackOrder.put(order.getPlacedBy().getEmail(), orderResponse);
        otpService.generateAndSendOtp(order.getPlacedBy().getEmail());
        return "Order details have been sent to your email. Please verify using the OTP sent to your email.";
    }
    
    @Override
    public DeliveryOrderResponseDTO optVerifyOrderTrack(String email) {
        
    	DeliveryOrderResponseDTO responseDTO = OtpStore.tempEmailTrackOrder.get(email);
        
        return responseDTO ;
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
        order.setScheduledDeliveryDate(request.getScheduledDeliveredDate());
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

    public DeliveryOrderResponseDTO updateStatus(Long id, String status) {
        DeliveryOrder order = deliveryOrderRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        System.out.println(order);
        order.setStatus(DeliveryStatus.valueOf(status.toUpperCase())); // assumes you use an enum
        deliveryOrderRepository.save(order);

        return mapToResponse(order);
    }

    
    private DeliveryOrderResponseDTO mapToResponse(DeliveryOrder order) {
        return new DeliveryOrderResponseDTO(
                order.getId(),
                order.getShipment().getId(),
                order.getRoute().getId(),
                order.getAssignedDriver().getUserId(),
                order.getPlacedBy().getUserId(),
                order.getCost(),
                order.getStatus().name(),
                order.getScheduledPickupDate(),
                order.getScheduledDeliveryDate(),
                order.getNotes()
                
        );
    }
}
