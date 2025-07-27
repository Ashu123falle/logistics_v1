package com.cdac.acts.logistics_v1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.acts.logistic_v1.DTO.UserDTO;
import com.cdac.acts.logistic_v1.service.UserService;
import com.cdac.acts.logistics_v1.model.User;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("addUser")
	public void addUser(@RequestBody UserDTO userDTO  ) {
		userService.addUser(userDTO);
	}
	
	@PostMapping("updateUser")
	public String updateUser(@RequestBody UserDTO userDTO) {
		return userService.updateUser(userDTO) != null? "User updated successfully !!!" : "User could not be updated";
	}
	
	@GetMapping("deleteUser/{ID}")
	public String deleteUser(@RequestParam Long id) {
		return userService.deleteUser(id) ? "User deleted successfully !!!" : "User could not be deleted";
	}
	
	@GetMapping("getUsers")
	public List<User> getUsers(@RequestParam int pageNo, @RequestParam int pageSize) {
		return userService.getUsers(pageNo-1,pageSize);
	}
	
	//Change return type to user 
	@GetMapping("getUsersById/{ID}")
	public boolean getUserById(@PathVariable Long id) {
		return userService.getUserById(id);
	}
	

}
