package com.cdac.acts.logistics_v1.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.acts.logistics_v1.dto.DeliveryOrderRequestDTO;
import com.cdac.acts.logistics_v1.dto.DeliveryOrderResponseDTO;
import com.cdac.acts.logistics_v1.dto.InvoiceResponseDTO;
import com.cdac.acts.logistics_v1.enums.DeliveryStatus;
import com.cdac.acts.logistics_v1.exception.ResourceNotFoundException;
import com.cdac.acts.logistics_v1.model.Customer;
import com.cdac.acts.logistics_v1.model.DeliveryOrder;
import com.cdac.acts.logistics_v1.model.Driver;
import com.cdac.acts.logistics_v1.model.Payment;
import com.cdac.acts.logistics_v1.model.Route;
import com.cdac.acts.logistics_v1.model.Shipment;
import com.cdac.acts.logistics_v1.repository.CustomerRepository;
import com.cdac.acts.logistics_v1.repository.DeliveryOrderRepository;
import com.cdac.acts.logistics_v1.repository.DriverRepository;
import com.cdac.acts.logistics_v1.repository.PaymentRepository;
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
    private final PaymentRepository paymentRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    private EmailService emailService;
    
    @Autowired
    private OtpServiceImpl otpService;

    public DeliveryOrderServiceImpl(
            DeliveryOrderRepository deliveryOrderRepository,
            ShipmentRepository shipmentRepository,
            RouteRepository routeRepository,
            DriverRepository driverRepository,
            PaymentRepository paymentRepository,
            CustomerRepository customerRepository
    ) {
        this.deliveryOrderRepository = deliveryOrderRepository;
        this.shipmentRepository = shipmentRepository;
        this.routeRepository = routeRepository;
        this.driverRepository = driverRepository;
        this.paymentRepository = paymentRepository;
        this.customerRepository = customerRepository;
    }

 private void sendOrderConfirmationEmail(DeliveryOrder order) {
    Customer customer = order.getShipment().getCustomer();
    String to = customer.getCompanyEmail();
    String subject = "Your MoveBiz Order Confirmation - Order #" + order.getId() + "\n\n";

    String driverDetails;
    if (order.getAssignedDriver() != null) {
        driverDetails =
            "Driver Name    : " + order.getAssignedDriver().getFirstName() + " " + order.getAssignedDriver().getLastName() + "\n" +
            "Contact Number : " + order.getAssignedDriver().getPhoneNumber() + "\n" +
            "Vehicle Number : " + order.getAssignedDriver().getCurrentVehicle().getRegistrationNumber() + "\n";
    } else {
        driverDetails = "Driver Details : A driver will be assigned to your order shortly, and you will receive their details once confirmed.\n";
    }

    String text =
        "Dear " + customer.getContactPersonName() + ",\n\n" +
        "We’re happy to let you know that your order has been successfully placed with MoveBiz.\n" +
        "Here are the details of your order:\n\n" +
        "------------------------------------------------------------\n" +
        "Order ID       : " + order.getId() + "\n" +
        "Status         : " + order.getStatus().name() + "\n" +
        "Pickup Date    : " + order.getScheduledPickupDate() + "\n" +
        driverDetails +
        "Cost           : ₹" + order.getCost() + "\n" +
        "------------------------------------------------------------\n\n" +
        "You can track the status of your order anytime by logging into your MoveBiz account.\n\n" +
        "Thank you for choosing MoveBiz for your logistics needs.\n" +
        "We look forward to serving you again!\n\n" +
        "Best regards,\n" +
        "Team MoveBiz\n" +
        "support@movebiz.com | +91-XXXXXXXXXX";

    emailService.sendSimpleEmail(to, subject, text);
}


    @Override
    public DeliveryOrderResponseDTO createOrder(DeliveryOrderRequestDTO request) {

        // Fetch shipment
        Shipment shipment = shipmentRepository.findById(request.getShipmentId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Shipment not found with id: " + request.getShipmentId()
                ));

        // Fetch route
        Route route = routeRepository.findById(request.getRouteId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Route not found with id: " + request.getRouteId()
                ));

        DeliveryOrder order = DeliveryOrder.builder()
                .shipment(shipment)
                .route(route)
                .placedBy(shipment.getCustomer()) 
                .cost(request.getCost())
                .status(request.getStatus())
                .scheduledPickupDate(request.getScheduledPickupDate())
                .scheduledDeliveryDate(request.getScheduledDeliveredDate())
                .notes(request.getNotes())
                .createdAt(LocalDateTime.now())
                .build();

        if (request.getPaymentId() != null) {
              Optional<Payment> pay =  paymentRepository.findById(request.getPaymentId());
              if (pay.isPresent()) {
                  order.setPayment(pay.get());
              } 
        }

        order = deliveryOrderRepository.save(order);

        if (order.getPayment() != null) {
            order.getPayment().setDeliveryOrder(order);
            paymentRepository.save(order.getPayment());
        }

        sendOrderConfirmationEmail(order);

        return mapToResponse(order);
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
        order.setStatus(DeliveryStatus.valueOf(status.toUpperCase()));
        deliveryOrderRepository.save(order);
        return mapToResponse(order);
    }


    private DeliveryOrderResponseDTO mapToResponse(DeliveryOrder order) {
        return new DeliveryOrderResponseDTO(
                order.getId(),
                order.getShipment().getId(),
                order.getRoute().getId(),
                order.getAssignedDriver() != null ? order.getAssignedDriver().getUserId() : 001,
                order.getPlacedBy().getUserId(),
                order.getPayment() != null ? order.getPayment().getId() : null,
                order.getCost(),
                order.getStatus().name(),
                order.getScheduledPickupDate(),
                order.getScheduledDeliveryDate(),
                order.getNotes()
        );
    }
    public List<InvoiceResponseDTO> getInvoicesByCustomerId(Long customerId) {
        // Get all delivery orders for this customer
        List<DeliveryOrder> orders = deliveryOrderRepository.findByPlacedBy_UserId(customerId);

        // Fetch customer once
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        List<InvoiceResponseDTO> invoices = new ArrayList<>();
      
            List<Shipment>shipments = shipmentRepository.findByCustomer_UserId(customerId);

            for (DeliveryOrder order : orders) {
                // Fetch shipments related to this delivery order
                
                // Fetch route by route id from order
                Route route = null;
                if (order.getRoute() != null) {
                    route = routeRepository.findById(order.getRoute().getId())
                        .orElse(null);
                }

                InvoiceResponseDTO invoice = InvoiceResponseDTO.builder()
                    .deliveryOrderId(order.getId())
                    .cost(order.getCost())
                    .status(order.getStatus())
                    .scheduledPickupDate(order.getScheduledPickupDate())
                    .scheduledDeliveryDate(order.getScheduledDeliveryDate())
                    .notes(order.getNotes())
                    .shipment(shipments)
                    .route(route)
                    .customer(customer)
                    .build();

                invoices.add(invoice);
            }

            return invoices;
        }

	

	
        
       

}
