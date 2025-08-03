package com.cdac.acts.logistics_v1.service;

import java.util.List;

import com.cdac.acts.logistics_v1.dto.PaymentRequestDTO;
import com.cdac.acts.logistics_v1.dto.PaymentResponseDTO;

public interface PaymentService {
    PaymentResponseDTO createPayment(PaymentRequestDTO request);
    PaymentResponseDTO getPaymentById(Long id);
    List<PaymentResponseDTO> getAllPayments();
    PaymentResponseDTO updatePayment(Long id, PaymentRequestDTO request);
    void deletePayment(Long id);

    // Extra
    PaymentResponseDTO verifyTransaction(String razorpayPaymentId);
}

