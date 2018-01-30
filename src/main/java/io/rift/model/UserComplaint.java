package io.rift.model;


import lombok.Data;

@Data
public class UserComplaint {

    private Integer riftId;

    private Integer submitterId;

    private String complaint;

    private Usertable receiverUsertable;

    private Usertable submitterUsertable;

    public UserComplaint() {}


}
