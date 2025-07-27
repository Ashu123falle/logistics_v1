package com.cdac.acts.logistic_v1.DTO;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class CustomerDTO {
	 	
	    private Long id;

	    private String companyName;
	    private String contactPerson;
	    private String phone;
	    private String email;
	    private String address;
}
