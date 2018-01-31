package io.rift.service;

import io.rift.model.RifterSession;
import io.rift.model.Usertable;
import io.rift.repository.UsertableRepository;
import org.postgresql.util.PGInterval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class RifterSessionService {

    @Autowired
    private UsertableRepository usertableRepository;

    @Autowired
    private UsertableService usertableService;

    private final String getRifterGameById = "getRifterGameById";
    private final String getRifterGameAndHostByGameId = "getRifterGameAndHostByGameId";
    private final String getGamePlayersByGameId = "getGamePlayersByGameId";
    private final String createGame = "createGame";


    public RifterSession getRifterGameById(Integer id) throws SQLException {

        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getRifterGameById, args);
        if (resultSet.next()) {
            return populateRifterGame(resultSet);
        }
        return null;
    }

    public RifterSession getRifterGameAndHostByGameId(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getRifterGameAndHostByGameId, args);
        if (resultSet.next()) {
            RifterSession rifterSession = populateRifterGame(resultSet);
            if (rifterSession.getId() != null) {
                Usertable usertable = usertableService.populateUsertable(resultSet, 12);
                rifterSession.setUsertable(usertable);
            }
            return rifterSession;
        }
        return null;
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

    public RifterSession populateRifterGame(ResultSet resultSet) throws SQLException {
        RifterSession rifterSession = new RifterSession();
        rifterSession.setId(resultSet.getInt(1));
        rifterSession.setHostId(resultSet.getInt(2));
        rifterSession.setNumSlots(resultSet.getInt(3));
        rifterSession.setExpirationTime(resultSet.getTimestamp(4));
        rifterSession.setGameCost(resultSet.getDouble(5));
        rifterSession.setMethodOfContact(resultSet.getString(6));
        rifterSession.setGameType(resultSet.getString(7));
        rifterSession.setTitle(resultSet.getString(8));
        rifterSession.setHits(resultSet.getInt(9));
        rifterSession.setGameDuration((PGInterval)resultSet.getObject(10));
        rifterSession.setGameTime(resultSet.getTimestamp(11));
        return rifterSession;
    }

    public boolean createGame(RifterSession rifterSession) {
        return usertableRepository.doInsert(createGame,
                new Object[] {rifterSession.getHostId(), rifterSession.getNumSlots(),
                        rifterSession.getExpirationTime(), rifterSession.getGameCost(), rifterSession.getMethodOfContact(),
                        rifterSession.getGameType(), rifterSession.getTitle(), rifterSession.getHits(),
                        rifterSession.getGameDuration(), rifterSession.getGameTime()});
    }



    /*
    public RifterSession getRifterGameById(Integer id) {
        return rifterGameRepository.getRifterGameById(id);
    }
    */

}
