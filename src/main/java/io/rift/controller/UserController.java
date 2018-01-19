package io.rift.controller;


import io.rift.model.Usertable;
import io.rift.service.UsertableService;
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
    @RequestMapping(method=RequestMethod.GET, value="/user/{id}")
    public Usertable getUser(@PathVariable Integer id) throws SQLException {
        return usertableService.getUserById(id);
    }

    @PostMapping("/post")
    public String helloPost(@RequestBody final String hello) {
        return hello;
    }

    @PutMapping("/put")
    public String helloPut(@RequestBody final String hello) {
        return hello;
    }



}
