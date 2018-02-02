package io.rift.model;

import java.util.*;

import lombok.Data;

@Data
public class Usertable {

    private static final long serialVerionUID = 1L;

    //@JsonView(Views.Public.class)
    private Integer id;

    private String auth0Id;

    //@JsonView(Views.Public.class)
    private String firstName;

    //@JsonView(Views.Public.class)
    private String lastName;

    //@JsonView(Views.Public.class)
    private String riftTag;

    //private Timestamp birthdate;

    //@JsonView(Views.Public.class)
    private Boolean gender;

    //@JsonView(Views.Public.class)
    private String twitchAccount;

    //@JsonView(Views.Public.class)
    private String youtubeAccount;

    //@JsonView(Views.Public.class)
    private Double rifterRating;

    //@JsonView(Views.Public.class)
    private Double rifteeRating;

    //@JsonView(Views.Public.class)
    private Boolean isPrivate;

    //@JsonView(Views.Public.class)
    private Boolean isSuspended;

    //@JsonView(Views.Public.class)
    private String profilePicturePath;

    //TODO: Should this be Public? I feel like we only want bio for Profile Page. It's also a huge field to retrieve
    //@JsonView(Views.Public.class)
    private String bio;

    //@JsonView(Views.InternalUsertableUser.class)
    private List<Notification> notificationList;

    //@JsonView(Views.InternalUsertableCreator.class)
    private List<Notification> creatorActivityList;

    //@JsonView(Views.ProfilePageView.class)
    private List<Notification> broadcastNotifications;

    //@JsonView(Views.InternalUsertableGR.class)
    private List<SessionRequest> rifteeSessions;

    //@JsonView(Views.InternalUsertableRG.class)
    private List<RifterSession> rifterSessions;

    //@JsonView(Views.InternalUsertableFollowingFollower.class)
    private List<Following> followers;

    //@JsonView(Views.InternalUsertableFollowingFollowing.class)
    private List<Following> followings;

    //@JsonView(Views.InternalUsertableUserComplaintReceiver.class)
    private List<UserComplaint> receiverComplaints;

    //@JsonView(Views.InternalUsertableUserComplaintSubmitter.class)
    private List<UserComplaint> submitterComplaints;

    //@JsonView(Views.InternalUsertableUserRatingReceiver.class)
    private List<UserRating> riftReviews;

    //@JsonView(Views.InternalUsertableUserRatingSubmitter.class)
    private List<UserRating> reviewerReviews;


    /**
     * Equivalent to:
     * SELECT COUNT(*)
     * FROM (
     *      SELECT *
     *      FROM gamerequest GR JOIN riftergame RG
     *      ON GR.session_id = RG.id
     *      WHERE RG.expiration_time <= current_timestamp) AS foo
     * WHERE foo.accepted = true AND foo.riftee_id = ?
     *
     * Counts the number of games played
     * TODO: Change expiration_time to game_time
     */
    //@Formula("(select count(*) from gamerequest g join riftergame r on g.session_id = r.id" +
            //" where g.accepted = true and g.riftee_id = id and r.expiration_time <= current_timestamp)")
    //@JsonView(Views.ProfilePageView.class)
    private Integer gamesPlayed;

    //@Formula("(select count(*) from following f where f.following_id = id)")
    //@JsonView(Views.ProfilePageView.class)
    private Integer numberFollowing;

    //@Formula("(select count(*) from following f where f.follower_id = id)")
    //@JsonView(Views.ProfilePageView.class)
    private Integer numberFollowers;

    /*
    @OneToMany(mappedBy = "broadcastNotification", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Loader(namedQuery = "getNotifications")
    @JsonView(Views.Public.class)
    private Set<Notification> theNotificationList;
    */

    //@JsonView(Views.ProfilePageView.class)
    private List<Notification> broadcastList;


    //private List<Notification> broadcsatNotifications = usertableService.getBroadcastNotifications(id);

    public Usertable() {}

}
