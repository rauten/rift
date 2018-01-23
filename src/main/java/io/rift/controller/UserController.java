package io.rift.controller;


import io.rift.model.GameRequest;
import io.rift.model.Usertable;
import io.rift.service.UsertableService;
import org.bouncycastle.cert.ocsp.Req;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;
import java.sql.SQLException;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UsertableService usertableService;

    @GetMapping
    @RequestMapping(method=RequestMethod.GET, value="/{id}")
    public Usertable getUser(@PathVariable Integer id) {
        return usertableService.getUserById(id);
    }

    @GetMapping
    @RequestMapping(method = RequestMethod.GET, value = "/gamerequest/{id}")
    public GameRequest getUserGameRequest(@PathVariable Integer id) throws SQLException {
        return usertableService.getUserGameRequest(id);
    }

    @GetMapping
    @RequestMapping(method = RequestMethod.GET, value = "/notification/{id}")
    public ResultSet getUserNotifications(@PathVariable Integer id) throws SQLException {
        ResultSet resultSet = usertableService.getUserNotifications(id);
        return resultSet;
    }

}
