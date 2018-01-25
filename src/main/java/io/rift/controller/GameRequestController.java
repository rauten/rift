package io.rift.controller;


import io.rift.model.GameRequest;
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
    @RequestMapping(method = RequestMethod.GET, value = "/{rifteeId}-{sessionId}")
    public GameRequest getGameRequestByRifteeAndSessionId(@PathVariable Integer rifteeId, @PathVariable Integer sessionId) {
        return gameRequestService.getGameRequestByRifteeAndSessionId(rifteeId, sessionId);
    }


    @GetMapping
    @RequestMapping(method = RequestMethod.GET, value = "/{rifteeId}")
    public List<GameRequest> getGameRequestsByRifteeId(@PathVariable Integer rifteeId) {
        return gameRequestService.getGameRequestsByRifteeId(rifteeId);
    }



}
