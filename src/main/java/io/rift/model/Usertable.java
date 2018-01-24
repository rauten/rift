package io.rift.model;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "usertable")
public class Usertable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
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

}
