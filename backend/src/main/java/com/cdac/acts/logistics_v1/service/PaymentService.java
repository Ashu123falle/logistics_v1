package com.cdac.acts.logistics_v1.service;

import java.util.List;
import java.util.Map;

import com.cdac.acts.logistics_v1.dto.PaymentRequestDTO;
import com.cdac.acts.logistics_v1.dto.PaymentResponseDTO;

public interface PaymentService {
	
	Map<String, Object> createPayment(PaymentRequestDTO request);
	String verifyTransaction(Map<String, String> payload);

	PaymentResponseDTO getPaymentById(Long id);
	List<PaymentResponseDTO> getPaymentByCustomerId(Long id);
    List<PaymentResponseDTO> getAllPayments();
    
    PaymentResponseDTO updatePayment(Long id, PaymentRequestDTO request);
    void deletePayment(Long id);

    
}

