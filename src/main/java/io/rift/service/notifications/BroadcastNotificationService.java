package io.rift.service.notifications;

import io.rift.model.Game;
import io.rift.model.Notification;
import io.rift.model.RifterSession;
import io.rift.model.Usertable;
import io.rift.repository.RiftRepository;
import io.rift.service.AbstractNotificationService;
import io.rift.service.GameService;
import io.rift.service.RifterSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class BroadcastNotificationService extends AbstractNotificationService {

    @Autowired
    private RiftRepository riftRepository;

    @Autowired
    private RifterSessionService rifterSessionService;

    @Autowired
    private GameService gameService;

    private final String getBroadcastNotificationsForFollower = "getBroadcastNotificationsForFollower";
    private final String getBroadcastNotifications = "getBroadcastNotifications";
    private final String getSessionUpdateBroadcastsByUserId = "getSessionUpdateBroadcastsByUserId";
    private final String getSessionDeletionBroadcastsByUserId = "getSessionDeletionBroadcastsByUserId";


    @Override
    public List<Notification> getNotifications(Integer riftId, String type) throws SQLException {
        Object[] args = new Object[1];
        args[0] = riftId;
        ResultSet resultSet;
        if (type.equals("Followers")) {
            resultSet = riftRepository.doQuery(getBroadcastNotificationsForFollower, args);
        } else {
            resultSet = riftRepository.doQuery(getBroadcastNotifications, args);
        }
        List<Notification> notifications = new ArrayList<>();
        try {
            while (resultSet.next()) {
                Notification notification = new Notification();
                notification = super.populateNotification(resultSet, 1, "");
                Usertable usertable = new Usertable();
                usertable.setId(notification.getCreatorId());
                usertable.setFirstName(resultSet.getString(super.POPULATESIZE + 1));
                usertable.setLastName(resultSet.getString(super.POPULATESIZE + 2));
                usertable.setIsPrivate(resultSet.getBoolean(super.POPULATESIZE + 3));
                usertable.setIsSuspended(resultSet.getBoolean(super.POPULATESIZE + 4));
                usertable.setProfilePicturePath(resultSet.getString(super.POPULATESIZE + 5));
                usertable.setRiftTag(resultSet.getString(super.POPULATESIZE + 6));
                usertable.setRifteeRating(resultSet.getDouble(super.POPULATESIZE + 7));
                usertable.setRifterRating(resultSet.getDouble(super.POPULATESIZE + 8));
                usertable.setGender(resultSet.getBoolean(super.POPULATESIZE + 9));
                notification.setCreatorUsertable(usertable);
                try {
                    RifterSession rifterSession = new RifterSession();
                    rifterSession = rifterSessionService.populateRifterSession(resultSet, super.POPULATESIZE + 10, "host");
                    notification.setRifterSession(rifterSession);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                notifications.add(notification);
            }
            resultSet.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        resultSet = riftRepository.doQuery(getSessionUpdateBroadcastsByUserId, args);
        try {
            while (resultSet.next()) {
                Notification notification = super.populateNotification(resultSet, 1, "");
                RifterSession rifterSession = new RifterSession();
                rifterSession = rifterSessionService.populateRifterSession(resultSet, super.POPULATESIZE + 1, "");
                notification.setRifterSession(rifterSession);
                Game game = new Game();
                game.setId(resultSet.getInt(rifterSessionService.POPULATESIZE + super.POPULATESIZE + 1));
                game.setGame(resultSet.getString(rifterSessionService.POPULATESIZE + super.POPULATESIZE + 2));
                Usertable usertable = new Usertable();
                usertable.setRiftTag(resultSet.getString(rifterSessionService.POPULATESIZE + super.POPULATESIZE + gameService.POPULATESIZE + 1));
                usertable.setRifterRating(resultSet.getDouble(rifterSessionService.POPULATESIZE + super.POPULATESIZE + gameService.POPULATESIZE + 2));
                notification.setCreatorUsertable(usertable);
                notifications.add(notification);
            }
            resultSet.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        resultSet = riftRepository.doQuery(getSessionDeletionBroadcastsByUserId, args);
        try {
            while (resultSet.next()) {
                Notification notification = super.populateNotification(resultSet, 1, "");
                Usertable usertable = new Usertable();
                usertable.setRiftTag(resultSet.getString(super.POPULATESIZE + 1));
                usertable.setRifterRating(resultSet.getDouble(super.POPULATESIZE + 2));
                notification.setCreatorUsertable(usertable);
                notifications.add(notification);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return notifications;
    }

}
