package io.rift.service;


import com.sun.org.apache.xpath.internal.operations.Bool;
import io.rift.model.*;
import io.rift.repository.UsertableRepository;
import org.aspectj.weaver.ast.Not;
import org.postgresql.util.PGInterval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UsertableService {

    @Autowired
    private UsertableRepository usertableRepository;

    @Autowired
    private RifterSessionService rifterSessionService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private SessionRequestService sessionRequestService;

    public final int POPULATESIZE = 14;


    /****************************** GET *******************************/
    /******************************************************************/
    private final String getUserById = "getUserById";
    private final String getUserByRiftTag = "getUserByRiftTag";

    private final String getNumberGamesPlayedByUserId = "getNumberGamesPlayedByUserId";
    private final String getNumberFollowing = "getNumberFollowingById";
    private final String getNumberFollowers = "getNumberFollowersById";

    private final String getBroadcastNotifications = "getBroadcastNotificationsById";
    private final String getBroadcastNotificationsForFollower = "getBroadcastNotificationsForFollower";
    private final String getUserActivity = "getUserActivity";
    private final String getUserNotifications = "getUserNotifications";
    private final String getUserActiviyAndUserSession = "getUserActiviyAndUserSession";

    private final String getUserAndRifterSessions = "getUserAndRifterSessions";
    private final String getUserAndRifteeSessions = "getUserAndRifteeSessions";

    private final String getFollowersById = "getFollowersById";
    private final String getFollowingsById = "getFollowingsById";
    private final String getFollowersAndInfoById = "getFollowersAndInfoById";
    private final String getFollowingsAndInfoById = "getFollowingsAndInfoById";

    private final String getRequestsByUser = "getRequestsByUser";
    private final String getGameRequestsAndGameInfoByUserId = "getGameRequestsAndGameInfoByUserId";
    private final String getGameRequestsAndHostInfoByUserId = "getGameRequestsAndHostInfoByUserId";
    private final String getGameRequestsAndGameInfoAndHostInfoByUserId = "getGameRequestsAndGameInfoAndHostInfoByUserId";

    private final String getGameRequestsAndGameInfoByUserIdAndAccepted = "getGameRequestsAndGameInfoByUserIdAndAccepted";
    private final String getGameRequestsAndHostInfoByUserIdAndAccepted = "getGameRequestsAndHostInfoByUserIdAndAccepted";
    private final String getGameRequestsAndHostInfoAndSessionInfoByUserIdAndAccepted = "getGameRequestsAndHostInfoAndSessionInfoByUserIdAndAccepted";
    private final String getGameRequestsByUserIdAndAccepted = "getGameRequestsByUserIdAndAccepted";

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
            return populateUsertable(resultSet, 1, "");
        }
        return null;
    }

    public Usertable getUserByRiftTag(String riftTag) throws SQLException {
        Object[] args = new Object[1];
        args[0] = riftTag;
        ResultSet resultSet = usertableRepository.doQuery(getUserByRiftTag, args);
        if (resultSet.next()) {
            return populateUsertable(resultSet, 1, "");
        }
        return null;
    }

    public Usertable populateUsertable(ResultSet resultSet, int startPoint, String info) throws SQLException {
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
        usertable.setAuth0Id(resultSet.getString(startPoint + 13));
        if (info.equals("activity")) {
            usertable.setCreatorActivityList(notificationService.populateNotifications(resultSet, 13, ""));
        }
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
        ResultSet resultSet = usertableRepository.doQuery(getFollowingsById, args);
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

    public List<Following> getFollowingsAndInfoById(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getFollowingsAndInfoById, args);
        List<Following> followings = new ArrayList<>();
        while (resultSet.next()) {
            Following following = new Following();
            following.setFollowerId(id);
            following.setFollowingId(resultSet.getInt(2));
            following.setAccepted(resultSet.getBoolean(3));
            following.setFollowingUsertable(populateUsertable(resultSet, 4, ""));
            followings.add(following);
        }
        return followings;
    }

    public List<Following> getFollowersAndInfoById(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getFollowersAndInfoById, args);
        List<Following> followings = new ArrayList<>();
        while (resultSet.next()) {
            Following following = new Following();
            following.setFollowerId(id);
            following.setFollowingId(resultSet.getInt(2));
            following.setAccepted(resultSet.getBoolean(3));
            following.setFollowerUsertable(populateUsertable(resultSet, 4, ""));
            followings.add(following);
        }
        return followings;
    }

    public List<SessionRequest> getGameRequestsAndInfoByUserId(Integer id, String info, Optional<String> filter, Optional<String> value) throws SQLException {
        ResultSet resultSet;
        boolean bool;
        if (info.equals("sessionInfo")) {
            if (!filter.isPresent()) {
                resultSet = usertableRepository.doQuery(getGameRequestsAndGameInfoByUserId, new Object[] {id});
            } else if (filter.get().equals("accepted")) {
                bool = value.get().equals("true") ? true : false;
                resultSet = usertableRepository.doQuery(getGameRequestsAndGameInfoByUserIdAndAccepted, new Object[] {id, bool});
            } else {
                return null;
            }
            return sessionRequestService.populateGameRequestsWithInfo(resultSet, new String[] {"sessionInfo"});
        } else if (info.equals("hostInfo")) {
            if (!filter.isPresent()) {
                resultSet = usertableRepository.doQuery(getGameRequestsAndHostInfoByUserId, new Object[] {id});
            } else if (filter.get().equals("accepted")) {
                bool = value.get().equals("true") ? true : false;
                resultSet = usertableRepository.doQuery(getGameRequestsAndHostInfoByUserIdAndAccepted, new Object[] {id, bool});
            } else {
                return null;
            }
            return sessionRequestService.populateGameRequestsWithInfo(resultSet, new String[] {"hostInfo"});
        } else if (info.equals("hostInfo&sessionInfo")) {
            if (!filter.isPresent()) {
                resultSet = usertableRepository.doQuery(getGameRequestsAndGameInfoAndHostInfoByUserId, new Object[] {id});
            } else if (filter.get().equals("accepted")) {
                bool = value.get().equals("true") ? true : false;
                resultSet = usertableRepository.doQuery(getGameRequestsAndHostInfoAndSessionInfoByUserIdAndAccepted, new Object[] {id, bool});
            } else {
                return null;
            }
            return sessionRequestService.populateGameRequestsWithInfo(resultSet, new String[] {"hostInfo", "sessionInfo"});
        } else {
            if (!filter.isPresent()) {
                resultSet = usertableRepository.doQuery(getRequestsByUser, new Object[] {id});
            } else if (filter.get().equals("accepted")) {
                bool = value.get().equals("true") ? true : false;
                resultSet = usertableRepository.doQuery(getGameRequestsByUserIdAndAccepted, new Object[] {id, bool});
            } else {
                return null;
            }
            return sessionRequestService.populateGameRequestsWithInfo(resultSet, new String[] {});
        }
    }



    public List<Notification> getUserActivity(Integer id, String info) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet;
        if (info.equals("session")) {
            resultSet = usertableRepository.doQuery(getUserActiviyAndUserSession, args);
        } else {
            resultSet = usertableRepository.doQuery(getUserActivity, args);
        }
        return notificationService.populateNotifications(resultSet, 1, info);
    }

    public List<Notification> getUserNotifications(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet;
        resultSet = usertableRepository.doQuery(getUserNotifications, args);
        return notificationService.populateNotifications(resultSet, 1, "");
    }

    public List<RifterSession> getUserAndRifterSession(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getUserAndRifterSessions, args);
        List<RifterSession> rifterSessions = new ArrayList<>();
        while (resultSet.next()) {
            RifterSession rifterSession = rifterSessionService.populateRifterSession(resultSet, 1);
            rifterSessions.add(rifterSession);
        }
        return rifterSessions;
    }


    /**
     *
     * Gets broadcast notifications: relevant notifications from people you follow that aren't necessarily directed
     * specifically at you, thus they have been broadcasted.
     * i.e. a Rifter posts a new game. The activity notification will not be directed at any one individual, but will
     * be broadcast to all his followers.
     * @param id
     * @return
     */
    public List<Notification> getBroadcastNotifications(Integer id, String type) throws SQLException {

        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet;
        if (type.equals("Followers")) {
            resultSet = usertableRepository.doQuery(getBroadcastNotificationsForFollower, args);
        } else {
            resultSet = usertableRepository.doQuery(getBroadcastNotifications, args);
        }
        int i = 1;
        List<Notification> notifications = new ArrayList<>();
        while (resultSet.next()) {
            Notification notification = new Notification();
            notification.setId(resultSet.getInt(1));
            notification.setUserId(resultSet.getInt(2));
            notification.setNotificationType(resultSet.getString(3));
            notification.setNotificationContent(resultSet.getString(4));
            notification.setSessionId(resultSet.getInt(5));
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
            usertable.setGender(resultSet.getBoolean(16));
            usertable.setAuth0Id(resultSet.getString(17));
            notification.setCreatorUsertable(usertable);
            notifications.add(notification);
        }
        return notifications;

    }

    public Boolean createUser(Usertable usertable) {
        return usertableRepository.doInsert(createUser,
                new Object[] {usertable.getFirstName(), usertable.getLastName(),
                        usertable.getRiftTag(), formatAuth0Id(usertable.getAuth0Id())});
    }

    private String formatAuth0Id(String auth0Id) {
        String[] str = auth0Id.split("|");
        return str[1];
    }


}
