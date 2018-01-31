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

    public List<Notification> populateNotifications(ResultSet resultSet, int startPoint) throws SQLException {
        List<Notification> notifications = new ArrayList<>();
        while (resultSet.next()) {
            Notification notification = new Notification();
            notification.setId(resultSet.getInt(startPoint));
            notification.setUserId(resultSet.getInt(startPoint + 1));
            notification.setNotificationType(resultSet.getString(startPoint + 2));
            notification.setNotificationContent(resultSet.getString(startPoint + 3));
            notification.setGameId(resultSet.getInt(startPoint + 4));
            notification.setCreatedTime(resultSet.getTimestamp(startPoint + 5));
            notification.setCreatorId(resultSet.getInt(startPoint + 6));
            notifications.add(notification);
        }
        return notifications;
    }

    /*
    public Notification getNotificationById(Integer id) {
        return notificationRepository.getNotificationById(id);
    }
    */

}
