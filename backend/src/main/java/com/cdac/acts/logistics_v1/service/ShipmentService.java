package com.cdac.acts.logistics_v1.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.cdac.acts.logistics_v1.dto.ImageResponseDTO;
import com.cdac.acts.logistics_v1.dto.ShipmentRequestDTO;
import com.cdac.acts.logistics_v1.dto.ShipmentResponseDTO;

public interface ShipmentService {
    ShipmentResponseDTO createShipment(ShipmentRequestDTO request);
    ShipmentResponseDTO getShipmentById(Long id);
    List<ShipmentResponseDTO> getAllShipments(int pageNo, int pageSize); 
    ShipmentResponseDTO updateShipment(Long id, ShipmentRequestDTO request);
    boolean deleteShipment(Long id);

//    Updated with pagination 
    List<ShipmentResponseDTO> getShipmentsByType(String type, int pageNo, int pageSize);
    
    //driver options
    ImageResponseDTO uploadImages(Long shipmentId,List<MultipartFile> images);
}

