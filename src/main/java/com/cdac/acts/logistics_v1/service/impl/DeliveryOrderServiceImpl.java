package com.cdac.acts.logistics_v1.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.acts.logistics_v1.dto.DeliveryOrderDTO;
import com.cdac.acts.logistics_v1.model.DeliveryOrder;
import com.cdac.acts.logistics_v1.repository.DeliveryOrderRepository;
import com.cdac.acts.logistics_v1.service.DeliveryOrderService;


@Service
public class DeliveryOrderServiceImpl implements DeliveryOrderService {
	
	
	@Autowired
	private DeliveryOrderRepository deliveryOrderRepository;

	@Override
	public DeliveryOrderDTO createOrder(DeliveryOrderDTO order) {
		DeliveryOrder newOrder = new DeliveryOrder();
		BeanUtils.copyProperties(order, newOrder);
		try {
			deliveryOrderRepository.save(newOrder);
			return order; // Return the original DTO or convert it back to DTO if needed
		} catch (Exception e) {
			// Handle the exception, e.g., log it or rethrow it
			return null;
		}
	}

	@Override
	public DeliveryOrderDTO getOrderById(Long id) {
		
		DeliveryOrder order = deliveryOrderRepository.findById(id).orElse(null);
		if (order != null) {
			DeliveryOrderDTO orderDTO = new DeliveryOrderDTO();
			BeanUtils.copyProperties(order, orderDTO);
			return orderDTO;
		}
		return null; // or throw an exception if not found
		
	}

	@Override
	public List<DeliveryOrderDTO> getAllOrders() {
		List<DeliveryOrder> orders = deliveryOrderRepository.findAll();
		List<DeliveryOrderDTO> orderDTOs = new ArrayList<>();
		for (DeliveryOrder order : orders) {
			DeliveryOrderDTO orderDTO = new DeliveryOrderDTO();
			BeanUtils.copyProperties(order, orderDTO);
			orderDTOs.add(orderDTO);
		}
		return orderDTOs; // Return the list of DTOs
	}

	@Override
	public DeliveryOrderDTO updateOrder(Long id, DeliveryOrderDTO updatedOrder) {
		DeliveryOrder existingOrder = deliveryOrderRepository.findById(id).orElse(null);
		if (existingOrder != null) {
			BeanUtils.copyProperties(updatedOrder, existingOrder, "id"); // Exclude id from copy
			try {
				deliveryOrderRepository.save(existingOrder);
				return updatedOrder; // Return the updated DTO or convert it back to DTO if needed
			} catch (Exception e) {
				// Handle the exception, e.g., log it or rethrow it
				return null;
			}
		}
		return null; // or throw an exception if not found
	}

	@Override
	public void deleteOrder(Long id) {
		if (!deliveryOrderRepository.existsById(id)) {
			// Handle the case where the order does not exist
			// You might want to throw an exception here
			return;
		}
		try {
			deliveryOrderRepository.deleteById(id);
		} catch (Exception e) {
			// Handle the exception, e.g., log it or rethrow it
			// You might want to throw a custom exception here
		}
		
	}

	
}
