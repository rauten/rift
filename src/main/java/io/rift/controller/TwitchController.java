package io.rift.controller;

import io.rift.feature.TwitchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.text.ParseException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class TwitchController {

    @Autowired
    private TwitchService twitchService;

    @RequestMapping(method = RequestMethod.GET, value = "/decode/{jwt}")
    public boolean decodeJWT(@PathVariable String jwt) throws MalformedURLException, ParseException {
        return twitchService.authenticateUser(jwt);
    }

}
