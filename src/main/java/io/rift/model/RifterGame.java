package io.rift.model;

import java.sql.Timestamp;
import java.util.List;

import lombok.Data;
import org.postgresql.util.PGInterval;

@Data
public class RifterGame {

    private Integer id;

    private Integer hostId;

    private Integer numSlots;

    private Timestamp expirationTime;

    private Double gameCost;

    private String methodOfContact;

    private String gameType;

    private PGInterval gameDuration;

    private String title;

    private Integer hits;

    private Timestamp gameTime;

    private List<GameRequest> gameRequests;

    private Usertable usertable;

    private List<Notification> notifications;

    private List<Usertable> players;

    public RifterGame() {}

    public RifterGame(Integer id, Integer hostId, Integer numSlots, Timestamp expirationTime, Double gameCost, String methodOfContact, String gameType, PGInterval gameDuration, String title, Integer hits) {
        this.id = id;
        this.hostId = hostId;
        this.numSlots = numSlots;
        this.expirationTime = expirationTime;
        this.gameCost = gameCost;
        this.methodOfContact = methodOfContact;
        this.gameType = gameType;
        //this.gameDuration = gameDuration;
        this.title = title;
        this.hits = hits;
    }


    public void addNotification(Notification notification) {
        notifications.add(notification);
        notification.setRifterGame(this);
    }

    public void removeNotification(Notification notification) {
        notifications.remove(notification);
        notification.setReceiverUsertable(null);
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getHostId() {
        return hostId;
    }

    public void setHostId(Integer hostId) {
        this.hostId = hostId;
    }

    public Integer getNumSlots() {
        return numSlots;
    }

    public void setNumSlots(Integer numSlots) {
        this.numSlots = numSlots;
    }

    public Timestamp getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(Timestamp expirationTime) {
        this.expirationTime = expirationTime;
    }

    public Double getGameCost() {
        return gameCost;
    }

    public void setGameCost(Double gameCost) {
        this.gameCost = gameCost;
    }

    public String getMethodOfContact() {
        return methodOfContact;
    }

    public void setMethodOfContact(String methodOfContact) {
        this.methodOfContact = methodOfContact;
    }

    public String getGameType() {
        return gameType;
    }

    public void setGameType(String gameType) {
        this.gameType = gameType;
    }

    /*
    public PGInterval getGameDuration() {
        return gameDuration;
    }

    public void setGameDuration(PGInterval gameDuration) {
        this.gameDuration = gameDuration;
    }
    */


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getHits() {
        return hits;
    }

    public void setHits(Integer hits) {
        this.hits = hits;
    }


    public List<GameRequest> getGameRequests() {
        return gameRequests;
    }

    public void setGameRequests(List<GameRequest> gameRequests) {
        this.gameRequests = gameRequests;
    }


    public List<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }


    public Usertable getUsertable() {
        return usertable;
    }

    public void setUsertable(Usertable usertable) {
        this.usertable = usertable;
    }


    public PGInterval getGameDuration() {
        return gameDuration;
    }

    public void setGameDuration(PGInterval gameDuration) {
        this.gameDuration = gameDuration;
    }

    public Timestamp getGameTime() {
        return gameTime;
    }

    public void setGameTime(Timestamp gameTime) {
        this.gameTime = gameTime;
    }
}
