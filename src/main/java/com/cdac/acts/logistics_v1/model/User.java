package com.cdac.acts.logistics_v1.model;

import java.time.LocalDateTime;

import com.cdac.acts.logistics_v1.enums.Role;
import com.cdac.acts.logistics_v1.enums.UserStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder

@Inheritance(strategy = InheritanceType.JOINED)
public class User {
	@Id
	@Column(name = "user_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;

	private String firstName;
	private String lastName;

	@Column(unique = true, nullable = false)
	private String username;

	@Column(nullable = false)
	private String password;

	@Column(unique = true, nullable = false)
	private String email;

	private String phoneNumber;

	@Enumerated(EnumType.STRING)
	private Role role;

	@Enumerated(EnumType.STRING)
	private UserStatus status;

	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;


}