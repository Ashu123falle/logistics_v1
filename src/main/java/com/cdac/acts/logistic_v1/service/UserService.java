package com.cdac.acts.logistic_v1.service;

import java.util.List;

import com.cdac.acts.logistic_v1.DTO.UserDTO;
import com.cdac.acts.logistics_v1.model.User;

public interface UserService {
	public boolean addUser(UserDTO userDTO);
	public String updateUser(UserDTO userDTO);
	public boolean deleteUser(Long id);
	public boolean getUserById(Long id);
	public List<User> getUsers(int pageNo, int pageSize);
}
