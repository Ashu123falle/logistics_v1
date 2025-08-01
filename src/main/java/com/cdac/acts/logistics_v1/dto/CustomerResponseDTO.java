package com.cdac.acts.logistics_v1.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class CustomerResponseDTO extends UserResponseDTO {
    private String companyName;
    private String gstNumber;
    private String panNumber;
    private String industryType;
    private String companyAddress;

    private String contactPersonName;
    private String contactPersonPhone;
    private String companyEmail;
}
