package com.cdac.acts.logistics_v1.dto;

import lombok.Data;
@Data
public class DocumentRequestDTO {
    private String name;
    private String type;
    private byte[] content;
    private Long userId;
    // Getters and setters
}
