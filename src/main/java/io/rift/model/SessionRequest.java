package io.rift.model;

import lombok.Data;

@Data
public class SessionRequest {

    private Integer rifteeId;

    private Integer sessionId;

    private Boolean accepted;

    private RifterSession rifterSession;

    private Usertable usertable;

    public SessionRequest() {}



}
