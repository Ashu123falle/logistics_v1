package com.cdac.acts.logistics_v1.controller;

import com.cdac.acts.logistics_v1.dto.ShipmentRequestDTO;
import com.cdac.acts.logistics_v1.dto.ShipmentResponseDTO;
import com.cdac.acts.logistics_v1.service.ShipmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shipments")
@CrossOrigin(origins = "*")
public class ShipmentController {

    @Autowired
    private ShipmentService shipmentService;

    // ✅ Create Shipment
    @PostMapping
    public ResponseEntity<ShipmentResponseDTO> createShipment(@RequestBody ShipmentRequestDTO request) {
        ShipmentResponseDTO shipment = shipmentService.createShipment(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(shipment);
    }

    // ✅ Get Shipment by ID
    @GetMapping("/{id}")
    public ResponseEntity<ShipmentResponseDTO> getShipmentById(@PathVariable Long id) {
        ShipmentResponseDTO shipment = shipmentService.getShipmentById(id);
        if (shipment != null) {
            return ResponseEntity.ok(shipment);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // ✅ Get All Shipments with Pagination
    @GetMapping
    public ResponseEntity<List<ShipmentResponseDTO>> getAllShipments(
            @RequestParam(defaultValue = "1") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {
        List<ShipmentResponseDTO> shipments = shipmentService.getAllShipments(pageNo - 1, pageSize);
        return ResponseEntity.ok(shipments);
    }

    // ✅ Update Shipment
    @PutMapping("/{id}")
    public ResponseEntity<ShipmentResponseDTO> updateShipment(
            @PathVariable Long id,
            @RequestBody ShipmentRequestDTO request) {
        ShipmentResponseDTO updatedShipment = shipmentService.updateShipment(id, request);
        if (updatedShipment != null) {
            return ResponseEntity.ok(updatedShipment);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // ✅ Delete Shipment
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShipment(@PathVariable Long id) {
        boolean deleted = shipmentService.deleteShipment(id);
        if (deleted) {
            return ResponseEntity.noContent().build(); // 204 No Content
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // ✅ Get Shipments by Type with Pagination
    @GetMapping("/type/{type}")
    public ResponseEntity<List<ShipmentResponseDTO>> getShipmentsByType(
            @PathVariable String type,
            @RequestParam(defaultValue = "1") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {
        List<ShipmentResponseDTO> shipments = shipmentService.getShipmentsByType(type, pageNo - 1, pageSize);
        return ResponseEntity.ok(shipments);
    }
}
