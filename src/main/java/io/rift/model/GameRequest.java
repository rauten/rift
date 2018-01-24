package io.rift.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@IdClass(GameRequest.GameRequestId.class)
@Table(name = "gamerequest")
public class GameRequest {

    @Id
    @Column(name = "riftee_id")
    @JsonView(Views.Public.class)
    private Integer rifteeId;

    @Id
    @Column(name = "session_id")
    @JsonView(Views.Public.class)
    private Integer sessionId;

    @JsonView(Views.Public.class)
    private boolean accepted;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "session_id", insertable = false, updatable = false)
    @JsonView(Views.InternalGameRequestRG.class)
    private RifterGame rifterGameGR;



    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "riftee_id", insertable = false, updatable = false)
    @JsonView(Views.InternalGameRequestUsertable.class)
    private Usertable usertable;


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

    /*
    public Usertable getUsertable() {
        return usertable;
    }

    public void setUsertable(Usertable usertable) {
        this.usertable = usertable;
    }
    */

    /*
    public RifterGame getRifterGame() {
        return rifterGameGR;
    }

    public void setRifterGame(RifterGame rifterGame) {
        this.rifterGameGR = rifterGame;
    }
    */

    class GameRequestId implements Serializable {
        private Integer rifteeId;
        private Integer sessionId;
    }


}
