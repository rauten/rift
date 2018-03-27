package io.rift.controller;


import io.rift.model.RifterSession;
import io.rift.service.RiotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "https://fast-depths-16506.herokuapp.com/")
@RestController
@RequestMapping("/api")
public class RiotController {
    @Autowired
    private RiotService riotService;

    @RequestMapping(method = RequestMethod.GET, value = "/riotSummoner/{summonerName}")
    public Map<String, String> getRifterSessionById(@PathVariable String summonerName) throws SQLException, IOException {
        String content = riotService.getSummonerInfo(summonerName);
        Map<String, String> result = new HashMap<>();
        result.put("content", content);
        return result;
    }

}
