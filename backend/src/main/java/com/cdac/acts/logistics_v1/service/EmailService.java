package com.cdac.acts.logistics_v1.service;

public interface EmailService {
	
	public void sendSimpleEmail(String toEmail, String subject, String body);

}
