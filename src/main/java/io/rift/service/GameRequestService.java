package io.rift.service;


import io.rift.model.GameRequest;
import io.rift.repository.GameRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameRequestService {

    @Autowired
    GameRequestRepository gameRequestRepository;

    public GameRequest getGameRequestByRifteeAndSessionId(Integer rifteeId, Integer sessionId) {
        return gameRequestRepository.getGameRequestByRifteeIdAndSessionId(rifteeId, sessionId);
    }

    public GameRequest getGameRequestByRifteeId(Integer rifteeId) {
        return gameRequestRepository.getGameRequestByRifteeId(rifteeId);
    }

    public GameRequest getGameRequesetBySessionId(Integer sessionId) {
        return gameRequestRepository.getGameRequestBySessionId(sessionId);
    }




}
