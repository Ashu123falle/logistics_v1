package com.cdac.acts.logistics_v1.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface ImageUploadService {

	String uploadImage(MultipartFile file);
    List<String> uploadMultipleImages(List<MultipartFile> files);

}
