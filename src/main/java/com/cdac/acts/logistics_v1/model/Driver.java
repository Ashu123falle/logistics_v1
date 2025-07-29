package com.cdac.acts.logistics_v1.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Driver extends User {

    @Column(unique = true, nullable = false)
    private String licenseNumber;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle currentVehicle;
}

