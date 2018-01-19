package io.rift.controller;


import io.rift.model.GameRequest;
import io.rift.service.GameRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/request")
public class GameRequestController {

    @Autowired
    GameRequestService gameRequestService;

    @GetMapping
    @RequestMapping(method = RequestMethod.GET, value = "/{rifteeId}-{sessionId}")
    public GameRequest getGameRequestByRifteeAndSessionId(@PathVariable Integer rifteeId, @PathVariable Integer sessionId) {
        return gameRequestService.getGameRequestByRifteeAndSessionId(rifteeId, sessionId);
    }

    @GetMapping
    @RequestMapping(method = RequestMethod.GET, value = "/{rifteeId}")
    public GameRequest getGameRequestByRifteeId(@PathVariable Integer rifteeId) {
        return gameRequestService.getGameRequestByRifteeId(rifteeId);
    }



}
