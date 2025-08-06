package com.cdac.acts.logistics_v1.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.acts.logistics_v1.enums.UserStatus;
import com.cdac.acts.logistics_v1.model.Driver;
@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {
    Optional<Driver> findById(Long id);
    List<Driver> findByCurrentVehicle_Id(Long vehicleId);
    Long countByStatus(UserStatus status);

}
