package com.cdac.acts.logistics_v1.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.acts.logistics_v1.enums.Role;
import com.cdac.acts.logistics_v1.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
	List<User> findByRole(Role role);
	Optional<User> findByUsernameAndPassword(String username, String password);
	 Optional<User> findByEmail(String email);
	 Optional<User> findByUsername(String username);
}
