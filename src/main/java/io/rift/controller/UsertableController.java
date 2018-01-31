package io.rift.controller;


import com.fasterxml.jackson.annotation.JsonView;
import io.rift.model.Notification;
import io.rift.model.Usertable;
import io.rift.model.Views;
import io.rift.service.UsertableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UsertableController {

    @Autowired
    private UsertableService usertableService;


    /**
     * The result of a Usertable NATURAL JOIN Notification query
     * @param id The user id we want to get information for
     * @return A User object with notifications
     */

    @JsonView(Views.InternalUsertableUser.class)
    @RequestMapping(method=RequestMethod.GET, value="/user/direct_notifications/{id}")
    public Usertable getUserAndDirectNotifications(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowing(id));
        usertable.setNotificationList(usertableService.getUserNotifications(id));
        return usertable;
    }

    /**
     * The result of a Usertable NATURAL JOIN Notification query (looking for activity)
     * @param id The user id we want to get activity information for
     * @return A User object with activities
     */

    //@JsonView(Views.InternalUsertableCreator.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/activity/{id}")
    public Usertable getUserAndActivity(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowing(id));
        List<Notification> userActivities = usertableService.getUserActivity(id);
        usertable.setCreatorActivityList(userActivities);
        return usertable;
    }

    /**
     * Just data from the usertable on query by id
     * @param id The user id we want to get information for
     * @return A User object
     */
    //@JsonView(Views.Public.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}")
    public Usertable getUser(@PathVariable Integer id) throws SQLException {
        return usertableService.getUserById(id);
    }


    @JsonView(Views.InternalUsertableFollowingFollowing.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/followings")
    public Usertable getUserAndFollowings(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowing(id));
        usertable.setFollowings(usertableService.getFollowingsById(id));
        return usertable;
    }


    @JsonView(Views.InternalUsertableFollowingFollower.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/followers")
    public Usertable getUserAndFollowers(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowing(id));
        usertable.setFollowers(usertableService.getFollowersById(id));
        return usertable;
    }


    @JsonView(Views.InternalUsertableFollowingFollowerAndFollowing.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/followingsandfollowers")
    public Usertable getUserAndFollowersAndFollowings(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowing(id));
        usertable.setFollowers(usertableService.getFollowersById(id));
        usertable.setFollowings(usertableService.getFollowingsById(id));
        return usertable;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/broadcast_notifications")
    public Usertable getUserAndBroadcastNotifications(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setNumberFollowing(usertableService.getNumberFollowing(id));
        usertable.setBroadcastNotifications(usertableService.getBroadcastNotifications(id));
        return usertable;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/notifications")
    public Usertable getUserAndNotifications(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setNumberFollowing(usertableService.getNumberFollowing(id));
        usertable.setBroadcastNotifications(usertableService.getBroadcastNotifications(id));
        usertable.setNotificationList(usertableService.getUserNotifications(id));
        return usertable;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/rifterSessions")
    public Usertable getUserAndRifterSessions(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setRifterSessions(usertableService.getUserAndRifterSession(id));
        return usertable;
    }

    /**
     *
     * @param id - The user id
     * @return - Usertable with SessionRequests
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/rifteeSessions")
    public Usertable getUserAndRifteeSessions(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setRifteeSessions(usertableService.getGameRequestsByUserId(id));
        return usertable;
    }

    /**
     *
     * @param id - The user id
     * @return - Usertable with SessionRequests/Session info
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/rifteeSessions/gameInfo")
    public Usertable getUserAndRifteeSessionsAndGameInfo(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setRifteeSessions(usertableService.getGameRequestsAndGameInfoByUserId(id));
        return usertable;
    }

    /**
     *
     * @param id - The user id
     * @param filter The filter param
     *               Options: accepted
     * @param value The filter value
     *              Options for accepted: true/false
     * @return - Usertable with SessionRequests/Session info
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/rifteeSessions/filterBy:{filter}={value}/gameInfo")
    public Usertable getUserAndRifteeSessions(@PathVariable Integer id, @PathVariable String filter, @PathVariable String value) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setRifteeSessions(usertableService.getGameRequestsAndGameInfoByUserIdAndFilter(id, filter, value));
        return usertable;
    }


    /**
     * Valid input:
     * {
         "firstName":"Steph",
         "lastName":"Curry",
         "gender":true,
         "riftTag":"chefcurry"
     }
     *
     * Can modify what input we want
     * @param usertable - Usertable instance we wish to put in the database
     * @return boolean - Success or not
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.PUT, value = "/user/createUser")
    Boolean createUser(@RequestBody Usertable usertable) throws SQLException {
        return usertableService.createUser(usertable);
    }


    /*
    @JsonView(Views.Public.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/filterBy=firstName/{firstName}")
    public Usertable findUserByFirstName(@PathVariable String firstName) {
        return usertableService.getUserByFirstName(firstName);
    }

    @JsonView(Views.InternalUsertableRG.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/filterBy=firstName/{firstName}/rifterSession")
    public Usertable findUserAndGamesByFirstName(@PathVariable String firstName) {
        return usertableService.getUserByFirstName(firstName);
    }

    @JsonView(Views.ProfilePageView.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/profile/{id}")
    public Usertable getUserProfilePage(@PathVariable Integer id) {
        Usertable usertable = usertableService.getUserById(id);
        List<Notification> notifications = usertableService.getBroadcastNotifications(id);
        usertable.setBroadcoastNotification(notifications);
        //usertable.setBroadcastList(notifications);
        return usertable;
    }

    //following
    //followers
    //rifter games
    */



}
