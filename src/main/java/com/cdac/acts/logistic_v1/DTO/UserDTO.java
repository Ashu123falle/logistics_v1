package com.cdac.acts.logistic_v1.DTO;

import com.cdac.acts.logistics_v1.model.User.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
	
	 	private Long id;
	    private String name;
	    private String email;
	    private String phone;
	    private String passwordHash;
	    private Role role;
	    private String address;

		public Long getId() {	return id;	}
		public void setId(Long id) {	this.id = id;	}
		public String getName() {	return name;	}
		public void setName(String name) {	this.name = name;	}
		public String getEmail() {	return email;	}
		public void setEmail(String email) {	this.email = email; }
		public String getPhone() {	return phone; }
		public void setPhone(String phone) {	this.phone = phone; }
		public String getPasswordHash() {	return passwordHash; }
		public void setPasswordHash(String passwordHash) {	this.passwordHash = passwordHash; }
		public Role getRole() {	  return role; }
		public void setRole(Role role) {	this.role = role; }
		public String getAddress() {	return address; } 
		public void setAddress(String address) {	this.address = address; }
		
		@Override
		public String toString() {
			return "UserDTO [id=" + id + ", name=" + name + ", email=" + email + ", phone=" + phone + ", passwordHash="
					+ passwordHash + ", role=" + role + ", address=" + address + "]";
		}
	    
	    
}
