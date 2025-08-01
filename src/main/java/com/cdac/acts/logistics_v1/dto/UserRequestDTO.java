package com.cdac.acts.logistics_v1.dto;

import com.cdac.acts.logistics_v1.enums.Role;
import com.cdac.acts.logistics_v1.enums.UserStatus;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class UserRequestDTO {
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private Role role;
    private UserStatus status;
}
