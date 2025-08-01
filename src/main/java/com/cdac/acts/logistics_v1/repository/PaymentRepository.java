package com.cdac.acts.logistics_v1.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.acts.logistics_v1.model.Payment;

public interface InvoiceRepository extends JpaRepository<Payment, Long>{

}
