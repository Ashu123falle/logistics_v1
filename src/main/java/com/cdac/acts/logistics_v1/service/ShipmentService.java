package com.cdac.acts.logistics_v1.service;

import com.cdac.acts.logistics_v1.model.Shipment;
import java.util.List;

public interface ShipmentService {
    Shipment createShipment(Shipment shipment);
    Shipment getShipmentById(Long id);
    List<Shipment> getAllShipments();
    Shipment updateShipment(Long id, Shipment updatedShipment);
    void deleteShipment(Long id);
}
