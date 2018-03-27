package io.rift.controller;

import io.rift.feature.TwitchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "https://fast-depths-16506.herokuapp.com/")
@RestController
@RequestMapping("/api")
public class TwitchController {
    @Autowired
    private TwitchService twitchService;

    @RequestMapping(method = RequestMethod.GET, value = "/verifyTwitch/{code}")
    public Map<String, String> getTwitchCode(@PathVariable String code) throws SQLException, IOException {
        String content = twitchService.getTwitchCode(code);
        Map<String, String> result = new HashMap<>();
        result.put("content", content);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/decode/{jwt}")
    public Map<String, String> decodeJWT(@PathVariable String jwt) throws MalformedURLException, ParseException {
        Map<String, String> result = new HashMap<>();
        result.put("username", twitchService.authenticateUser(jwt));
        return result;
    }
}
