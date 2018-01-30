package io.rift.service;

import io.rift.model.Notification;
import io.rift.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    /*
    public Notification getNotificationById(Integer id) {
        return notificationRepository.getNotificationById(id);
    }
    */

}
