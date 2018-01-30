package io.rift.service;


import io.rift.config.SwaggerConfig;
import io.rift.model.*;
import io.rift.repository.UsertableRepository;
import org.postgresql.util.PGInterval;
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

    private final String getUserById = "getUserById";
    private final String getNumberGamesPlayedByUserId = "getNumberGamesPlayedByUserId";
    private final String getNumberFollowing = "getNumberFollowingById";
    private final String getNumberFollowers = "getNumberFollowersById";
    private final String getFollowersById = "getFollowersById";
    private final String getBroadcastNotifications = "getBroadcastNotificationsById";
    private final String getFollowingById = "getFollowingById";
    private final String getRequestsByUser = "getRequestsByUser";
    private final String getUserActivity = "getUserActivity";
    private final String getUserNotifications = "getUserNotifications";
    private final String getGameRequestsByUserAndAccepted = "getGameRequestsByUserAndAccepted";
    private final String getGameRequestsAndGameIinfoByUserId = "getGameRequestsAndGameIinfoByUserId";

    /*
    @Autowired
    private SwaggerConfig swaggerConfig;

    @Autowired
    private ConnectionService connectionService;
    */

    public Usertable getUserById(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getUserById, args);
        Usertable usertable = new Usertable();
        if (resultSet.next()) {
            usertable.setId(resultSet.getInt(1));
            usertable.setFirstName(resultSet.getString(2));
            usertable.setLastName(resultSet.getString(3));
            usertable.setGender(resultSet.getBoolean(4));
            usertable.setIsPrivate(resultSet.getBoolean(5));
            usertable.setIsSuspended(resultSet.getBoolean(6));
            usertable.setProfilePicturePath(resultSet.getString(7));
            usertable.setRiftTag(resultSet.getString(8));
            usertable.setRifteeRating(resultSet.getDouble(9));
            usertable.setRifterRating(resultSet.getDouble(10));
            usertable.setTwitchAccount(resultSet.getString(11));
            usertable.setYoutubeAccount(resultSet.getString(12));
            usertable.setBio(resultSet.getString(13));
            return usertable;
        } else {
            return null;
        }
    }

    public Integer getNumberGamesPlayedByUserId(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getNumberGamesPlayedByUserId, args);
        if (resultSet.next()) {
            return resultSet.getInt(1);
        }
        return null;
    }

    public Integer getNumberFollowing(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getNumberFollowing, args);
        if (resultSet.next()) {
            return resultSet.getInt(1);
        }
        return null;
    }

    public Integer getNumberFollowers(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getNumberFollowers, args);
        if (resultSet.next()) {
            return resultSet.getInt(1);
        }
        return null;
    }


    public List<Following> getFollowingsById(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getFollowersById, args);
        List<Following> followings = new ArrayList<>();
        while (resultSet.next()) {
            Following following = new Following();
            following.setFollowerId(id);
            following.setFollowingId(resultSet.getInt(2));
            following.setAccepted(resultSet.getBoolean(3));
            followings.add(following);
        }
        return followings;
    }

    public List<Following> getFollowersById(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getFollowingById, args);
        List<Following> followers = new ArrayList<>();
        while (resultSet.next()) {
            Following following = new Following();
            following.setFollowerId(resultSet.getInt(1));
            following.setFollowingId(id);
            following.setAccepted(resultSet.getBoolean(3));
            followers.add(following);
        }
        return followers;
    }

    public List<GameRequest> getGameRequestsByUserId(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getRequestsByUser, args);
        return populateGameRequests(resultSet);
    }

    public List<GameRequest> getGameRequestsByUserIdAndAccepted(Integer id, Boolean accepted) throws SQLException {
        Object[] args = new Object[2];
        args[0] = id;
        args[1] = accepted;
        ResultSet resultSet = usertableRepository.doQuery(getGameRequestsByUserAndAccepted, args);
        return populateGameRequests(resultSet);
    }

    public List<GameRequest> getGameRequestsAndGameIinfoByUserId(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getGameRequestsAndGameIinfoByUserId, args);
        return populateGameRequestsWithGameInfo(resultSet);
    }

    public List<Notification> getUserActivity(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getUserActivity, args);
        return populateNotification(resultSet);
    }

    public List<Notification> getUserNotifications(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getUserNotifications, args);
        return populateNotification(resultSet);
    }

    private List<Notification> populateNotification(ResultSet resultSet) throws SQLException {
        List<Notification> notifications = new ArrayList<>();
        while (resultSet.next()) {
            Notification notification = new Notification();
            notification.setId(resultSet.getInt(1));
            notification.setUserId(resultSet.getInt(2));
            notification.setNotificationType(resultSet.getString(3));
            notification.setNotificationContent(resultSet.getString(4));
            notification.setGameId(resultSet.getInt(5));
            notification.setCreatedTime(resultSet.getTimestamp(6));
            notification.setCreatorId(resultSet.getInt(7));
            notifications.add(notification);
        }
        return notifications;
    }

    private List<GameRequest> populateGameRequests(ResultSet resultSet) throws SQLException {
        List<GameRequest> gameRequests = new ArrayList<>();
        while (resultSet.next()) {
            GameRequest gameRequest = new GameRequest();
            gameRequest.setRifteeId(resultSet.getInt(1));
            gameRequest.setSessionId(resultSet.getInt(2));
            gameRequest.setAccepted(resultSet.getBoolean(3));
            gameRequests.add(gameRequest);
        }
        return gameRequests;
    }

    private List<GameRequest> populateGameRequestsWithGameInfo(ResultSet resultSet) throws SQLException {
        List<GameRequest> gameRequests = new ArrayList<>();
        while (resultSet.next()) {
            GameRequest gameRequest = new GameRequest();
            gameRequest.setRifteeId(resultSet.getInt(1));
            gameRequest.setSessionId(resultSet.getInt(2));
            gameRequest.setAccepted(resultSet.getBoolean(3));
            RifterGame rifterGame = new RifterGame();
            rifterGame.setId(resultSet.getInt(4));
            rifterGame.setHostId(resultSet.getInt(5));
            rifterGame.setNumSlots(resultSet.getInt(6));
            rifterGame.setExpirationTime(resultSet.getTimestamp(7));
            rifterGame.setGameCost(resultSet.getDouble(8));
            rifterGame.setMethodOfContact(resultSet.getString(9));
            rifterGame.setGameType(resultSet.getString(10));
            rifterGame.setTitle(resultSet.getString(11));
            rifterGame.setHits(resultSet.getInt(12));
            rifterGame.setGameDuration((PGInterval)resultSet.getObject(13));
            rifterGame.setGameTime(resultSet.getTimestamp(14));
            gameRequest.setRifterGame(rifterGame);
            gameRequests.add(gameRequest);
        }
        return gameRequests;
    }



    //public Usertable getUserByFirstName(String name) { return usertableRepository.findByFirstName(name); }


    /**
     *
     * Gets broadcast notifications: relevant notifications from people you follow that aren't necessarily directed
     * specifically at you, thus they have been broadcasted.
     * i.e. a Rifter posts a new game. The activity notification will not be directed at any one individual, but will
     * be broadcast to all his followers.
     * @param id
     * @return
     */
    public List<Notification> getBroadcastNotifications(Integer id) throws SQLException {

        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getBroadcastNotifications, args);
        int i = 1;
        List<Notification> notifications = new ArrayList<>();
        while (resultSet.next()) {
            Notification notification = new Notification();
            notification.setId(resultSet.getInt(1));
            notification.setUserId(resultSet.getInt(2));
            notification.setNotificationType(resultSet.getString(3));
            notification.setNotificationContent(resultSet.getString(4));
            notification.setGameId(resultSet.getInt(5));
            notification.setCreatedTime(resultSet.getTimestamp(6));
            notification.setCreatorId(resultSet.getInt(7));
            Usertable usertable = new Usertable();
            usertable.setId(notification.getCreatorId());
            usertable.setFirstName(resultSet.getString(8));
            usertable.setLastName(resultSet.getString(9));
            usertable.setIsPrivate(resultSet.getBoolean(10));
            usertable.setIsSuspended(resultSet.getBoolean(11));
            usertable.setProfilePicturePath(resultSet.getString(12));
            usertable.setRiftTag(resultSet.getString(13));
            usertable.setRifteeRating(resultSet.getDouble(14));
            usertable.setRifterRating(resultSet.getDouble(15));
            notification.setCreatorUsertable(usertable);
            notifications.add(notification);
        }
        return notifications;

    }


}
