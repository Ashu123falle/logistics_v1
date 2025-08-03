package com.cdac.acts.logistics_v1.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.acts.logistics_v1.model.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

}
