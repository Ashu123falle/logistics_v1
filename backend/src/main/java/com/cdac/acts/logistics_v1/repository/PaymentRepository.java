package com.cdac.acts.logistics_v1.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.acts.logistics_v1.model.Customer;
import com.cdac.acts.logistics_v1.model.Payment;
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long>{

    Payment findByRazorpayOrderId(String razorpayOrderId);

    boolean existsByRazorpayPaymentId(String razorpayPaymentId);

    List<Payment> findByDeliveryOrderId(Long deliveryOrderId);

    List<Payment> findByPaidByUserId(Long customerId);

}
