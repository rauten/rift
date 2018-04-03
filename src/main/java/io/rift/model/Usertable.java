package io.rift.model;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class Usertable {

    @JsonView(Views.UsertableId.class)
    private Integer id;

    @JsonView(Views.UsertableAuth0Id.class)
    private String auth0Token;

    @JsonView(Views.UsertableBraintreeId.class)
    private String braintreeId;

    @JsonView(Views.UsertableFirstName.class)
    private String firstName;

    @JsonView(Views.UsertableLastName.class)
    private String lastName;

    @JsonView(Views.UsertableRiftTag.class)
    private String riftTag;

    @JsonView(Views.UsertableGender.class)
    private Boolean gender;

    @JsonView(Views.UsertableTwitchAccount.class)
    private String twitchAccount;

    @JsonView(Views.UsertableYoutubeAccount.class)
    private String youtubeAccount;

    @JsonView(Views.UsertableRifterRating.class)
    private Double rifterRating;

    @JsonView(Views.UsertableRifteeRating.class)
    private Double rifteeRating;

    @JsonView(Views.UsertableIsPrivate.class)
    private Boolean isPrivate;

    @JsonView(Views.UsertableIsSuspended.class)
    private Boolean isSuspended;

    @JsonView(Views.UsertableProfilePicturePath.class)
    private String profilePicturePath;

    //TODO: Should this be Public? I feel like we only want bio for Profile Page. It's also a huge field to retrieve
    @JsonView(Views.UsertableBio.class)
    private String bio;

    @JsonView(Views.UsertableEmail.class)
    private String email;

    private String customerId;

    private String accountId;

    @JsonView(Views.UsertableNotificationList.class)
    private List<Notification> notificationList;

    @JsonView(Views.UsertableCreatorActivityList.class)
    private List<Notification> creatorActivityList;

    @JsonView(Views.UsertableBroadcastNotificationList.class)
    private List<Notification> broadcastNotificationList;

    @JsonView(Views.UsertableRifteeSessions.class)
    private List<SessionRequest> rifteeSessions;

    @JsonView(Views.UsertableRifteeRiftSessions.class)
    private List<RifterSession> rifteeRiftSessions;

    @JsonView(Views.UsertableRifterSessions.class)
    private List<RifterSession> rifterSessions;

    @JsonView(Views.UsertableFollowers.class)
    private List<Following> followers;

    @JsonView(Views.UsertableFollowings.class)
    private List<Following> followings;

    @JsonView(Views.UsertableReceiverComplaints.class)
    private List<UserComplaint> receiverComplaints;

    @JsonView(Views.UsertableSubmitterComplaints.class)
    private List<UserComplaint> submitterComplaints;

    @JsonView(Views.UsertableRiftReviews.class)
    private List<UserRating> riftReviews;

    @JsonView(Views.UsertableReviewerReviews.class)
    private List<UserRating> reviewerReviews;
    
    @JsonView(Views.UsertableGamesPlayed.class)
    private Integer gamesPlayed;
    
    @JsonView(Views.UsertableNumberFollowing.class)
    private Integer numberFollowing;
    
    @JsonView(Views.UsertableNumberFollowers.class)
    private Integer numberFollowers;

    @JsonView(Views.UsertableRiftTagLevenshtein.class)
    private Integer riftTagLevenshtein;

    @JsonView(Views.UsertableFirstNameLevenshtein.class)
    private Integer firstNameLevenshtein;

    @JsonView(Views.UsertableFullNameLevenshtein.class)
    private Double fullNameLevenshtein;
    
    public Usertable() {}

}
