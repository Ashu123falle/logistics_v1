package com.cdac.acts.logistics_v1.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResetPasswordRequestDTO {
	
	private String email;
	private String otp;
	private String newPassword;

}
