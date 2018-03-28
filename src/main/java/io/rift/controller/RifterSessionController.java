package io.rift.controller;


import com.fasterxml.jackson.annotation.JsonView;
import io.rift.feature.TwitchService;
import io.rift.model.RifterSession;
import io.rift.model.Views;
import io.rift.service.RifterSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletResponse;
import java.beans.IntrospectionException;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class RifterSessionController {

    @Autowired
    private RifterSessionService rifterSessionService;

    @Autowired
    private TwitchService twitchService;

    /**
     *
     * @param id - The Rifter Session id
     * @return - Rifter Session object with info
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/rifterSession/{id}")
    public RifterSession getRifterSessionById(@PathVariable Integer id) throws SQLException {
        RifterSession rifterSession = getRifterSessionAndHostBySessionId(id);
        rifterSession.setPlayers(rifterSessionService.getSessionPlayersBySessionId(id));
        return rifterSession;
    }

    /**
     *
     * @param id - The Rifter Session id
     * @return - Rifter Session object with info and host Usertable
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/rifterSession/{id}/host")
    public RifterSession getRifterSessionAndHostBySessionId(@PathVariable Integer id) throws SQLException {
        return rifterSessionService.getRifterSessionAndHostBySessionId(id);
    }

    @JsonView(Views.RifteeSessions.class)
    @RequestMapping(method = RequestMethod.GET, value = "/rifterSession/{riftTag}/sessionsParticipating")
    public List<RifterSession> getRifteeSessionsByRiftTag(@PathVariable String riftTag) throws SQLException {
        return rifterSessionService.getRifteeSessionsAndHostInfoByRiftTag(riftTag);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/rifterSession/{riftTag}/rifterAndRifteeSessions")
    public List<RifterSession> getRifterAndRifteeSessionsByRiftTag(@PathVariable String riftTag) throws SQLException {
        return rifterSessionService.getRifterAndRifteeSessionsByRiftTag(riftTag);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/rifterSession/delete/{sessionId}")
    public boolean deleteRequest(@PathVariable Integer sessionId) throws SQLException {
        return rifterSessionService.deleteSession(sessionId);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/rifterSession/{gameAccountId}/gameAccountId")
    public List<RifterSession> getRifterSessionsByGameAccount(@PathVariable Integer gameAccountId) throws SQLException {
        return rifterSessionService.getRifterSessionsByGameAccount(gameAccountId);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/rifterSession/{gameAccountId}/deleteAndUpdate")
    public boolean deleteAndUpdateGameAccount(@PathVariable Integer gameAccountId, @RequestBody Map<Integer, Integer> newGameAccounts) {
        return rifterSessionService.deleteAndUpdateGameAccount(gameAccountId, newGameAccounts);
    }




    /**
     * Example valid iput:
     *
     * {
         "hostId": 3,
         "numSlots": 5,
         "expirationTime": 1516657232041,
         "sessionCost": 50,
         "methodOfContact": "Email",
         "sessionType": "Coaching",
         "sessionDuration": {
            "type": "interval",
            "value": "0 years 0 mons 0 days 1 hours 0 mins 0.00 secs",
            "years": 0,
            "months": 0,
            "days": 0,
            "hours": 1,
            "minutes": 0,
            "seconds": 0
         },
         "title": "Great Game",
         "hits": 10,
         "sessionTime": 1517263402730
     }
     *
     * @param rifterSession
     * @return
     * @throws SQLException
     */
    @JsonView(Views.CreateGame.class)
    @RequestMapping(method = RequestMethod.PUT, value = "/rifterSession/createGame")
    public Boolean createGame(@RequestBody RifterSession rifterSession) throws SQLException {
        return rifterSessionService.createGame(rifterSession);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/rifterSession/update")
    public Boolean updateSession(@RequestBody RifterSession rifterSession) throws SQLException, IOException, IntrospectionException, IllegalAccessException, InvocationTargetException {
        return rifterSessionService.updateRifterSession(rifterSession);
    }


}
