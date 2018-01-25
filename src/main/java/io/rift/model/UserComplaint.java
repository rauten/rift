package io.rift.model;


import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@IdClass(UserComplaint.UserComplaintId.class)
@Table(name = "usercomplaint")
public class UserComplaint {

    @Id
    @Column(name = "rift_id")
    @JsonView(Views.Public.class)
    private Integer riftId;

    @Id
    @Column(name = "submitter_id")
    @JsonView(Views.Public.class)
    private Integer submitterId;

    @JsonView(Views.Public.class)
    private String complaint;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "rift_id", insertable = false, updatable = false)
    @JsonView(Views.InternalUserComplaintUsertableReceiver.class)
    private Usertable receiverUsertable;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "submitter_id", insertable = false, updatable = false)
    @JsonView(Views.InternalUserComplaintUsertableSubmitter.class)
    private Usertable submitterUsertable;

    public UserComplaint() {}

    public UserComplaint(Integer riftId, Integer submitterId, String complaint) {
        this.riftId = riftId;
        this.submitterId = submitterId;
        this.complaint = complaint;
    }

    public Integer getRiftId() {
        return riftId;
    }

    public void setRiftId(Integer riftId) {
        this.riftId = riftId;
    }

    public Integer getSubmitterId() {
        return submitterId;
    }

    public void setSubmitterId(Integer submitterId) {
        this.submitterId = submitterId;
    }

    public String getComplaint() {
        return complaint;
    }

    public void setComplaint(String complaint) {
        this.complaint = complaint;
    }

    public Usertable getReceiverUsertable() {
        return receiverUsertable;
    }

    public void setReceiverUsertable(Usertable receiverUsertable) {
        this.receiverUsertable = receiverUsertable;
    }

    public Usertable getSubmitterUsertable() {
        return submitterUsertable;
    }

    public void setSubmitterUsertable(Usertable submitterUsertable) {
        this.submitterUsertable = submitterUsertable;
    }

    class UserComplaintId implements Serializable {
        private Integer riftId;;
        private Integer submitterId;
    }
}
