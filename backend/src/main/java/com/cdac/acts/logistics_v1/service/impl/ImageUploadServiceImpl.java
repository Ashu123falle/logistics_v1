package com.cdac.acts.logistics_v1.service.impl;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cdac.acts.logistics_v1.service.ImageUploadService;
import com.cloudinary.Cloudinary;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class ImageUploadServiceImpl implements ImageUploadService {
	
	private final Cloudinary cloudinary;

    public String uploadImage(MultipartFile file) {
        try {
        	
        	@SuppressWarnings("unchecked")
			Map<String, Object> uploadResult = (Map<String, Object>) cloudinary.uploader().upload(file.getBytes(), Map.of());
            return uploadResult.get("secure_url").toString();
            
        } catch (IOException e) {
        	
            throw new RuntimeException("Image upload failed: " + e.getMessage());
        }
    }

    @Override
    public List<String> uploadMultipleImages(List<MultipartFile> files) {
        return files.stream().map(this::uploadImage).collect(Collectors.toList());
    }


}
