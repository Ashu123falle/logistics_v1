package com.cdac.acts.logistics_v1.service;

import java.util.List;

import com.cdac.acts.logistics_v1.dto.AdminDashboardDTO;
import com.cdac.acts.logistics_v1.dto.AuthRequestDTO;
import com.cdac.acts.logistics_v1.dto.AuthResponseDTO;
import com.cdac.acts.logistics_v1.dto.UserRequestDTO;
import com.cdac.acts.logistics_v1.dto.UserResponseDTO;

public interface UserService {
    UserResponseDTO register(UserRequestDTO request);
    AuthResponseDTO authenticate(AuthRequestDTO request);

    UserResponseDTO getUserById(Long id);
    List<UserResponseDTO> getAllUsers();
    UserResponseDTO updateUser(Long id, UserRequestDTO request);
    boolean deleteUser(Long id);

    // Extras
    AdminDashboardDTO getAdminDashboard();
    List<UserResponseDTO> findUsersByRole(String role);
    
}
