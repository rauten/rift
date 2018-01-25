package io.rift.controller;


import com.fasterxml.jackson.annotation.JsonView;
import io.rift.model.GameRequest;
import io.rift.model.Usertable;
import io.rift.model.Views;
import io.rift.service.UsertableService;
import org.bouncycastle.cert.ocsp.Req;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;
import java.sql.SQLException;

@RestController
public class UsertableController {

    @Autowired
    private UsertableService usertableService;

    /**
     * The result of a Usertable NATURAL JOIN Notification query
     * @param id The user id we want to get information for
     * @return A User object with notifications
     */
    @JsonView(Views.InternalUsertableUser.class)
    @RequestMapping(method=RequestMethod.GET, value="/user/notifications/{id}")
    public Usertable getUserAndNotifications(@PathVariable Integer id) {
        return usertableService.getUserById(id);
    }

    /**
     * The result of a Usertable NATURAL JOIN Notification query (looking for activity)
     * @param id The user id we want to get activity information for
     * @return A User object with activities
     */
    @JsonView(Views.InternalUsertableCreator.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/activity/{id}")
    public Usertable getUserAndActivity(@PathVariable Integer id) {
        return usertableService.getUserById(id);
    }

    /**
     * Just data from the usertable on query by id
     * @param id The user id we want to get information for
     * @return A User object
     */
    @JsonView(Views.Public.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}")
    public Usertable getUser(@PathVariable Integer id) { return usertableService.getUserById(id); }

    @JsonView(Views.InternalUsertableFollowingFollowing.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/followings")
    public Usertable getUserAndFollowings(@PathVariable Integer id) {
        return usertableService.getUserById(id);
    }

    @JsonView(Views.InternalUsertableFollowingFollower.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/followers")
    public Usertable getUserAndFollowers(@PathVariable Integer id) {
        return usertableService.getUserById(id);
    }

    @JsonView(Views.InternalUsertableFollowingFollowerAndFollowing.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/followingsandfollowers")
    public Usertable getUserAndFollowersAndFollowings(@PathVariable Integer id) {
        return usertableService.getUserById(id);
    }


    @JsonView(Views.Public.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/filterBy=firstName/{firstName}")
    public Usertable findUserByFirstName(@PathVariable String firstName) {
        return usertableService.getUserByFirstName(firstName);
    }

    @JsonView(Views.InternalUsertableRG.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/filterBy=firstName/{firstName}/rifterGame")
    public Usertable findUserAndGamesByFirstName(@PathVariable String firstName) {
        return usertableService.getUserByFirstName(firstName);
    }

    @JsonView(Views.ProfilePageView.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/profile/{id}")
    public Usertable getUserProfilePage(@PathVariable Integer id) {
        return usertableService.getUserById(id);
    }

}
