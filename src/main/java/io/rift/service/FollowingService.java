package io.rift.service;


import io.rift.model.Following;
import io.rift.repository.FollowingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FollowingService {

    @Autowired
    private FollowingRepository followingRepository;

    /*
    public Following getFollowingByFollowerIdAndFollowingId(Integer followerId, Integer followingId) {
        return followingRepository.getFollowingByFollowerIdAndFollowingId(followerId, followingId);
    }
    */


}
