package com.cdac.acts.logistics_v1.dto;


import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {

	private Long id;

    private String name;
    private String email;
    private String phone;
    private String passwordHash;
    
    @Enumerated(EnumType.STRING)
    private Role role;

    private String address;

    public enum Role {
        ADMIN, DRIVER, CUSTOMER, MANAGER
    }
}
