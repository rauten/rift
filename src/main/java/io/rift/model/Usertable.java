package io.rift.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import javax.persistence.*;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "usertable")
public class Usertable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    private String firstName;
    private String lastName;
    private String riftTag;
    private Timestamp birthdate;
    private Boolean gender;
    private String twitchAccount;
    private String youtubeAccount;
    private Double rifterRating;
    private Double rifteeRating;
    private Boolean isPrivate;
    private Boolean isSuspended;
    private String profilePicturePath;

    @OneToMany(mappedBy = "rifterGame", cascade = CascadeType.ALL)
    @JsonSerialize(using = CustomListSerializer.class)
    private List<Notification> notificationSet;

    public Usertable() {}

    public Usertable(Integer id, String firstName, String lastName, String riftTag, Timestamp birthdate, Boolean gender,
                String twitchAccount, String youtubeAccount, Double rifterRating, Double rifteeRating,
                Boolean isPrivate, Boolean isSuspended, String profilePicturePath, List notificationSet) {

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.riftTag = riftTag;
        this.birthdate = birthdate;
        this.gender = gender;
        this.twitchAccount = twitchAccount;
        this.youtubeAccount = youtubeAccount;
        this.rifterRating = rifterRating;
        this.rifteeRating = rifteeRating;
        this.isPrivate = isPrivate;
        this.isSuspended = isSuspended;
        this.profilePicturePath = profilePicturePath;
        this.notificationSet = notificationSet;
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

    public Timestamp getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Timestamp birthdate) {
        this.birthdate = birthdate;
    }

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

    public List getNotificationSet() { return notificationSet; }

    public void setNotificationSet(List notificationSet) { this.notificationSet = notificationSet; }



}
