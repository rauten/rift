package io.rift.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;
import java.util.Date;

@Entity
public class Usertable {

    @Id
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

    public Usertable() {}



    public Usertable(Integer id, String firstName, String lastName, String riftTag, Timestamp birthdate, Boolean gender,
                String twitchAccount, String youtubeAccount, Double rifterRating, Double rifteeRating,
                Boolean isPrivate, Boolean isSuspended, String profilePicturePath) {

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



}
