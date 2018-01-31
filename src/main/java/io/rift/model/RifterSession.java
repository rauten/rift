package io.rift.model;

import java.sql.Timestamp;
import java.util.List;

import lombok.Data;
import org.postgresql.util.PGInterval;

@Data
public class RifterSession {

    private Integer id;

    private Integer hostId;

    private Integer numSlots;

    private Timestamp expirationTime;

    private Double sessionCost;

    private String methodOfContact;

    private String sessionType;

    private PGInterval sessionDuration;

    private String title;

    private Integer hits;

    private Timestamp sessionTime;

    private List<SessionRequest> sessionRequests;

    private Usertable usertable;

    private List<Notification> notifications;

    private List<Usertable> players;

    public RifterSession() {}

    public RifterSession(Integer id, Integer hostId, Integer numSlots, Timestamp expirationTime, Double sessionCost, String methodOfContact, String sessionType, PGInterval sessionDuration, String title, Integer hits) {
        this.id = id;
        this.hostId = hostId;
        this.numSlots = numSlots;
        this.expirationTime = expirationTime;
        this.sessionCost = sessionCost;
        this.methodOfContact = methodOfContact;
        this.sessionType = sessionType;
        //this.sessionDuration = sessionDuration;
        this.title = title;
        this.hits = hits;
    }


    public void addNotification(Notification notification) {
        notifications.add(notification);
        notification.setRifterSession(this);
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
        return sessionCost;
    }

    public void setGameCost(Double sessionCost) {
        this.sessionCost = sessionCost;
    }

    public String getMethodOfContact() {
        return methodOfContact;
    }

    public void setMethodOfContact(String methodOfContact) {
        this.methodOfContact = methodOfContact;
    }

    public String getGameType() {
        return sessionType;
    }

    public void setGameType(String sessionType) {
        this.sessionType = sessionType;
    }

    /*
    public PGInterval getGameDuration() {
        return sessionDuration;
    }

    public void setGameDuration(PGInterval sessionDuration) {
        this.sessionDuration = sessionDuration;
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


    public List<SessionRequest> getSessionRequests() {
        return sessionRequests;
    }

    public void setSessionRequests(List<SessionRequest> sessionRequests) {
        this.sessionRequests = sessionRequests;
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
        return sessionDuration;
    }

    public void setGameDuration(PGInterval sessionDuration) {
        this.sessionDuration = sessionDuration;
    }

    public Timestamp getGameTime() {
        return sessionTime;
    }

    public void setGameTime(Timestamp sessionTime) {
        this.sessionTime = sessionTime;
    }
}
