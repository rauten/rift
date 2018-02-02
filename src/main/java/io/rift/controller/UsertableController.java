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
import java.util.Map;
import java.util.Optional;

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
    @RequestMapping(method = RequestMethod.GET, value = "/user/activity/{id}")
    public Usertable getUserAndActivity(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowing(id));
        List<Notification> userActivities = usertableService.getUserActivity(id, "");
        usertable.setCreatorActivityList(userActivities);
        return usertable;
    }

    /**
     * Just data from the usertable on query by id
     * @param id The user id we want to get information for
     * @return A User object
     */
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}")
    public Usertable getUser(@PathVariable Integer id) throws SQLException {
        return usertableService.getUserById(id);
    }

    /**
     *
     * @param id - The user id
     * @return - Usertable object with info and user's followings
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/followings")
    public Usertable getUserAndFollowings(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowing(id));
        usertable.setFollowings(usertableService.getFollowingsById(id));
        return usertable;
    }

    /**
     *
     * @param id - The user id
     * @return - Usertable object with info and user's Followers objects
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/followers")
    public Usertable getUserAndFollowers(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowing(id));
        usertable.setFollowers(usertableService.getFollowersById(id));
        return usertable;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/followingsandfollowers/userInfo")
    public Usertable getUserAndFollowingsAndFollowersAndInfo(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowing(id));
        usertable.setFollowers(usertableService.getFollowersAndInfoById(id));
        usertable.setFollowings(usertableService.getFollowingsAndInfoById(id));
        return usertable;
    }

    /**
     *
     * @param id - The user id
     * @return - Usertable object with info and user's Following/Follower objects
     * @throws SQLException
     */
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

    /**
     *
     * @param id - The user id
     * @return - Usertable object with info and user's Broadcast Notification objects
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/broadcast_notifications")
    public Usertable getUserAndBroadcastNotifications(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setNumberFollowing(usertableService.getNumberFollowing(id));
        usertable.setBroadcastNotificationList(usertableService.getBroadcastNotifications(id, "User"));
        return usertable;
    }

    /**
     *
     * @param id - The user id
     * @return - Usertable object with info and user's Notification objects
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/notifications")
    public Usertable getUserAndNotifications(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setNumberFollowing(usertableService.getNumberFollowing(id));
        usertable.setBroadcastNotificationList(usertableService.getBroadcastNotifications(id, "User"));
        usertable.setNotificationList(usertableService.getUserNotifications(id));
        return usertable;
    }

    /**
     *
     * @param id - The user id
     * @return - Usertable object with info and user's Rifter Session objects
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/rifterSessions")
    public Usertable getUserAndRifterSessions(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setRifterSessions(usertableService.getUserAndRifterSession(id));
        return usertable;
    }

    @RequestMapping(method = RequestMethod.GET, value = {"/user/{id}/rifteeSessions/{info}", "/user/{id}/rifteeSessions"})
    public Usertable getUserAndRifteeSessionsAndInfo(@PathVariable Integer id, @PathVariable Optional<String> info) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        if (info.isPresent()) {
            usertable.setRifteeSessions(usertableService.getGameRequestsAndInfoByUserId(id, info.get(), Optional.empty(), Optional.empty()));
        } else {
            usertable.setRifteeSessions(usertableService.getGameRequestsAndInfoByUserId(id, "", Optional.empty(), Optional.empty()));
        }
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
    @RequestMapping(method = RequestMethod.GET, value = {"/user/{id}/rifteeSessions/filterBy:{filter}={value}/{info}", "/user/{id}/rifteeSessions/filterBy:{filter}={value}"})
    public Usertable getUserAndRifteeSessions(@PathVariable Integer id, @PathVariable String filter, @PathVariable String value, @PathVariable Optional<String> info) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        if (info.isPresent()) {
            usertable.setRifteeSessions(usertableService.getGameRequestsAndInfoByUserId(id, info.get(), Optional.of(filter), Optional.of(value)));
        } else {
            usertable.setRifteeSessions(usertableService.getGameRequestsAndInfoByUserId(id, "", Optional.of(filter), Optional.of(value)));
        }
        return usertable;
    }

    @JsonView(Views.ProfilePageView.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/profilePage")
    public Usertable getUserProfilePage(@PathVariable Integer id) throws SQLException{
        Usertable usertable = usertableService.getUserById(id);
        usertable.setRifteeSessions(usertableService.getGameRequestsAndInfoByUserId(id, "hostInfo&sessionInfo", Optional.empty(), Optional.empty()));
        usertable.setFollowers(usertableService.getFollowersAndInfoById(id));
        usertable.setFollowings(usertableService.getFollowingsAndInfoById(id));
        usertable.setNotificationList(usertableService.getUserNotifications(id));
        usertable.setBroadcastNotificationList(usertableService.getBroadcastNotifications(id, "Followers"));
        usertable.setCreatorActivityList(usertableService.getUserActivity(id, "session"));
        usertable.setNumberFollowing(usertableService.getNumberFollowing(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setRifterSessions(usertableService.getUserAndRifterSession(id));
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
    public Boolean createUser(@RequestBody Usertable usertable) throws SQLException {
        return usertableService.createUser(usertable);
    }




}
