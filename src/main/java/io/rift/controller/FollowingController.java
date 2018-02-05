package io.rift.controller;


import io.rift.model.Usertable;
import io.rift.service.FollowingService;
import io.rift.service.UsertableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class FollowingController {

    @Autowired
    private FollowingService followingService;

    @Autowired
    private UsertableService usertableService;

    @RequestMapping(method = RequestMethod.GET, value = "/user/{riftTag}/follow={id}")
    public boolean followUserById(@PathVariable String riftTag, @PathVariable Integer id) throws SQLException {
        int followerId = followingService.isFollowing(riftTag, id);
        if (followerId != -1) {
            return followingService.follow(followerId, id);
        }
        return false;
    }



}
