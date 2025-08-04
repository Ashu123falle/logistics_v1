package com.cdac.acts.logistics_v1.dto;
import lombok.Data;

@Data
public class OtpVerificationRequest {
    private String email;
    private String otp;
}
