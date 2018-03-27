package io.rift.controller;


import io.rift.model.Usertable;
import io.rift.service.FollowingService;
import io.rift.service.UsertableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@CrossOrigin(origins = "https://go-rift.herokuapp.com")
@RestController
//@RequestMapping("/api")
public class FollowingController {

    @Autowired
    private FollowingService followingService;

    @Autowired
    private UsertableService usertableService;

    @RequestMapping(method = RequestMethod.GET, value = "/api/user/{riftTag}/follow={id}")
    public boolean followUserById(@PathVariable String riftTag, @PathVariable Integer id) throws SQLException, InterruptedException {
        Object[] res = followingService.isFollowing(riftTag, id);
        if (!(boolean)res[0]) {
            return followingService.follow((int)res[1], id);
        }
        return false;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/user/{riftTag}/unfollow={id}")
    public boolean unfollowUserById(@PathVariable String riftTag, @PathVariable Integer id) throws SQLException {
        Object[] res = followingService.isFollowing(riftTag, id);
        if ((boolean)res[0]) {
            return followingService.unfollow((int)res[1], id);
        }
        return false;
    }



}
