package com.cdac.acts.logistics_v1.dto;
import java.util.*;

import lombok.Data;
@Data
public class DriverLocationResponseDTO {
    private Long id;
    private Long driverId;
    private Double latitude;
    private Double longitude;
    private String timestamp;
    // Getters and setters
}
