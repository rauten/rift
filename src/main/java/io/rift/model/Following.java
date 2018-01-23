package io.rift.model;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.io.Serializable;

@Entity @IdClass(Following.FollowingId.class)
public class Following {

    @Id
    private Integer followerId;

    @Id
    private Integer followingId;

    private boolean accepted;

    public Following(Integer followerId, Integer followingId, boolean accepted) {
        this.followerId = followerId;
        this.followingId = followingId;
        this.accepted = accepted;
    }

    public Integer getFollowerId() {
        return followerId;
    }

    public void setFollowerId(Integer followerId) {
        this.followerId = followerId;
    }

    public Integer getFollowingId() {
        return followingId;
    }

    public void setFollowingId(Integer followingId) {
        this.followingId = followingId;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    class FollowingId implements Serializable {
        private Integer followerId;
        private Integer followingId;
    }

}
