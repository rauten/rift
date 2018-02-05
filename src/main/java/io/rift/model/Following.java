package io.rift.model;


import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

@Data
public class Following {

    @JsonView(Views.FollowingFollowerId.class)
    private Integer followerId;

    @JsonView(Views.FollowingFollowingId.class)
    private Integer followingId;

    @JsonView(Views.FollowingAccepted.class)
    private boolean accepted;

    @JsonView(Views.FollowingFollowerUsertable.class)
    private Usertable followerUsertable;

    @JsonView(Views.FollowingFollowingUsertable.class)
    private Usertable followingUsertable;

    public Following() {}

    public Following(Integer followerId, Integer followingId, boolean accepted) {
        this.followerId = followerId;
        this.followingId = followingId;
        this.accepted = accepted;
    }

}
