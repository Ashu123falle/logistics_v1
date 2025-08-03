package com.cdac.acts.logistics_v1.dto;
import java.util.*;

import lombok.Data;
@Data
public class NotificationRequestDTO {
    private Long userId;
    private String message;
    private String type;
    // Getters and setters
}
