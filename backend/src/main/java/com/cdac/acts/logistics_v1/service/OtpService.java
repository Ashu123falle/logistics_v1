package com.cdac.acts.logistics_v1.service;


public interface OtpService {
    void generateAndSendOtp(String email);
    boolean verifyOtp(String email, String otp);
}
