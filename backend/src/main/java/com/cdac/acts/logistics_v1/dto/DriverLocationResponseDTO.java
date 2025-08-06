package com.cdac.acts.logistics_v1.dto;
import java.time.LocalDateTime;
import java.util.*;

import lombok.Builder;
import lombok.Data;
@Data
@Builder
public class DriverLocationResponseDTO {
    private Long id;
    private Long driverId;
    private Double latitude;
    private Double longitude;
    private LocalDateTime timestamp;
    // Getters and setters
}
