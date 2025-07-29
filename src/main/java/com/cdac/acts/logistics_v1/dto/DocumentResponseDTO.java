package com.cdac.acts.logistics_v1.dto;
import java.util.*;

import lombok.Data;
@Data
public class DocumentResponseDTO {
    private Long id;
    private String name;
    private String type;
    private String url;
    private String uploadedAt;
    // Getters and setters
}
