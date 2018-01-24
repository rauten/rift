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
    UsertableService usertableService;

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

    /*
    @RequestMapping(method = RequestMethod.GET, value = "/gamerequest/{id}")
    public GameRequest getUserGameRequest(@PathVariable Integer id) throws SQLException {
        return usertableService.getUserGameRequest(id);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/notification/{id}")
    public ResultSet getUserNotifications(@PathVariable Integer id) throws SQLException {
        ResultSet resultSet = usertableService.getUserNotifications(id);
        return resultSet;
    }
    */

}
