package io.rift.service.notifications;

import io.rift.model.Notification;
import io.rift.repository.RiftRepository;
import io.rift.service.AbstractNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class UserNotificationService extends AbstractNotificationService {

    @Autowired
    private RiftRepository riftRepository;

    private final String getUserNotifications = "getUserNotifications";
    private final String clearUnseenNotifications = "clearUnseenNotifications";

    @Override
    public List<Notification> getNotifications(Integer riftId, String info) throws SQLException {
        Object[] args = new Object[1];
        args[0] = riftId;
        ResultSet resultSet = riftRepository.doQuery(getUserNotifications, args);
        List<Notification> notifications = super.populateNotifications(resultSet, 1, "");
        resultSet.close();
        return notifications;
    }

    public boolean clearUnseenNotifications(Integer riftId) throws SQLException {
        Object[] args = new Object[1];
        args[0] = riftId;
        boolean success = riftRepository.doInsert(clearUnseenNotifications, args);
        return success;
    }

}
