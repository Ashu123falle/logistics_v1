package com.cdac.acts.logistics_v1.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.acts.logistics_v1.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	String findByUsernameAndPassword(String username, String password);
	
}
