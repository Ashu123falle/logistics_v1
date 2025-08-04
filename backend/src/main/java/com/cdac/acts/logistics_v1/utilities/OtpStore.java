package com.cdac.acts.logistics_v1.utilities;

import com.cdac.acts.logistics_v1.dto.CustomerRequestDTO;
import com.cdac.acts.logistics_v1.dto.DriverRequestDTO;

import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;

public class OtpStore {
    public static final ConcurrentHashMap<String, String> otpMap = new ConcurrentHashMap<>();
    public static final ConcurrentHashMap<String, LocalDateTime> otpExpiryMap = new ConcurrentHashMap<>();
    public static final ConcurrentHashMap<String, CustomerRequestDTO> tempUsers = new ConcurrentHashMap<>();
    public static final ConcurrentHashMap<String, DriverRequestDTO> tempDriver = new ConcurrentHashMap<>();
}