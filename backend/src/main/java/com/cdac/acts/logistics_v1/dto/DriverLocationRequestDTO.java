package com.cdac.acts.logistics_v1.dto;
import java.util.*;

import lombok.Builder;
import lombok.Data;
@Data
@Builder
public class DriverLocationRequestDTO {
    private Long driverId;
    private Double latitude;
    private Double longitude;
    // Getters and setters
}
