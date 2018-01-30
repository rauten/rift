package io.rift.controller;


import com.fasterxml.jackson.annotation.JsonView;
import io.rift.model.RifterGame;
import io.rift.model.Views;
import io.rift.service.RifterGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class RifterGameController {

    @Autowired
    private RifterGameService rifterGameService;


    @RequestMapping(method = RequestMethod.GET, value = "/rifterGame/{id}")
    public RifterGame getRifterGameById(@PathVariable Integer id) throws SQLException {
        return rifterGameService.getRifterGameById(id);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/rifterGame/{id}/host")
    public RifterGame getRifterGameAndHostByGameId(@PathVariable Integer id) throws SQLException {
        return rifterGameService.getRifterGameAndHostByGameId(id);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/rifterGame/{id}/players")
    public RifterGame getRifterGameAndPlayersByGameId(@PathVariable Integer id) throws SQLException {
        RifterGame rifterGame = getRifterGameById(id);
        rifterGame.setPlayers(rifterGameService.getGamePlayersByGameId(id));
        return rifterGame;
    }

    /**
     * Example valid iput:
     *
     * {
         "hostId": 3,
         "numSlots": 5,
         "expirationTime": 1516657232041,
         "gameCost": 50,
         "methodOfContact": "Email",
         "gameType": "Coaching",
         "gameDuration": {
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
         "gameTime": 1517263402730
     }
     *
     * @param rifterGame
     * @return
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.PUT, value = "/rifterGame/createGame")
    Boolean createGame(@RequestBody RifterGame rifterGame) throws SQLException {
        return rifterGameService.createGame(rifterGame);
    }

    /*
    @JsonView(Views.InternalRifterGameNotification.class)
    @RequestMapping(method = RequestMethod.GET, value = "/rifterGame/{id}/notification")
    public RifterGame getRifterGameAndNotificationsById(@PathVariable Integer id) {
        return rifterGameService.getRifterGameById(id);
    }
    */

}
