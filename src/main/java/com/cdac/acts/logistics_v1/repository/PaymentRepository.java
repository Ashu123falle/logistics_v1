package com.cdac.acts.logistics_v1.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.acts.logistics_v1.model.Customer;
import com.cdac.acts.logistics_v1.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long>{

	 // Find payment by Razorpay order ID (for post-payment verification)
    Payment findByRazorpayOrderId(String razorpayOrderId);

    // Optionally: If needed for validation/checks
    boolean existsByRazorpayPaymentId(String razorpayPaymentId);

    // For listing payments for a particular customer
//    List<Payment> findByPaidBy_Id(Long customerId);

    // For listing payments for a particular delivery order
    List<Payment> findByDeliveryOrderId(Long deliveryOrderId);
}
