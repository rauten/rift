package io.rift.service;


import io.rift.model.SessionRequest;
import io.rift.repository.GameRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Service
public class SessionRequestService {

    @Autowired
    GameRequestRepository gameRequestRepository;

    public SessionRequest populateGameRequest(ResultSet resultSet, int startPoint) throws SQLException {
        SessionRequest sessionRequest = new SessionRequest();
        sessionRequest.setRifteeId(resultSet.getInt(startPoint));
        sessionRequest.setSessionId(resultSet.getInt(startPoint + 1));
        sessionRequest.setAccepted(resultSet.getBoolean(startPoint + 2));
        return sessionRequest;
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
