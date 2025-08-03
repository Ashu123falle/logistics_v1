package com.cdac.acts.logistics_v1.controller;

import com.cdac.acts.logistics_v1.dto.DeliveryOrderRequestDTO;
import com.cdac.acts.logistics_v1.dto.DeliveryOrderResponseDTO;
import com.cdac.acts.logistics_v1.service.DeliveryOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/delivery-orders")
@CrossOrigin("*")
@RequiredArgsConstructor
public class DeliveryOrderController {

    private final DeliveryOrderService deliveryOrderService;

    /**
     * Create Delivery Order
     */
    @PostMapping
    public ResponseEntity<DeliveryOrderResponseDTO> createOrder(@RequestBody DeliveryOrderRequestDTO request) {
        DeliveryOrderResponseDTO order = deliveryOrderService.createOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(order); // ✅ 201 Created
    }

    /**
     * Get Delivery Order by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<DeliveryOrderResponseDTO> getOrderById(@PathVariable Long id) {
        DeliveryOrderResponseDTO order = deliveryOrderService.getOrderById(id);
        return ResponseEntity.ok(order); // ✅ 200 OK
    }

    /**
     * Get All Orders (with pagination)
     */
    @GetMapping
    public ResponseEntity<List<DeliveryOrderResponseDTO>> getAllOrders(
            @RequestParam(defaultValue = "1") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {

        List<DeliveryOrderResponseDTO> orders = deliveryOrderService.getAllOrders(Math.max(pageNo - 1, 0), pageSize);
        return ResponseEntity.ok(orders);
    }

    /**
     * Update Delivery Order
     */
    @PutMapping("/{id}")
    public ResponseEntity<DeliveryOrderResponseDTO> updateOrder(
            @PathVariable Long id,
            @RequestBody DeliveryOrderRequestDTO request) {

        DeliveryOrderResponseDTO updatedOrder = deliveryOrderService.updateOrder(id, request);
        return ResponseEntity.ok(updatedOrder); // ✅ 200 OK
    }

    /**
     * Delete Delivery Order
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        deliveryOrderService.deleteOrder(id);
        return ResponseEntity.noContent().build(); // ✅ 204 No Content
    }

    /**
     * Get Orders by Shipment ID
     */
    @GetMapping("/shipment/{shipmentId}")
    public ResponseEntity<List<DeliveryOrderResponseDTO>> getOrdersByShipmentId(@PathVariable Long shipmentId) {
        List<DeliveryOrderResponseDTO> orders = deliveryOrderService.getOrdersByShipmentId(shipmentId);
        return ResponseEntity.ok(orders);
    }

    /**
     * Get Orders by Driver ID
     */
    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<DeliveryOrderResponseDTO>> getOrdersByDriverId(@PathVariable Long driverId) {
        List<DeliveryOrderResponseDTO> orders = deliveryOrderService.getOrdersByDriverId(driverId);
        return ResponseEntity.ok(orders);
    }
}
