package com.cdac.acts.logistics_v1.dto;

import com.cdac.acts.logistics_v1.enums.Role;
import com.cdac.acts.logistics_v1.enums.UserStatus;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDTO {
    private Long userId;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String phoneNumber;
    private Role role;
    private UserStatus status;
}
