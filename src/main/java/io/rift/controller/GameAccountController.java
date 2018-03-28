package io.rift.controller;

import io.rift.model.GameAccount;
import io.rift.service.GameAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class GameAccountController {

    @Autowired
    private GameAccountService gameAccountService;


    /**
     *
     * @param id
     * @param info
     * @return - A GameAccount object with a specified serial id (must know id number)
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/gameaccount/{id}/info={info}")
    public GameAccount getGameAccountById(@PathVariable Integer id, @PathVariable String info) throws SQLException {
        return gameAccountService.getGameAccountById(id, info);
    }

    /**
     *
     * @param usertableId
     * @param gameId
     * @param ign
     * @param info
     * @return - A GameAccount object with a specified usertableId, gameId, and ign
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/gameaccount/usertableId/{usertableId}/gameId/{gameId}/ign/{ign}/info={info}")
    public GameAccount getGameAccountByAttributes(@PathVariable Integer usertableId, @PathVariable Integer gameId,
                                                  @PathVariable String ign, @PathVariable String info) throws SQLException {
        return gameAccountService.getGameAccountByAttributes(usertableId, gameId, ign, info);
    }


    /**
     *
     * Sample Endpoints: GET /api/gameaccount/usertableId/78/gameId/1/info=game
     *                   GET /api/gameaccount/usertableId/80/gameId/2/info=
     * 
     *
     * @param usertableId
     * @param gameId
     * @param info
     * @return - Gets a list of GameAccounts that have a specified usertableId and gameId
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/gameaccount/usertableId/{usertableId}/gameId/{gameId}")
    public List<GameAccount> getGameAccountsByUsertableIdAndGameId(@PathVariable Integer usertableId, @PathVariable Integer gameId) throws SQLException {

        return gameAccountService.getGameAccountsByUsertableIdAndGameId(usertableId, gameId, "game");

    }

    /**
     * Use this endpoint to get all gameaccounts for a given rifter
     * @param usertableId
     * @return - Returns list of GameAccount objects that have a specified usertableId
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/gameaccount/usertableId/{usertableId}/info")
    public List<GameAccount> getGameAccountByUsertableId(@PathVariable Integer usertableId) throws SQLException {
        return gameAccountService.getGameAccountsByUsertableId(usertableId, "game");
    }


    /**
     *
     * @param gameId
     * @param info
     * @return - Returns list of GameAccount objects that have a specified gameId
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/gameaccount/gameId/{gameId}/info={info}")
    public List<GameAccount> getGameAccountByGameId(@PathVariable Integer gameId, @PathVariable String info) throws SQLException {
        return gameAccountService.getGameAccountsByGameId(gameId, info);
    }

    /**
     *
     * @param ign
     * @param info
     * @return - Returns list of GameAccount objects that have a specified ign
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/gameaccount/ign/{ign}info={info}")
    public List<GameAccount> getGameAccountByIgn(@PathVariable String ign, @PathVariable String info) throws SQLException {
        return gameAccountService.getGameAccountsByIgn(ign, info);
    }

    /**
     * Example valid field
     *
     * {
     *     "usertableId" : 78,
     *     "gameId" : 2,
     *     "ign" : "scarra"
     * }
     * @param gameAccount - Must include usertable_id, game_id, and ign fields
     * @return
     */
    @RequestMapping(method = RequestMethod.PUT, value = "/gameaccount/create")
    public boolean createGameAccount(@RequestBody GameAccount gameAccount) {
        return gameAccountService.createGameAccount(gameAccount);
    }

    /**
     * Example valid field
     *
     * {
     *     "id" : 45,
     *     "ign" : "rauten3"
     * }
     *
     * @param gameAccount - Must have id and ign fields. Everything else can be set to null
     * @return
     */
    @RequestMapping(method = RequestMethod.PUT, value = "/gameaccount/update")
    public boolean updateGameAccountById(@RequestBody GameAccount gameAccount) {
        return gameAccountService.updateGameAccountById(gameAccount);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/gameaccount/delete")
    public boolean deleteGameAccount(@RequestBody GameAccount gameAccount) {
        return gameAccountService.deleteAccountById(gameAccount.getId());
    }
}
