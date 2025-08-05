package com.cdac.acts.logistics_v1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cdac.acts.logistics_v1.dto.ImageResponseDTO;
import com.cdac.acts.logistics_v1.dto.ShipmentRequestDTO;
import com.cdac.acts.logistics_v1.dto.ShipmentResponseDTO;
import com.cdac.acts.logistics_v1.model.Shipment;
import com.cdac.acts.logistics_v1.service.ImageUploadService;
import com.cdac.acts.logistics_v1.service.ShipmentService;

@RestController
@RequestMapping("/api/shipments")
public class ShipmentController {

    @Autowired
    private ShipmentService shipmentService;

    @Autowired
    private ImageUploadService imageUploadService;

    @PreAuthorize("hasRole('CUSTOMER')")
    @PostMapping
    public ResponseEntity<ShipmentResponseDTO> createShipment(@RequestBody ShipmentRequestDTO request) {
        ShipmentResponseDTO shipment = shipmentService.createShipment(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(shipment);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER', 'DRIVER')")
    @GetMapping("/{id}")
    public ResponseEntity<ShipmentResponseDTO> getShipmentById(@PathVariable Long id) {
        ShipmentResponseDTO shipment = shipmentService.getShipmentById(id);
        return shipment != null ? ResponseEntity.ok(shipment) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<ShipmentResponseDTO>> getAllShipments(
            @RequestParam(defaultValue = "1") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {
        List<ShipmentResponseDTO> shipments = shipmentService.getAllShipments(pageNo - 1, pageSize);
        return ResponseEntity.ok(shipments);
    }

    @PreAuthorize("hasRole('CUSTOMER')")
    @PutMapping("/{id}")
    public ResponseEntity<ShipmentResponseDTO> updateShipment(
            @PathVariable Long id,
            @RequestBody ShipmentRequestDTO request) {
        ShipmentResponseDTO updatedShipment = shipmentService.updateShipment(id, request);
        return updatedShipment != null ? ResponseEntity.ok(updatedShipment) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShipment(@PathVariable Long id) {
        boolean deleted = shipmentService.deleteShipment(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER', 'DRIVER')")
    @GetMapping("/type/{type}")
    public ResponseEntity<List<ShipmentResponseDTO>> getShipmentsByType(
            @PathVariable String type,
            @RequestParam(defaultValue = "1") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {
        List<ShipmentResponseDTO> shipments = shipmentService.getShipmentsByType(type, pageNo - 1, pageSize);
        return ResponseEntity.ok(shipments);
    }

    @PreAuthorize("hasRole('DRIVER')")
//    @PostMapping("/upload-images")
    @PostMapping(value = "/upload-images", consumes = "multipart/form-data")
    public ResponseEntity<ImageResponseDTO> upload( @RequestPart("images") List<MultipartFile> images, @RequestParam Long shipmentId) {
    	ImageResponseDTO imageUrl = shipmentService.uploadImages(shipmentId, images);
        return ResponseEntity.ok(imageUrl);
    }
}
