package com.cdac.acts.logistics_v1.service;

import java.util.List;

import com.cdac.acts.logistics_v1.dto.NotificationRequestDTO;
import com.cdac.acts.logistics_v1.dto.NotificationResponseDTO;

public interface NotificationService {
    NotificationResponseDTO sendNotification(NotificationRequestDTO request);
    List<NotificationResponseDTO> getUserNotifications(Long userId);
    void markAsRead(Long notificationId);
}

