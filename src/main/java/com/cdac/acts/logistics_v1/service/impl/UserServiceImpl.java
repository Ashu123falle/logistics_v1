package com.cdac.acts.logistics_v1.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.acts.logistics_v1.dto.UserDTO;
import com.cdac.acts.logistics_v1.model.User;
import com.cdac.acts.logistics_v1.repository.UserRepository;
import com.cdac.acts.logistics_v1.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	
	
	@Override
	public UserDTO createUser(UserDTO user) {

		User newUser = new User();
		BeanUtils.copyProperties(user, newUser);
		try {
			userRepository.save(newUser);
		} catch (Exception e) {
			// Handle the exception, e.g., log it or rethrow it
			return null;
		}
		
		return user;
	}

	@Override
	public UserDTO getUserById(Long id) {
		User user = userRepository.findById(id).orElse(null);
		if (user != null) {
			UserDTO userDTO = new UserDTO();
			BeanUtils.copyProperties(user, userDTO);
			return userDTO;
		}
		return null; // or throw an exception if user not found
	}

	@Override
	public List<UserDTO> getAllUsers() {
		List<User> users = userRepository.findAll();
		List<UserDTO> userDTOs = new ArrayList<>();
		for (User user : users) {
			UserDTO userDTO = new UserDTO();
			BeanUtils.copyProperties(user, userDTO);
			userDTOs.add(userDTO);
		}
		return userDTOs;
	}

	@Override
	public UserDTO updateUser(Long id, UserDTO updatedUser) {
		User existingUser = userRepository.findById(id).orElse(null);
		if (existingUser != null) {
			BeanUtils.copyProperties(updatedUser, existingUser, "id"); // Exclude id from copy
			try {
				userRepository.save(existingUser);
				return updatedUser;
			} catch (Exception e) {
				// Handle the exception, e.g., log it or rethrow it
				return null;
			}
		}
		return null; // or throw an exception if user not found
	}

	@Override
	public void deleteUser(Long id) {
		if (userRepository.existsById(id)) {		
			try {        	
				userRepository.deleteById(id); 
			} catch (Exception e) {
				// Handle the exception, e.g., log it or rethrow it
			}         
		} else {            
			// Handle the case where the user does not exist, e.g., throw an exception or return a specific response
		}
		
	}
	

}