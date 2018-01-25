package io.rift.model;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "usertable")
public class Usertable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", unique = true, nullable = false)
    @JsonView(Views.Public.class)
    private Integer id;

    @Column(name = "first_name")
    @JsonView(Views.Public.class)
    private String firstName;

    @Column(name = "last_name")
    @JsonView(Views.Public.class)
    private String lastName;

    @Column(name = "rift_tag")
    @JsonView(Views.Public.class)
    private String riftTag;

    //private Timestamp birthdate;

    @JsonView(Views.Public.class)
    private Boolean gender;

    @Column(name = "twitch_account")
    @JsonView(Views.Public.class)
    private String twitchAccount;

    @Column(name = "youtube_account")
    @JsonView(Views.Public.class)
    private String youtubeAccount;

    @Column(name = "rifter_rating")
    @JsonView(Views.Public.class)
    private Double rifterRating;

    @Column(name = "riftee_rating")
    @JsonView(Views.Public.class)
    private Double rifteeRating;

    @Column(name = "is_private")
    @JsonView(Views.Public.class)
    private Boolean isPrivate;

    @Column(name = "is_suspended")
    @JsonView(Views.Public.class)
    private Boolean isSuspended;

    @Column(name = "profile_picture_path")
    @JsonView(Views.Public.class)
    private String profilePicturePath;

    //TODO: Should this be Public? I feel like we only want bio for Profile Page. It's also a huge field to retrieve
    @JsonView(Views.ProfilePageView.class)
    private String bio;

    @OneToMany(mappedBy = "usertable", cascade = CascadeType.ALL)
    @JsonView(Views.InternalUsertableUser.class)
    private List<Notification> notificationList;

    @OneToMany(mappedBy = "creatorUsertable", cascade = CascadeType.ALL)
    @JsonView(Views.InternalUsertableCreator.class)
    private List<Notification> creatorActivityList;


    @OneToMany(mappedBy = "usertable", cascade = CascadeType.ALL)
    @JsonView(Views.InternalUsertableGR.class)
    private List<GameRequest> gameRequests;

    @OneToMany(mappedBy = "usertable", cascade = CascadeType.ALL)
    @JsonView(Views.InternalUsertableRG.class)
    private List<RifterGame> rifterGames;

    @OneToMany(mappedBy = "followerUsertable", cascade = CascadeType.ALL)
    @JsonView(Views.InternalUsertableFollowingFollower.class)
    private List<Following> followers;

    @OneToMany(mappedBy = "followingUsertable", cascade = CascadeType.ALL)
    @JsonView(Views.InternalUsertableFollowingFollowing.class)
    private List<Following> followings;

    @OneToMany(mappedBy = "receiverUsertable", cascade = CascadeType.ALL)
    @JsonView(Views.InternalUsertableUserComplaintReceiver.class)
    private List<UserComplaint> receiverComplaints;

    @OneToMany(mappedBy = "submitterUsertable", cascade = CascadeType.ALL)
    @JsonView(Views.InternalUsertableUserComplaintSubmitter.class)
    private List<UserComplaint> submitterComplaints;

    @OneToMany(mappedBy = "riftUsertable", cascade = CascadeType.ALL)
    @JsonView(Views.InternalUsertableUserRatingReceiver.class)
    private List<UserRating> riftReviews;

    @OneToMany(mappedBy = "reviewerUsertable", cascade = CascadeType.ALL)
    @JsonView(Views.InternalUsertableUserRatingSubmitter.class)
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
    @Formula("(select count(*) from gamerequest g join riftergame r on g.session_id = r.id" +
            " where g.accepted = true and g.riftee_id = id and r.expiration_time <= current_timestamp)")
    @JsonView(Views.ProfilePageView.class)
    private Integer gamesPlayed;

    @Formula("(select count(*) from following f where f.following_id = id)")
    @JsonView(Views.ProfilePageView.class)
    private Integer numberFollowing;

    @Formula("(select count(*) from following f where f.follower_id = id)")
    @JsonView(Views.ProfilePageView.class)
    private Integer numberFollowers;



    public Usertable() {}

    /*
    public Usertable(Integer id, String firstName, String lastName, String riftTag, Boolean gender,
                String twitchAccount, String youtubeAccount, Double rifterRating, Double rifteeRating,
                Boolean isPrivate, Boolean isSuspended, String profilePicturePath) {
        super();
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.riftTag = riftTag;
        //this.birthdate = birthdate;
        this.gender = gender;
        this.twitchAccount = twitchAccount;
        this.youtubeAccount = youtubeAccount;
        this.rifterRating = rifterRating;
        this.rifteeRating = rifteeRating;
        this.isPrivate = isPrivate;
        this.isSuspended = isSuspended;
        this.profilePicturePath = profilePicturePath;
    }
    */

    public void addNotification(Notification notification) {
        notificationList.add(notification);
        notification.setUsertable(this);
    }

    public void removeNotification(Notification notification) {
        notificationList.remove(notification);
        notification.setUsertable(null);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getRiftTag() {
        return riftTag;
    }

    public void setRiftTag(String riftTag) {
        this.riftTag = riftTag;
    }

    /*
    public Timestamp getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Timestamp birthdate) {
        this.birthdate = birthdate;
    }
    */

    public Boolean isGender() {
        return gender;
    }

    public void setGender(Boolean gender) {
        this.gender = gender;
    }

    public String getTwitchAccount() {
        return twitchAccount;
    }

    public void setTwitchAccount(String twitchAccount) {
        this.twitchAccount = twitchAccount;
    }

    public String getYoutubeAccount() {
        return youtubeAccount;
    }

    public void setYoutubeAccount(String youtubeAccount) {
        this.youtubeAccount = youtubeAccount;
    }

    public Double getRifterRating() {
        return rifterRating;
    }

    public void setRifterRating(Double rifterRating) {
        this.rifterRating = rifterRating;
    }

    public Double getRifteeRating() {
        return rifteeRating;
    }

    public void setRifteeRating(Double rifteeRating) {
        this.rifteeRating = rifteeRating;
    }

    public Boolean isPrivate() {
        return isPrivate;
    }

    public void setPrivate(Boolean aPrivate) {
        isPrivate = aPrivate;
    }

    public Boolean isSuspended() {
        return isSuspended;
    }

    public void setSuspended(Boolean suspended) {
        isSuspended = suspended;
    }

    public String getProfilePicturePath() {
        return profilePicturePath;
    }

    public void setProfilePicturePath(String profilePicturePath) {
        this.profilePicturePath = profilePicturePath;
    }

    public List getNotificationSet() { return notificationList; }

    public void setNotificationSet(List notificationSet) { this.notificationList = notificationSet; }


    public List<Notification> getCreatorActivityList() {
        return creatorActivityList;
    }

    public void setCreatorActivityList(List<Notification> creatorActivityList) {
        this.creatorActivityList = creatorActivityList;
    }


    public List<GameRequest> getGameRequests() {
        return gameRequests;
    }

    public void setGameRequests(List<GameRequest> gameRequests) {
        this.gameRequests = gameRequests;
    }

    public List<RifterGame> getRifterGames() {
        return rifterGames;
    }

    public void setRifterGames(List<RifterGame> rifterGames) {
        this.rifterGames = rifterGames;
    }

    public List<Following> getFollowers() {
        return followers;
    }

    public void setFollowers(List<Following> followers) {
        this.followers = followers;
    }

    public List<Following> getFollowings() {
        return followings;
    }

    public void setFollowings(List<Following> followings) {
        this.followings = followings;
    }

    public List<UserComplaint> getReceiverComplaints() {
        return receiverComplaints;
    }

    public void setReceiverComplaints(List<UserComplaint> receiverComplaints) {
        this.receiverComplaints = receiverComplaints;
    }

    public List<UserComplaint> getSubmitterComplaints() {
        return submitterComplaints;
    }

    public void setSubmitterComplaints(List<UserComplaint> submitterComplaints) {
        this.submitterComplaints = submitterComplaints;
    }

    public List<UserRating> getRiftReviews() {
        return riftReviews;
    }

    public void setRiftReviews(List<UserRating> riftReviews) {
        this.riftReviews = riftReviews;
    }

    public List<UserRating> getReviewerReviews() {
        return reviewerReviews;
    }

    public void setReviewerReviews(List<UserRating> reviewerReviews) {
        this.reviewerReviews = reviewerReviews;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }


    /*

    SELECT COUNT(*)
FROM (
    SELECT *
    FROM riftergame AS RG JOIN gamerequest AS GR
    ON RG.id = GR.session_id
    WHERE RG.expiration_time <= current_timestamp) AS foo
     */
}
