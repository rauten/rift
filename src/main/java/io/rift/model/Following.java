package io.rift.model;


import lombok.Data;

@Data
public class Following {

    private Integer followerId;

    private Integer followingId;

    private boolean accepted;

    private Usertable followerUsertable;

    private Usertable followingUsertable;

    public Following() {}

    public Following(Integer followerId, Integer followingId, boolean accepted) {
        this.followerId = followerId;
        this.followingId = followingId;
        this.accepted = accepted;
    }

}
