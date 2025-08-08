package com.cdac.acts.logistics_v1.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class AppConfig {
	
    // Bean for RestTemplate to make HTTP requests
    @Bean
    RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
