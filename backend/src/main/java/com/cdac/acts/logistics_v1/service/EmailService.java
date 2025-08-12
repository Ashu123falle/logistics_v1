package com.cdac.acts.logistics_v1.service;

public interface EmailService {

    // Send a simple text email
    void sendSimpleEmail(String toEmail, String subject, String body);
}
