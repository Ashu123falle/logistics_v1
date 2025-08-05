package com.cdac.acts.logistics_v1.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import com.cdac.acts.logistics_v1.dto.AdminDashboardDTO;

import com.cdac.acts.logistics_v1.dto.AuthRequestDTO;
import com.cdac.acts.logistics_v1.dto.AuthResponseDTO;
import com.cdac.acts.logistics_v1.dto.UserRequestDTO;
import com.cdac.acts.logistics_v1.dto.UserResponseDTO;
import com.cdac.acts.logistics_v1.enums.DeliveryStatus;
import com.cdac.acts.logistics_v1.enums.Role;
import com.cdac.acts.logistics_v1.enums.UserStatus;
import com.cdac.acts.logistics_v1.model.User;
import com.cdac.acts.logistics_v1.repository.DeliveryOrderRepository;
import com.cdac.acts.logistics_v1.repository.DriverRepository;
import com.cdac.acts.logistics_v1.repository.UserRepository;
import com.cdac.acts.logistics_v1.service.UserService;
import com.cdac.acts.logistics_v1.utilities.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


	  private final AuthenticationManager authenticationManager;

	  private final JwtUtil jwtUtil;
	
    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;
    
    private final DriverRepository driverRepository;
    
    private final DeliveryOrderRepository deliveryOrderRepository;

    private UserResponseDTO mapToResponseDTO(User user) {
        return UserResponseDTO.builder()
                .userId(user.getUserId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole())
                .status(user.getStatus())
                .build();
    }

    private User mapToEntity(UserRequestDTO dto) {
        return User.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .username(dto.getUsername())
                .password(passwordEncoder.encode(dto.getPassword())) // ✅ Secure password
                .email(dto.getEmail())
                .phoneNumber(dto.getPhoneNumber())
                .role(dto.getRole())
                .status(dto.getStatus())
                .build();
    }

    @Override
    public UserResponseDTO register(UserRequestDTO request) {
        User user = mapToEntity(request);
        user = userRepository.save(user);
        return mapToResponseDTO(user);
    }

    @Override
    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));
        return mapToResponseDTO(user);
    }

    @Override
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponseDTO updateUser(Long id, UserRequestDTO request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(request.getRole());
        user.setStatus(request.getStatus());

        return mapToResponseDTO(userRepository.save(user));
    }

    @Override
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }


    @Override
    public List<UserResponseDTO> findUsersByRole(String role) {
        Role roleEnum = Role.valueOf(role.toUpperCase()); // safer enum conversion
        return userRepository.findByRole(roleEnum).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AuthResponseDTO authenticate(AuthRequestDTO request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            if (authentication.isAuthenticated()) {
                UserDetails userDetails = (UserDetails) authentication.getPrincipal();

                // You can cast and retrieve User object for additional info
                User user = userRepository.findByUsername(request.getUsername())
                        .orElseThrow(() -> new RuntimeException("User not found"));

                String token = jwtUtil.generateToken(userDetails); // or jwtUtil.generateToken(user)

                return AuthResponseDTO.builder()
                        .token(token)
                        .message("Login successful")
//                        .userId(user.getUserId())
//                        .username(user.getUsername())
//                        .role(user.getRole().name())
                        .build();
            } else {
                throw new RuntimeException("Authentication failed");
            }

        } catch (Exception e) {
            throw new RuntimeException("Invalid credentials", e);
        }
    }

    @Override
    public AdminDashboardDTO getAdminDashboard() {
        Long totalDrivers = driverRepository.count();
        Long activeDrivers = driverRepository.countByStatus(UserStatus.ACTIVE);
        Long pendingOrders = deliveryOrderRepository.countByStatus(DeliveryStatus.PENDING); // or whatever your status enum/string is
        Double totalRevenue = deliveryOrderRepository.sumAllDeliveredOrderCosts();

        return AdminDashboardDTO.builder()
                .totalDrivers(totalDrivers)
                .activeDrivers(activeDrivers)
                .pendingOrders(pendingOrders)
                .totalRevenue(totalRevenue != null ? totalRevenue : 0.0)
                .build();
    }

}
