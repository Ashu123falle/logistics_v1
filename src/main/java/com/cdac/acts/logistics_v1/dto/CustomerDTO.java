package com.cdac.acts.logistics_v1.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerDTO {
	
	    private Long id;
	    private String companyName;
	    private String contactPerson;
	    private String phone;
	    private String email;
	    private String address;
	

}
