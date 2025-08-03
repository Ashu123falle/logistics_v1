package com.cdac.acts.logistics_v1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.acts.logistics_v1.dto.UserRequestDTO;
import com.cdac.acts.logistics_v1.dto.UserResponseDTO;
import com.cdac.acts.logistics_v1.model.User;
import com.cdac.acts.logistics_v1.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("addUser")
	public void addUser(@RequestBody UserRequestDTO userDTO  ) {
		
		userService.createUser(userDTO);
	}
	
	@PostMapping("updateUser/{id}")
	public String updateUser(@RequestBody UserRequestDTO userDTO ,@RequestParam long  id) {
		return userService.updateUser(id,userDTO) != null? "User updated successfully !!!" : "User could not be updated";
	}
	
	@GetMapping("deleteUser/{ID}")
	public String deleteUser(@RequestParam Long id) {
		userService.deleteUser(id);
		return  "User deleted successfully !!!";
//		return userService.deleteUser(id) ? "User deleted successfully !!!" : "User could not be deleted";
	}
	
	@GetMapping("getUsers")
	public ResponseEntity<List<UserResponseDTO>> getUsers() {
		return ResponseEntity.ok(userService.getAllUsers());
	}
//	@GetMapping("getUsers")
//	public List<User> getUsers(@RequestParam int pageNo, @RequestParam int pageSize) {
//		return userService.getUsers(pageNo-1,pageSize);
//	}
	
	//Change return type to user 
	@GetMapping("getUsersById/{ID}")
	public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
		return ResponseEntity.ok(userService.getUserById(id));
	}
	

}
