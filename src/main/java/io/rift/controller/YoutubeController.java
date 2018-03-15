package io.rift.controller;

import io.rift.feature.YoutubeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class YoutubeController {

    @Autowired
    private YoutubeService youtubeService;

    @RequestMapping(method = RequestMethod.GET, value = "/verifyYoutube/{code}")
    public Map<String, String> getYoutubeCode(@PathVariable String code) throws IOException {
        String content = youtubeService.getYoutubeAccessCode(code);
        Map<String, String> result = new HashMap<>();
        result.put("content", content);
        return result;
    }

}
