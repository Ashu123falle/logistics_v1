package com.cdac.acts.logistics_v1.service;

import com.cdac.acts.logistics_v1.model.DeliveryOrder;
import java.util.List;

public interface DeliveryOrderService {
    DeliveryOrder createOrder(DeliveryOrder order);
    DeliveryOrder getOrderById(Long id);
    List<DeliveryOrder> getAllOrders();
    DeliveryOrder updateOrder(Long id, DeliveryOrder updatedOrder);
    void deleteOrder(Long id);
}
