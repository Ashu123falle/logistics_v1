package com.cdac.acts.logistics_v1.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
//@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@PrimaryKeyJoinColumn(name = "user_id")
public class Driver extends User {

    @Column(unique = true, nullable = false)
    private String licenseNumber;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    @JsonBackReference
    private Vehicle currentVehicle;
    @Override
    public String toString() {
        return "Driver{" +
                "id=" + getUserId() +
                ", licenseNumber='" + licenseNumber + '\'' +
                // Avoid calling currentVehicle.toString()
                ", currentVehicleId=" + (currentVehicle != null ? currentVehicle.getId() : null) +
                '}';
    }
}

