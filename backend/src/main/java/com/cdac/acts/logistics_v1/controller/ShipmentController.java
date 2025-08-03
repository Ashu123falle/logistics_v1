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

import com.cdac.acts.logistics_v1.dto.ShipmentRequestDTO;
import com.cdac.acts.logistics_v1.dto.ShipmentResponseDTO;
import com.cdac.acts.logistics_v1.service.ShipmentService;

@RestController
@RequestMapping("/api/shipments")
@CrossOrigin(origins = "*")
public class ShipmentController {

    @Autowired
    private ShipmentService shipmentService;

    // Create Shipment
    @PostMapping
    public ResponseEntity<ShipmentResponseDTO> createShipment(@RequestBody ShipmentRequestDTO request) {
        ShipmentResponseDTO shipment = shipmentService.createShipment(request);
        return ResponseEntity.ok(shipment);
    }

    // Get Shipment by ID
    @GetMapping("/{id}")
    public ResponseEntity<ShipmentResponseDTO> getShipmentById(@PathVariable Long id) {
        ShipmentResponseDTO shipment = shipmentService.getShipmentById(id);
        return ResponseEntity.ok(shipment);
    }

    // Get All Shipments with Pagination
    @GetMapping
    public ResponseEntity<List<ShipmentResponseDTO>> getAllShipments(
            @RequestParam(defaultValue = "1") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {
        List<ShipmentResponseDTO> shipments = shipmentService.getAllShipments(pageNo - 1, pageSize);
        return ResponseEntity.ok(shipments);
    }

    // Update Shipment
    @PutMapping("/{id}")
    public ResponseEntity<ShipmentResponseDTO> updateShipment(
            @PathVariable Long id,
            @RequestBody ShipmentRequestDTO request) {
        ShipmentResponseDTO updatedShipment = shipmentService.updateShipment(id, request);
        return ResponseEntity.ok(updatedShipment);
    }

    // Delete Shipment
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteShipment(@PathVariable Long id) {
        shipmentService.deleteShipment(id);
        return ResponseEntity.ok("Shipment deleted successfully!");
    }

    // Get Shipments by Type with Pagination
    @GetMapping("/type/{type}")
    public ResponseEntity<List<ShipmentResponseDTO>> getShipmentsByType(
            @PathVariable String type,
            @RequestParam(defaultValue = "1") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {
        List<ShipmentResponseDTO> shipments = shipmentService.getShipmentsByType(type, pageNo - 1, pageSize);
        return ResponseEntity.ok(shipments);
    }
}
