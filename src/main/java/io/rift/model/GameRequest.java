package io.rift.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.io.Serializable;

@Entity @IdClass(GameRequest.GameRequestId.class)
public class GameRequest {

    @Id
    private Integer rifteeId;

    @Id
    private Integer sessionId;

    private boolean accepted;


    public Integer getRifteeId() {
        return rifteeId;
    }

    public void setRifteeId(Integer rifteeId) {
        this.rifteeId = rifteeId;
    }

    public Integer getSessionId() {
        return sessionId;
    }

    public void setSessionId(Integer session_id) {
        this.sessionId = sessionId;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    public GameRequest() {}

    public GameRequest(Integer rifteeId, Integer sessionId, boolean accepted) {
        this.rifteeId = rifteeId;
        this.sessionId = sessionId;
        this.accepted = accepted;
    }

    class GameRequestId implements Serializable {
        private Integer rifteeId;
        private Integer sessionId;
    }


}
