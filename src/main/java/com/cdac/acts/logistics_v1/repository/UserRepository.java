package com.cdac.acts.logistics_v1.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.acts.logistics_v1.model.User;

public interface UserRepository extends JpaRepository<User, Long>{

	 Optional<User> findByEmail(String email);
}
