package com.cdac.acts.logistic_v1.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.cdac.acts.logistic_v1.DTO.UserDTO;
import com.cdac.acts.logistics_v1.model.User;
import com.cdac.acts.logistics_v1.repository.UserRepository;

public class UserServiceImp implements UserService {
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public boolean addUser(UserDTO userDTO) {
		User user = new User();
		BeanUtils.copyProperties(userDTO, user);
		try{
			userRepository.save(user);
		}catch(Exception e) {
			return false;
		}
		return true;
	}

	@Override
	public boolean deleteUser(Long id) {
		if (userRepository.existsById(id)) {		
            try {        	
            	userRepository.deleteById(id); 
                return true; 
            } catch (Exception e) {
                return false;
            }         
        }
		else {            
			return false;
		}
	}

	@Override
	public String updateUser(UserDTO userDTO) {
		if(userRepository.existsById(userDTO.getId())) {
			User user = new User();
			BeanUtils.copyProperties(userDTO, user);
			try{
				userRepository.save(user);
				return "User saved successfully !!!";
			}catch(Exception e) {
				return "User could'nt be saved !!!";
			}
		}
		return "User does'nt exist !!";
		
	}
	
	@Override
	public boolean getUserById(Long id) {
		return userRepository.findById(id).isEmpty() ? false : true;
	}
	
	@Override
	public List<User> getUsers(int pageNo, int pageSize) {
		Pageable page = PageRequest.of(pageNo, pageSize);
		return userRepository.findAll(page).toList();
	}
	

}
