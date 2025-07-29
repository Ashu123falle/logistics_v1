package com.cdac.acts.logistics_v1.dto;
import java.util.*;

import lombok.Data;
@Data
public class NotificationResponseDTO {
    private Long id;
    private Long userId;
    private String message;
    private String type;
    private String sentAt;
    // Getters and setters
}
