package io.rift.model;


import com.fasterxml.jackson.annotation.JsonView;
import org.crsh.cli.Man;

import javax.persistence.*;
import javax.swing.text.View;
import java.io.Serializable;

@Entity
@IdClass(Following.FollowingId.class)
@Table(name = "following")
public class Following {

    @Id
    @Column(name = "follower_id")
    @JsonView(Views.Public.class)
    private Integer followerId;

    @Id
    @Column(name = "following_id")
    @JsonView(Views.Public.class)
    private Integer followingId;

    @JsonView(Views.Public.class)
    private boolean accepted;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "follower_id", insertable = false, updatable = false)
    @JsonView(Views.InternalFollowingUsertableFollower.class)
    private Usertable followerUsertable;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "following_id", insertable = false, updatable = false)
    @JsonView(Views.InternalFollowingUsertableFollowing.class)
    private Usertable followingUsertable;


    public Following() {}

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

    public Usertable getFollowingUsertable() {
        return followingUsertable;
    }

    public void setFollowingUsertable(Usertable followingUsertable) {
        this.followingUsertable = followingUsertable;
    }

    public Usertable getFollowerUsertable() {
        return followerUsertable;
    }

    public void setFollowerUsertable(Usertable followerUsertable) {
        this.followerUsertable = followerUsertable;
    }

    class FollowingId implements Serializable {
        private Integer followerId;
        private Integer followingId;
    }

}
