package com.cdac.acts.logistics_v1.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class CustomerRequestDTO extends UserRequestDTO {
    private String companyName;
    private String gstNumber;
    private String panNumber;
    private String industryType;
    private String companyAddress;

    private String contactPersonName;
    private String contactPersonPhone;
    private String companyEmail;
}
