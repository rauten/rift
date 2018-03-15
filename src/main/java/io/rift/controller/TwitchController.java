package io.rift.controller;

import io.rift.service.RiotService;
import io.rift.service.TwitchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
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
}
