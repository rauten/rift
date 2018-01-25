package io.rift.controller;


import com.fasterxml.jackson.annotation.JsonView;
import io.rift.model.GameRequest;
import io.rift.model.Views;
import io.rift.service.GameRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/request")
public class GameRequestController {

    @Autowired
    private GameRequestService gameRequestService;

    @GetMapping
    @JsonView(Views.Public.class)
    @RequestMapping(method = RequestMethod.GET, value = "/{rifteeId}-{sessionId}")
    public GameRequest getGameRequestByRifteeAndSessionId(@PathVariable Integer rifteeId, @PathVariable Integer sessionId) {
        return gameRequestService.getGameRequestByRifteeAndSessionId(rifteeId, sessionId);
    }


    @GetMapping
    @JsonView(Views.Public.class)
    @RequestMapping(method = RequestMethod.GET, value = "/{rifteeId}")
    public List<GameRequest> getGameRequestsByRifteeId(@PathVariable Integer rifteeId) {
        return gameRequestService.getGameRequestsByRifteeId(rifteeId);
    }



}
