package com.cdac.acts.logistics_v1.service.impl;


import com.cdac.acts.logistics_v1.service.EmailService;
import com.cdac.acts.logistics_v1.service.OtpService;
import com.cdac.acts.logistics_v1.utilities.OtpStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class OtpServiceImpl implements OtpService {

    @Autowired
    private EmailService emailService;

    @Override
    public void generateAndSendOtp(String email) {
        String otp = String.format("%06d", new Random().nextInt(999999));
        OtpStore.otpMap.put(email, otp);
        OtpStore.otpExpiryMap.put(email, LocalDateTime.now().plusMinutes(5));
        emailService.sendSimpleEmail(email, "Your OTP is ", "Your OTP is: " + otp);
    }

    @Override
    public boolean verifyOtp(String email, String otp) {
        String storedOtp = OtpStore.otpMap.get(email);
        LocalDateTime expiry = OtpStore.otpExpiryMap.get(email);
        return storedOtp != null && storedOtp.equals(otp) && expiry != null && expiry.isAfter(LocalDateTime.now());
    }
}