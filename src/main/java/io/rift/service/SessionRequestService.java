package io.rift.service;


import io.rift.model.RifterSession;
import io.rift.model.SessionRequest;
import io.rift.repository.GameRequestRepository;
import org.postgresql.util.PGInterval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class SessionRequestService {

    @Autowired
    GameRequestRepository gameRequestRepository;

    @Autowired
    private RifterSessionService rifterSessionService;

    public SessionRequest populateGameRequest(ResultSet resultSet, int startPoint) throws SQLException {
        SessionRequest sessionRequest = new SessionRequest();
        sessionRequest.setRifteeId(resultSet.getInt(startPoint));
        sessionRequest.setSessionId(resultSet.getInt(startPoint + 1));
        sessionRequest.setAccepted(resultSet.getBoolean(startPoint + 2));
        return sessionRequest;
    }

    public List<SessionRequest> populateGameRequests(ResultSet resultSet) throws SQLException {
        List<SessionRequest> rifteeSessions = new ArrayList<>();
        while (resultSet.next()) {
            SessionRequest sessionRequest = new SessionRequest();
            sessionRequest.setRifteeId(resultSet.getInt(1));
            sessionRequest.setSessionId(resultSet.getInt(2));
            sessionRequest.setAccepted(resultSet.getBoolean(3));
            rifteeSessions.add(sessionRequest);
        }
        return rifteeSessions;
    }

    public List<SessionRequest> populateGameRequestsWithGameInfo(ResultSet resultSet) throws SQLException {
        List<SessionRequest> rifteeSessions = new ArrayList<>();
        while (resultSet.next()) {
            SessionRequest sessionRequest = new SessionRequest();
            sessionRequest.setRifteeId(resultSet.getInt(1));
            sessionRequest.setSessionId(resultSet.getInt(2));
            sessionRequest.setAccepted(resultSet.getBoolean(3));
            RifterSession rifterSession = rifterSessionService.populateRifterSession(resultSet, 4);
            sessionRequest.setRifterSession(rifterSession);
            rifteeSessions.add(sessionRequest);
        }
        return rifteeSessions;
    }


    /*
    public SessionRequest getGameRequestByRifteeAndSessionId(Integer rifteeId, Integer sessionId) {
        return gameRequestRepository.getGameRequestByRifteeIdAndSessionId(rifteeId, sessionId);
    }

    public List<SessionRequest> getGameRequestsByRifteeId(Integer rifteeId) {
        return gameRequestRepository.getGameRequestsByRifteeId(rifteeId);
    }

    public List<SessionRequest> getGameRequestsBySessionId(Integer sessionId) {
        return gameRequestRepository.getGameRequestsByRifteeId(sessionId);
    }
    */





}
