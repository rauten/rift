package io.rift.service;


import io.rift.config.SwaggerConfig;
import io.rift.model.GameRequest;
import io.rift.model.Notification;
import io.rift.model.Usertable;
import io.rift.repository.UsertableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class UsertableService {

    @Autowired
    private UsertableRepository usertableRepository;


    @Autowired
    private ConnectionService connectionService;

    /*
    @Autowired
    private SwaggerConfig swaggerConfig;

    @Autowired
    private ConnectionService connectionService;
    */

    public Usertable getUserById(Integer id) {
        return usertableRepository.findById(id);
    }

    public Usertable getUserByFirstName(String name) { return usertableRepository.findByFirstName(name); }


    /**
     *
     * Gets broadcast notifications: relevant notifications from people you follow that aren't necessarily directed
     * specifically at you, thus they have been broadcasted.
     * i.e. a Rifter posts a new game. The activity notification will not be directed at any one individual, but will
     * be broadcast to all his followers.
     * @param id
     * @return
     */
    public List<Notification> getBroadcastNotifications(Integer id) {

        String query = "SELECT n.id, user_id, notification_type, notification_content, game_id, created_time, creator_id\n" +
                "        FROM usertable u JOIN following f ON u.id = f.follower_id\n" +
                "        JOIN notification n ON f.following_id = n.creator_id\n" +
                "        WHERE u.id = ? AND n.notification_type = 'New Game';";

        try {
            PreparedStatement preparedStatement = connectionService.connection.prepareStatement(query);
            preparedStatement.setObject(1, id);
            ResultSet resultSet = preparedStatement.executeQuery();
            System.out.println(resultSet);
            int i = 1;
            List<Notification> notifications = new ArrayList<>();
            while (resultSet.next()) {
                Notification notification = new Notification();
                notification.setId(resultSet.getInt(i));
                notification.setUserId(resultSet.getInt(i + 1));
                notification.setNotificationType(resultSet.getString(i + 2));
                notification.setNotificationContent(resultSet.getString(i + 3));
                notification.setGameId(resultSet.getInt(i + 4));
                notification.setCreatedTime(resultSet.getTimestamp(i + 5));
                notification.setCreatorId(resultSet.getInt(i + 6));
                notifications.add(notification);
            }
            return notifications;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;

    }


}
