package io.rift.controller;


import com.fasterxml.jackson.annotation.JsonView;
import io.rift.model.RifterSession;
import io.rift.model.Views;
import io.rift.service.RifterSessionService;
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
public class RifterSessionController {

    @Autowired
    private RifterSessionService rifterSessionService;


    /**
     *
     * @param id - The Rifter Session id
     * @return - Rifter Session object with info
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/rifterSession/{id}")
    public RifterSession getRifterGameById(@PathVariable Integer id) throws SQLException {
        RifterSession rifterSession = getRifterGameAndHostByGameId(id);
        rifterSession.setPlayers(rifterSessionService.getGamePlayersByGameId(id));
        return rifterSession;
    }

    /**
     *
     * @param id - The Rifter Session id
     * @return - Rifter Session object with info and host Usertable
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/rifterSession/{id}/host")
    public RifterSession getRifterGameAndHostByGameId(@PathVariable Integer id) throws SQLException {
        return rifterSessionService.getRifterGameAndHostByGameId(id);
    }

    /**
     *
     * @param id - The Rifter Session id
     * @return - Rifter Session object with info and all players Usertable
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/rifterSession/{id}/players")
    public RifterSession getRifterGameAndPlayersByGameId(@PathVariable Integer id) throws SQLException {
        RifterSession rifterSession = getRifterGameById(id);
        rifterSession.setPlayers(rifterSessionService.getGamePlayersByGameId(id));
        return rifterSession;
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

    @RequestMapping(method = RequestMethod.GET, value = "/rifterSession/{riftTag}/gamesParticipating")
    public List<RifterSession> getRifteeSessionsByRiftTag(@PathVariable String riftTag) throws SQLException {
        return rifterSessionService.getRifteeSessionsAndRequestByRiftTag(riftTag);
    }

    /*
    @JsonView(Views.InternalRifterGameNotification.class)
    @RequestMapping(method = RequestMethod.GET, value = "/rifterSession/{id}/notification")
    public RifterSession getRifterGameAndNotificationsById(@PathVariable Integer id) {
        return rifterGameService.getRifterGameById(id);
    }
    */

}
