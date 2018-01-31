package io.rift.controller;


import io.rift.service.SessionRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class SessionRequestController {

    @Autowired
    private SessionRequestService sessionRequestService;

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
