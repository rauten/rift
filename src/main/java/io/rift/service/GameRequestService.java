package io.rift.service;


import io.rift.model.GameRequest;
import io.rift.repository.GameRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;

@Service
public class GameRequestService {

    @Autowired
    GameRequestRepository gameRequestRepository;

    public GameRequest getGameRequestByRifteeAndSessionId(Integer rifteeId, Integer sessionId) {
        return gameRequestRepository.getGameRequestByRifteeIdAndSessionId(rifteeId, sessionId);
    }

    public List<GameRequest> getGameRequestsByRifteeId(Integer rifteeId) {
        return gameRequestRepository.getGameRequestsByRifteeId(rifteeId);
    }

    public List<GameRequest> getGameRequestsBySessionId(Integer sessionId) {
        return gameRequestRepository.getGameRequestsByRifteeId(sessionId);
    }





}
