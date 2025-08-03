package com.cdac.acts.logistics_v1.configurations;

import com.razorpay.RazorpayClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RazorpayConfig {
	
	private final String API_KEY="rzp_test_7z2P1qZlHZslPe";
	private final String SECRET_KEY="RxUAz4gozqB4a1Gxk3bdhyex";
	
    @Bean
    RazorpayClient razorpayClient() throws Exception {
        return new RazorpayClient(API_KEY,SECRET_KEY);
    }
}
