package io.rift.service;


import io.rift.config.PollingConfig;
import io.rift.model.Notification;
import io.rift.model.Usertable;
import io.rift.repository.RiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.concurrent.LinkedBlockingQueue;

@Service
public class FollowingService {

    @Autowired
    private RiftRepository riftRepository;

    @Autowired
    private UsertableService usertableService;

    @Autowired
    public PollingConfig pollingConfig;

    private final String isFollowing = "isFollowing";
    private final String follow = "follow";
    private final String removeFollowing = "removeFollowing";

    /**
     *
     * @param followerRiftTag - The rift tag of the person who is following
     * @param followingId - The id of the person who is being followed
     * @return - Object[]
     *          First arg is boolean - whether follow relation exists
     *          Second arg is int - follower's id
     * @throws SQLException
     */
    public Object[] isFollowing(String followerRiftTag, Integer followingId) throws SQLException {
        Object[] args = new Object[2];
        args[0] = followerRiftTag;
        args[1] = followingId;
        Object[] res = new Object[2];
        ResultSet resultSet = riftRepository.doQuery(isFollowing, args);
        if (resultSet.next()) {
            res[0] = true;
            res[1] = resultSet.getInt(1);
            resultSet.close();
            return res;
        }
        Usertable usertable = usertableService.getUserByRiftTag(followerRiftTag);
        res[0] = false;
        res[1] = usertable.getId();
        resultSet.close();
        return res;
    }

    public boolean follow(int followerId, int followingId) throws SQLException, InterruptedException {
        Object[] args = new Object[3];
        args[0] = followerId;
        args[1] = followingId;
        args[2] = true;
        boolean bool = riftRepository.doInsert(follow, args);
        if (bool) {
            Timestamp timestamp = new Timestamp(1);
            timestamp.setTime(timestamp.getNanos());
            Notification notification = new Notification();
            notification.setId(null);
            notification.setUserId(followingId);
            notification.setNotificationType(2);
            notification.setNotificationContent(null);
            notification.setSessionId(null);
            notification.setCreatedTime(timestamp);
            notification.setCreatorId(followerId);
            pollingConfig.theQueue().put(notification);
        }
        return bool;
    }

    public boolean unfollow(int followerId, int followingId) throws SQLException {
        Object[] args = new Object[2];
        args[0] = followerId;
        args[1] = followingId;
        return riftRepository.doDelete(removeFollowing, args);
    }

    /*
    public Following getFollowingByFollowerIdAndFollowingId(Integer followerId, Integer followingId) {
        return followingRepository.getFollowingByFollowerIdAndFollowingId(followerId, followingId);
    }
    */


}
