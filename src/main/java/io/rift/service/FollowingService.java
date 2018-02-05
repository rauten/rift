package io.rift.service;


import io.rift.model.Following;
import io.rift.model.Usertable;
import io.rift.repository.FollowingRepository;
import io.rift.repository.UsertableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Service
public class FollowingService {

    @Autowired
    private UsertableRepository usertableRepository;

    @Autowired
    private UsertableService usertableService;

    private final String isFollowing = "isFollowing";
    private final String follow = "follow";

    /**
     *
     * @param followerRiftTag - The rift tag of the person who is following
     * @param followingId - The id of the person who is being followed
     * @return
     * @throws SQLException
     */
    public int isFollowing(String followerRiftTag, Integer followingId) throws SQLException {
        Object[] args = new Object[2];
        args[0] = followerRiftTag;
        args[1] = followingId;
        ResultSet resultSet = usertableRepository.doQuery(isFollowing, args);
        if (resultSet.next()) {
            return -1;
        }
        Usertable usertable = usertableService.getUserByRiftTag(followerRiftTag);
        return usertable.getId();
    }

    public boolean follow(int followerId, int followingId) throws SQLException {
        Object[] args = new Object[3];
        args[0] = followerId;
        args[1] = followingId;
        args[2] = true;
        return usertableRepository.doInsert(follow, args);
    }

    /*
    public Following getFollowingByFollowerIdAndFollowingId(Integer followerId, Integer followingId) {
        return followingRepository.getFollowingByFollowerIdAndFollowingId(followerId, followingId);
    }
    */


}
