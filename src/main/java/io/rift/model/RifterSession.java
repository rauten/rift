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

    private String game;

    private String console;

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
        this.sessionDuration = sessionDuration;
        this.title = title;
        this.hits = hits;
    }

}
