package io.rift.model;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

@Data
public class SessionRequest {

    @JsonView(Views.SessionRequestRifteeId.class)
    private Integer rifteeId;

    @JsonView(Views.SessionRequestSessionId.class)
    private Integer sessionId;

    @JsonView(Views.SessionRequestAccepted.class)
    private Boolean accepted;

    @JsonView(Views.SessionRequestHostId.class)
    private Integer hostId;

    @JsonView(Views.SessionRequestRifterSession.class)
    private RifterSession rifterSession;

    @JsonView(Views.SessionRequestRifteeUsertable.class)
    private Usertable rifteeUsertable;

    @JsonView(Views.SessionRequestHostUsertable.class)
    private Usertable hostUsertable;

    public SessionRequest() {}



}
