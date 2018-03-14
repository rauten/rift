package io.rift.controller;

import io.rift.feature.TwitchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class TwitchController {

    @Autowired
    private TwitchService twitchService;

    @RequestMapping(method = RequestMethod.GET, value = "/decode/{jwt}")
    public boolean decodeJWT(@PathVariable String jwt) {
        return twitchService.authenticateUser(jwt);
    }

}
