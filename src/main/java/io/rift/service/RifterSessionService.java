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

    public final int POPULATESIZE = 11;

    private final String getRifterGameById = "getRifterGameById";
    private final String getRifterGameAndHostByGameId = "getRifterGameAndHostByGameId";
    private final String getGamePlayersByGameId = "getGamePlayersByGameId";
    private final String createGame = "createGame";


    public RifterSession getRifterGameById(Integer id) throws SQLException {

        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getRifterGameById, args);
        if (resultSet.next()) {
            return populateRifterSession(resultSet, 1);
        }
        return null;
    }

    public RifterSession getRifterGameAndHostByGameId(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = usertableRepository.doQuery(getRifterGameAndHostByGameId, args);
        if (resultSet.next()) {
            RifterSession rifterSession = populateRifterSession(resultSet, 1);
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

    public RifterSession populateRifterSession(ResultSet resultSet, int startPoint) throws SQLException {
        RifterSession rifterSession = new RifterSession();
        rifterSession.setId(resultSet.getInt(startPoint));
        rifterSession.setHostId(resultSet.getInt(startPoint + 1));
        rifterSession.setNumSlots(resultSet.getInt(startPoint + 2));
        rifterSession.setExpirationTime(resultSet.getTimestamp(startPoint + 3));
        rifterSession.setSessionCost(resultSet.getDouble(startPoint + 4));
        rifterSession.setMethodOfContact(resultSet.getString(startPoint + 5));
        rifterSession.setSessionType(resultSet.getString(startPoint + 6));
        rifterSession.setTitle(resultSet.getString(startPoint + 7));
        rifterSession.setHits(resultSet.getInt(startPoint + 8));
        rifterSession.setSessionDuration((PGInterval)resultSet.getObject(startPoint + 9));
        rifterSession.setSessionTime(resultSet.getTimestamp(startPoint + 10));
        return rifterSession;
    }

    public boolean createGame(RifterSession rifterSession) {
        return usertableRepository.doInsert(createGame,
                new Object[] {rifterSession.getHostId(), rifterSession.getNumSlots(),
                        rifterSession.getExpirationTime(), rifterSession.getSessionCost(), rifterSession.getMethodOfContact(),
                        rifterSession.getSessionType(), rifterSession.getTitle(), rifterSession.getHits(),
                        rifterSession.getSessionDuration(), rifterSession.getSessionTime()});
    }



    /*
    public RifterSession getRifterGameById(Integer id) {
        return rifterGameRepository.getRifterGameById(id);
    }
    */

}
