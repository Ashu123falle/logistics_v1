package com.cdac.acts.logistics_v1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.acts.logistics_v1.dto.DeliveryOrderRequestDTO;
import com.cdac.acts.logistics_v1.dto.DeliveryOrderResponseDTO;
import com.cdac.acts.logistics_v1.service.DeliveryOrderService;

@RestController
@RequestMapping("/api/delivery-orders")
@CrossOrigin(origins = "*")
public class DeliveryOrderController {

    @Autowired
    private DeliveryOrderService deliveryOrderService;

    // Create Delivery Order
    @PostMapping
    public ResponseEntity<DeliveryOrderResponseDTO> createOrder(@RequestBody DeliveryOrderRequestDTO request) {
        DeliveryOrderResponseDTO order = deliveryOrderService.createOrder(request);
        return ResponseEntity.ok(order);
    }

    // Get Delivery Order by ID
    @GetMapping("/{id}")
    public ResponseEntity<DeliveryOrderResponseDTO> getOrderById(@PathVariable Long id) {
        DeliveryOrderResponseDTO order = deliveryOrderService.getOrderById(id);
        return ResponseEntity.ok(order);
    }

    // Get All Orders (with pagination)
    @GetMapping
    public ResponseEntity<List<DeliveryOrderResponseDTO>> getAllOrders(
            @RequestParam(defaultValue = "1") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {
        List<DeliveryOrderResponseDTO> orders = deliveryOrderService.getAllOrders(pageNo - 1, pageSize);
        return ResponseEntity.ok(orders);
    }

    // Update Delivery Order
    @PutMapping("/{id}")
    public ResponseEntity<DeliveryOrderResponseDTO> updateOrder(
            @PathVariable Long id,
            @RequestBody DeliveryOrderRequestDTO request) {
        DeliveryOrderResponseDTO updatedOrder = deliveryOrderService.updateOrder(id, request);
        return ResponseEntity.ok(updatedOrder);
    }

    // Delete Delivery Order
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long id) {
        deliveryOrderService.deleteOrder(id);
        return ResponseEntity.ok("Delivery Order deleted successfully!");
    }

    // Get Orders by Shipment ID
    @GetMapping("/shipment/{shipmentId}")
    public ResponseEntity<List<DeliveryOrderResponseDTO>> getOrdersByShipmentId(@PathVariable Long shipmentId) {
        List<DeliveryOrderResponseDTO> orders = deliveryOrderService.getOrdersByShipmentId(shipmentId);
        return ResponseEntity.ok(orders);
    }

    // Get Orders by Driver ID
    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<DeliveryOrderResponseDTO>> getOrdersByDriverId(@PathVariable Long driverId) {
        List<DeliveryOrderResponseDTO> orders = deliveryOrderService.getOrdersByDriverId(driverId);
        return ResponseEntity.ok(orders);
    }
}
