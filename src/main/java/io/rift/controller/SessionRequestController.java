package io.rift.controller;


import io.rift.model.SessionRequest;
import io.rift.service.SessionRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class SessionRequestController {

    @Autowired
    private SessionRequestService sessionRequestService;

    @RequestMapping(method = RequestMethod.PUT, value = "sessionRequest/create")
    public Boolean createSessionRequest(@RequestBody SessionRequest sessionRequest) throws SQLException {
        return sessionRequestService.createSessionRequest(sessionRequest);
    }

    /*
    @GetMapping
    @JsonView(Views.Public.class)
    @RequestMapping(method = RequestMethod.GET, value = "/{rifteeId}-{sessionId}")
    public SessionRequest getGameRequestByRifteeAndSessionId(@PathVariable Integer rifteeId, @PathVariable Integer sessionId) {
        return gameRequestService.getGameRequestByRifteeAndSessionId(rifteeId, sessionId);
    }


    @GetMapping
    @JsonView(Views.Public.class)
    @RequestMapping(method = RequestMethod.GET, value = "/{rifteeId}")
    public List<SessionRequest> getGameRequestsByRifteeId(@PathVariable Integer rifteeId) {
        return gameRequestService.getGameRequestsByRifteeId(rifteeId);
    }
    */



}
