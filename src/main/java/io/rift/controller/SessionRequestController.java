package io.rift.controller;


import com.sun.org.apache.xpath.internal.operations.Bool;
import io.rift.model.SessionRequest;
import io.rift.service.SessionRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.beans.IntrospectionException;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class SessionRequestController {

    @Autowired
    private SessionRequestService sessionRequestService;

    @RequestMapping(method = RequestMethod.PUT, value = "/sessionRequest/create")
    public Boolean createSessionRequest(@RequestBody SessionRequest sessionRequest) throws SQLException {
        return sessionRequestService.createSessionRequest(sessionRequest);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/sessionRequest/update")
    public Boolean updateSessionRequest(@RequestBody SessionRequest sessionRequest) throws SQLException, IOException, IntrospectionException, IllegalAccessException, InvocationTargetException {
        return sessionRequestService.updateSessionRequest(sessionRequest);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/sessionRequest/{riftTag}")
    public List<SessionRequest> getSessionRequestsByRiftTag(@PathVariable String riftTag) throws SQLException {
        return sessionRequestService.getSessionRequestByRiftTag(riftTag);
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
