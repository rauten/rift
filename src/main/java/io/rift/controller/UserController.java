package io.rift.controller;


import io.rift.model.User;
import io.rift.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping(method=RequestMethod.GET, value="/user/{id}")
    public User getUser(@PathVariable Integer id) {
        return userService.getUser(id);
    }


}
