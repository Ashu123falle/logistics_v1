package com.cdac.acts.logistics_v1.service;

import java.util.List;

import com.cdac.acts.logistics_v1.dto.DocumentRequestDTO;
import com.cdac.acts.logistics_v1.dto.DocumentResponseDTO;

public interface DocumentService {
    DocumentResponseDTO uploadDocument(DocumentRequestDTO request);
    DocumentResponseDTO getDocumentById(Long id);
    List<DocumentResponseDTO> getAllDocuments();
    void deleteDocument(Long id);

    // Extra
    List<DocumentResponseDTO> getDocumentsByUserId(Long userId);
}

