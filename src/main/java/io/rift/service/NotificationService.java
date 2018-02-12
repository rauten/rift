package io.rift.service;

import io.rift.model.Notification;
import io.rift.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private RifterSessionService rifterSessionService;

    public List<Notification> populateNotifications(ResultSet resultSet, int startPoint, String info) throws SQLException {
        List<Notification> notifications = new ArrayList<>();
        while (resultSet.next()) {
            Notification notification = new Notification();
            notification.setId(resultSet.getInt(startPoint));
            notification.setUserId(resultSet.getInt(startPoint + 1));
            notification.setNotificationType(resultSet.getString(startPoint + 2));
            notification.setNotificationContent(resultSet.getString(startPoint + 3));
            notification.setSessionId(resultSet.getInt(startPoint + 4));
            notification.setCreatedTime(resultSet.getTimestamp(startPoint + 5));
            notification.setCreatorId(resultSet.getInt(startPoint + 6));
            notifications.add(notification);
            if (info.equals("session")) {
                notification.setRifterSession(rifterSessionService.populateRifterSession(resultSet, startPoint + 7, ""));
            }
        }
        return notifications;
    }

    public Notification populateNotification(ResultSet resultSet, int startPoint, String info) throws SQLException {
        Notification notification = new Notification();
        notification.setId(resultSet.getInt(startPoint));
        notification.setUserId(resultSet.getInt(startPoint + 1));
        notification.setNotificationType(resultSet.getString(startPoint + 2));
        notification.setNotificationContent(resultSet.getString(startPoint + 3));
        notification.setSessionId(resultSet.getInt(startPoint + 4));
        notification.setCreatedTime(resultSet.getTimestamp(startPoint + 5));
        notification.setCreatorId(resultSet.getInt(startPoint + 6));
        if (info.equals("session")) {
            notification.setRifterSession(rifterSessionService.populateRifterSession(resultSet, startPoint + 7, ""));
        }
        return notification;
    }

    /*
    public Notification getNotificationById(Integer id) {
        return notificationRepository.getNotificationById(id);
    }
    */

}
