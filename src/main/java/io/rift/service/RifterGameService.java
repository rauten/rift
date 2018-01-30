package io.rift.service;

import io.rift.model.RifterGame;
import io.rift.model.Usertable;
import io.rift.repository.RifterGameRepository;
import io.rift.repository.UsertableRepository;
import org.postgresql.util.PGInterval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class RifterGameService {

    @Autowired
    private UsertableRepository usertableRepository;

    @Autowired
    private UsertableService usertableService;

    private final String getRifterGameById = "getRifterGameById";
    private final String getRifterGameAndHostByGameId = "getRifterGameAndHostByGameId";
    private final String getGamePlayersByGameId = "getGamePlayersByGameId";
    private final String createGame = "createGame";


    public RifterGame getRifterGameById(Integer id) throws SQLException {

        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getRifterGameById, args);
        return populateRifterGame(resultSet);
    }

    public RifterGame getRifterGameAndHostByGameId(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getRifterGameAndHostByGameId, args);
        RifterGame rifterGame = populateRifterGame(resultSet);
        if (rifterGame.getId() != null) {
            Usertable usertable = usertableService.populateUsertable(resultSet, 12);
            rifterGame.setUsertable(usertable);
        }
        return rifterGame;
    }

    public List<Usertable> getGamePlayersByGameId(Integer id) throws SQLException {

        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getGamePlayersByGameId, args);
        List<Usertable> players = new ArrayList<>();
        while (resultSet.next()) {
            Usertable usertable = usertableService.populateUsertable(resultSet, 1);
            players.add(usertable);
        }
        return players;
    }

    public RifterGame populateRifterGame(ResultSet resultSet) throws SQLException {
        RifterGame rifterGame = new RifterGame();
        if (resultSet.next()) {
            rifterGame.setId(resultSet.getInt(1));
            rifterGame.setHostId(resultSet.getInt(2));
            rifterGame.setNumSlots(resultSet.getInt(3));
            rifterGame.setExpirationTime(resultSet.getTimestamp(4));
            rifterGame.setGameCost(resultSet.getDouble(5));
            rifterGame.setMethodOfContact(resultSet.getString(6));
            rifterGame.setGameType(resultSet.getString(7));
            rifterGame.setTitle(resultSet.getString(8));
            rifterGame.setHits(resultSet.getInt(9));
            rifterGame.setGameDuration((PGInterval)resultSet.getObject(10));
            rifterGame.setGameTime(resultSet.getTimestamp(11));
        }
        return rifterGame;
    }

    public boolean createGame(RifterGame rifterGame) {
        return usertableRepository.doInsert(createGame,
                new Object[] {rifterGame.getHostId(), rifterGame.getNumSlots(),
                        rifterGame.getExpirationTime(), rifterGame.getGameCost(), rifterGame.getMethodOfContact(),
                        rifterGame.getGameType(), rifterGame.getTitle(), rifterGame.getHits(),
                        rifterGame.getGameDuration(), rifterGame.getGameTime()});
    }



    /*
    public RifterGame getRifterGameById(Integer id) {
        return rifterGameRepository.getRifterGameById(id);
    }
    */

}
