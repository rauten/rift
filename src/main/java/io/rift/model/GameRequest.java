package io.rift.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class GameRequest {

    @Id
    @JsonProperty("riftee_id")
    private Integer rifteeId;

    @JsonProperty("session_id")
    private Integer sessionId;

    @JsonProperty("accepted")
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

    public void setSessionId(Integer sessionId) {
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


}
