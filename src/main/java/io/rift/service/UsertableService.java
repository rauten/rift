package io.rift.service;


import io.rift.model.*;
import io.rift.repository.UsertableRepository;
import org.postgresql.util.PGInterval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class UsertableService {

    @Autowired
    private UsertableRepository usertableRepository;

    @Autowired
    private RifterSessionService rifterSessionService;


    /****************************** GET *******************************/
    /******************************************************************/
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
    private final String getGameRequestsAndGameInfoByUserId = "getGameRequestsAndGameInfoByUserId";
    private final String getUserAndRifterSessions = "getUserAndRifterSessions";
    private final String getUserAndRifteeSessions = "getUserAndRifteeSessions";
    private final String getGameRequestsAndGameInfoByUserIdAndAccepted = "getGameRequestsAndGameInfoByUserIdAndAccepted";


    /****************************** POST *******************************/
    /*******************************************************************/
    private final String createUser = "createUser";



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
        if (resultSet.next()) {
            return populateUsertable(resultSet, 1);
        }
        return null;
    }

    public Usertable populateUsertable(ResultSet resultSet, int startPoint) throws SQLException {
        Usertable usertable = new Usertable();
        usertable.setId(resultSet.getInt(startPoint));
        usertable.setFirstName(resultSet.getString(startPoint + 1));
        usertable.setLastName(resultSet.getString(startPoint + 2));
        usertable.setGender(resultSet.getBoolean(startPoint + 3));
        usertable.setIsPrivate(resultSet.getBoolean(startPoint + 4));
        usertable.setIsSuspended(resultSet.getBoolean(startPoint + 5));
        usertable.setProfilePicturePath(resultSet.getString(startPoint + 6));
        usertable.setRiftTag(resultSet.getString(startPoint + 7));
        usertable.setRifteeRating(resultSet.getDouble(startPoint + 8));
        usertable.setRifterRating(resultSet.getDouble(startPoint + 9));
        usertable.setTwitchAccount(resultSet.getString(startPoint + 10));
        usertable.setYoutubeAccount(resultSet.getString(startPoint + 11));
        usertable.setBio(resultSet.getString(startPoint + 12));
        return usertable;
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

    public List<SessionRequest> getGameRequestsByUserId(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getRequestsByUser, args);
        return populateGameRequests(resultSet);
    }

    public List<SessionRequest> getGameRequestsAndGameInfoByUserIdAndFilter(Integer id, String filter, String value) throws SQLException {
        Object[] args = new Object[2];
        args[0] = id;
        if (filter.equals("accepted")) {
            boolean val = Boolean.valueOf(value);
            args[1] = val;
            ResultSet resultSet = usertableRepository.doQuery(getGameRequestsAndGameInfoByUserIdAndAccepted, args);
            return populateGameRequestsWithGameInfo(resultSet);
        }
        return null;
    }

    public List<SessionRequest> getGameRequestsAndGameInfoByUserId(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getGameRequestsAndGameInfoByUserId, args);
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

    public List<RifterSession> getUserAndRifterSession(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getUserAndRifterSessions, args);
        List<RifterSession> rifterSessions = new ArrayList<>();
        while (resultSet.next()) {
            RifterSession rifterSession = rifterSessionService.populateRifterGame(resultSet);
            rifterSessions.add(rifterSession);
        }
        return rifterSessions;
    }

    /*
    public List<SessionRequest> getUserAndRifteeSessions(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getUserAndRifteeSessions, args);
    }
    */

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

    private List<SessionRequest> populateGameRequests(ResultSet resultSet) throws SQLException {
        List<SessionRequest> rifteeSessions = new ArrayList<>();
        while (resultSet.next()) {
            SessionRequest sessionRequest = new SessionRequest();
            sessionRequest.setRifteeId(resultSet.getInt(1));
            sessionRequest.setSessionId(resultSet.getInt(2));
            sessionRequest.setAccepted(resultSet.getBoolean(3));
            rifteeSessions.add(sessionRequest);
        }
        return rifteeSessions;
    }

    private List<SessionRequest> populateGameRequestsWithGameInfo(ResultSet resultSet) throws SQLException {
        List<SessionRequest> rifteeSessions = new ArrayList<>();
        while (resultSet.next()) {
            SessionRequest sessionRequest = new SessionRequest();
            sessionRequest.setRifteeId(resultSet.getInt(1));
            sessionRequest.setSessionId(resultSet.getInt(2));
            sessionRequest.setAccepted(resultSet.getBoolean(3));
            RifterSession rifterSession = new RifterSession();
            rifterSession.setId(resultSet.getInt(4));
            rifterSession.setHostId(resultSet.getInt(5));
            rifterSession.setNumSlots(resultSet.getInt(6));
            rifterSession.setExpirationTime(resultSet.getTimestamp(7));
            rifterSession.setGameCost(resultSet.getDouble(8));
            rifterSession.setMethodOfContact(resultSet.getString(9));
            rifterSession.setGameType(resultSet.getString(10));
            rifterSession.setTitle(resultSet.getString(11));
            rifterSession.setHits(resultSet.getInt(12));
            rifterSession.setGameDuration((PGInterval)resultSet.getObject(13));
            rifterSession.setGameTime(resultSet.getTimestamp(14));
            sessionRequest.setRifterSession(rifterSession);
            rifteeSessions.add(sessionRequest);
        }
        return rifteeSessions;
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

    public Boolean createUser(Usertable usertable) {
        return usertableRepository.doInsert(createUser,
                new Object[] {usertable.getFirstName(), usertable.getLastName(),
                        usertable.getGender(), usertable.getRiftTag()});
    }


}
