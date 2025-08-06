package com.cdac.acts.logistics_v1.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.acts.logistics_v1.dto.PaymentRequestDTO;
import com.cdac.acts.logistics_v1.dto.PaymentResponseDTO;
import com.cdac.acts.logistics_v1.service.PaymentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor

public class PaymentController {

    private final PaymentService paymentService;

    @PreAuthorize("hasRole('CUSTOMER')")
    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> create(@RequestBody PaymentRequestDTO dto) {
        return ResponseEntity.ok(paymentService.createPayment(dto));
    }

    @PreAuthorize("hasRole('CUSTOMER')")
    @PostMapping("/verify")
    public ResponseEntity<String> verify(@RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(paymentService.verifyTransaction(payload));
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
    @GetMapping("/{id}")
    public ResponseEntity<PaymentResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.getPaymentById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<PaymentResponseDTO>> getAll() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @PreAuthorize("hasRole('CUSTOMER')")
    @PutMapping("/{id}")
    public ResponseEntity<PaymentResponseDTO> update(@PathVariable Long id, @RequestBody PaymentRequestDTO dto) {
        return ResponseEntity.ok(paymentService.updatePayment(id, dto));
    }

    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();

    }
    
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<PaymentResponseDTO>> getPaymentsByCustomer(@PathVariable Long customerId) {
        List<PaymentResponseDTO> payments = paymentService.getPaymentByCustomerId(customerId);
        return ResponseEntity.ok(payments);

    }
    
}
