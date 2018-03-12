package io.rift.service;

import io.rift.model.Notification;
import io.rift.repository.RiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private RifterSessionService rifterSessionService;

    @Autowired
    private RiftRepository riftRepository;

    @Autowired
    private UsertableService usertableService;

    private final String getUserById = "getUserById";
    private final String getRifterGameById = "getRifterGameById";

    private final String getNumberNotificationsUnseen = "getNumberNotificationsUnseen";
    private final String clearUnseenNotifications = "clearUnseenNotifications";

    public final Integer POPULATESIZE = 7;

    volatile boolean isSubscribed = false;

    public void setSubscribed(boolean isSubscribed) {
        this.isSubscribed = isSubscribed;
    }

    public List<Notification> populateNotifications(ResultSet resultSet, int startPoint, String info) throws SQLException {
        List<Notification> notifications = new ArrayList<>();
        while (resultSet.next()) {
            Notification notification = new Notification();
            notification.setId(resultSet.getInt(startPoint));
            notification.setUserId(resultSet.getInt(startPoint + 1));
            notification.setNotificationType(resultSet.getInt(startPoint + 2));
            notification.setNotificationContent(resultSet.getString(startPoint + 3));
            notification.setSessionId(resultSet.getInt(startPoint + 4));
            notification.setCreatedTime(resultSet.getTimestamp(startPoint + 5));
            notification.setCreatorId(resultSet.getInt(startPoint + 6));
            notifications.add(notification);
            if (notification.getCreatorId() != null) {
                Object[] args = new Object[1];
                args[0] = notification.getCreatorId();
                ResultSet res = riftRepository.doQuery(getUserById, args);
                if (res.next()) {
                    notification.setCreatorUsertable(usertableService.populateUsertable(res, 1, ""));
                }
            }
            if (notification.getSessionId() != null) {
                Object[] args = new Object[1];
                args[0] = notification.getSessionId();
                ResultSet res = riftRepository.doQuery(getRifterGameById, args);
                if (res.next()) {
                    notification.setRifterSession(rifterSessionService.populateRifterSession(res, 1, ""));
                }
            }
        }
        return notifications;
    }

    public Notification populateNotification(ResultSet resultSet, int startPoint, String info) throws SQLException {
        Notification notification = new Notification();
        notification.setId(resultSet.getInt(startPoint));
        notification.setUserId(resultSet.getInt(startPoint + 1));
        notification.setNotificationType(resultSet.getInt(startPoint + 2));
        notification.setNotificationContent(resultSet.getString(startPoint + 3));
        notification.setSessionId(resultSet.getInt(startPoint + 4));
        notification.setCreatedTime(resultSet.getTimestamp(startPoint + 5));
        notification.setCreatorId(resultSet.getInt(startPoint + 6));
        if (info.equals("session") && notification.getNotificationType() != 2) {
            notification.setRifterSession(rifterSessionService.populateRifterSession(resultSet, startPoint + 7, ""));
        }
        return notification;
    }

    public Integer getNumberNotificationsUnseen(Integer riftId) throws SQLException {
        Object[] args = new Object[1];
        args[0] = riftId;
        ResultSet resultSet = riftRepository.doQuery(getNumberNotificationsUnseen, args);
        if (resultSet.next()) {
            return resultSet.getInt(1);
        }
        return null;
    }

    public boolean clearUnseenNotifications(Integer riftId) throws SQLException {
        Object[] args = new Object[1];
        args[0] = riftId;
        boolean success = riftRepository.doInsert(clearUnseenNotifications, args);
        return success;
    }

}
