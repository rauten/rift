package io.rift.controller;


import io.rift.model.Usertable;
import io.rift.service.FollowingService;
import io.rift.service.UsertableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class FollowingController {

    @Autowired
    private FollowingService followingService;

    @Autowired
    private UsertableService usertableService;

    @RequestMapping("/user/{riftTag}/follow={id}")
    public boolean followUserById(@PathVariable String riftTag, @PathVariable Integer id) throws SQLException {
        int followerId = followingService.isFollowing(riftTag, id);
        if (followerId != -1) {
            return followingService.follow(followerId, id);
        }
        return false;
    }



}
