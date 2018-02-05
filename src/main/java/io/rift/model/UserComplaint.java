package io.rift.model;


import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

@Data
public class UserComplaint {

    @JsonView(Views.UserComplaintRiftId.class)
    private Integer riftId;

    @JsonView(Views.UserComplaintSubmitterId.class)
    private Integer submitterId;

    @JsonView(Views.UserComplaintComplaint.class)
    private String complaint;

    @JsonView(Views.UserComplaintReceiverUsertable.class)
    private Usertable receiverUsertable;

    @JsonView(Views.UserComplaintSubmitterUsertable.class)
    private Usertable submitterUsertable;

    public UserComplaint() {}


}
