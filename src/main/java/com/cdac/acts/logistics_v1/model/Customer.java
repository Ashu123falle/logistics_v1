package com.cdac.acts.logistics_v1.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@PrimaryKeyJoinColumn(name = "user_id")
public class Customer extends User {

    private String companyName;
    private String gstNumber;
    private String panNumber;
    private String industryType;
    private String companyAddress;
    private String companyWebsite;

    private String contactPersonName;
    private String contactPersonPhone;
    private String companyEmail;

    private LocalDateTime onboardingDate;
    private String kycStatus;
}
