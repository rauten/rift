package io.rift.service.notifications;

import io.rift.model.Notification;
import io.rift.repository.RiftRepository;
import io.rift.service.AbstractNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ActivityNotificationService extends AbstractNotificationService {

    private final String getUserActiviyAndUserSession = "getUserActiviyAndUserSession";
    private final String getUserActivity = "getUserActivity";
    private final String getPaginatedActivities = "getPaginatedActivities";

    @Autowired
    private RiftRepository riftRepository;

    @Override
    public List<Notification> getNotifications(Integer riftId, String info) throws SQLException {
        Object[] args = new Object[1];
        args[0] = riftId;
        ResultSet resultSet;
        if (info.equals("session")) {
            resultSet = riftRepository.doQuery(getUserActiviyAndUserSession, args);
        } else {
            resultSet = riftRepository.doQuery(getUserActivity, args);
        }
        List<Notification> notifications = new ArrayList<>();
        notifications = super.populateNotifications(resultSet, 1, "");
        resultSet.close();
        return notifications;
    }

    public List<Notification> getPaginatedActivities(int id, Integer counter) throws SQLException {
        Object[] args = new Object[2];
        args[0] = id;
        counter = counter * 10;
        args[1] = counter;
        ResultSet resultSet = riftRepository.doQuery(getPaginatedActivities, args);
        List<Notification> paginatedACtivities = super.populateNotifications(resultSet, 1, "");
        resultSet.close();;
        return paginatedACtivities;
    }
}
