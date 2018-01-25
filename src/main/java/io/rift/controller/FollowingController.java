package io.rift.controller;


import io.rift.service.FollowingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FollowingController {

    @Autowired
    private FollowingService followingService;



}
