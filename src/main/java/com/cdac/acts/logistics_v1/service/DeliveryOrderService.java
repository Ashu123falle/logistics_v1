package com.cdac.acts.logistics_v1.service;

import com.cdac.acts.logistics_v1.dto.DeliveryOrderDTO;
import com.cdac.acts.logistics_v1.model.DeliveryOrder;
import java.util.List;

public interface DeliveryOrderService {
    DeliveryOrderDTO createOrder(DeliveryOrderDTO order);
    DeliveryOrderDTO getOrderById(Long id);
    List<DeliveryOrderDTO> getAllOrders();
    DeliveryOrderDTO updateOrder(Long id, DeliveryOrderDTO updatedOrder);
    void deleteOrder(Long id);
}
