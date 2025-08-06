package com.cdac.acts.logistics_v1.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.cdac.acts.logistics_v1.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {
	
	
	 @Autowired
	 private JavaMailSender mailSender;

	@Override
	public void sendSimpleEmail(String toEmail, String subject, String body) {
		
		SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("movebizofficial@gmail.com");
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);

        System.out.println("Email sent successfully to " + toEmail);

	}

}
