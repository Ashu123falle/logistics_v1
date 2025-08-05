package com.cdac.acts.logistics_v1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.acts.logistics_v1.model.Route;
@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {

}
