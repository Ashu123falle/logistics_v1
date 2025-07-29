package com.cdac.acts.logistics_v1.service;

import com.cdac.acts.logistics_v1.model.TrackingEvent;
import java.util.List;

public interface TrackingEventService {
    TrackingEvent addEvent(TrackingEvent event);
    TrackingEvent getEventById(Long id);
    List<TrackingEvent> getAllEvents();
    List<TrackingEvent> getEventsByShipmentId(Long shipmentId);
}
