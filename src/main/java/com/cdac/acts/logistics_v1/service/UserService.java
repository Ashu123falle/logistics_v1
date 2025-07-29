package com.cdac.acts.logistics_v1.service;

import com.cdac.acts.logistics_v1.dto.UserDTO;
import java.util.List;

public interface UserService {
    UserDTO createUser(UserDTO user);
    UserDTO getUserById(Long id);
    List<UserDTO> getAllUsers();
    UserDTO updateUser(Long id, UserDTO updatedUser);
    void deleteUser(Long id);
}
