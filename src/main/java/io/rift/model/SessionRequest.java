package io.rift.model;

import lombok.Data;

@Data
public class SessionRequest {

    private Integer rifteeId;

    private Integer sessionId;

    private Boolean accepted;

    private Integer hostId;

    private RifterSession rifterSession;

    private Usertable rifteeUsertable;

    private Usertable hostUsertable;

    public SessionRequest() {}



}
