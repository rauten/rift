package io.rift.model;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import org.postgresql.util.PGInterval;

@Data
public class RifterSession {

    @JsonView(Views.RifterSessionId.class)
    private Integer id;

    @JsonView(Views.RifterSessionHostId.class)
    private Integer hostId;

    @JsonView(Views.RifterSessionNumSlots.class)
    private Integer numSlots;

    @JsonView(Views.RifterSessionExpirationTime.class)
    private Timestamp expirationTime;

    @JsonView(Views.RifterSessionCost.class)
    private Double sessionCost;

    @JsonView(Views.RifterSessionMethodOfContact.class)
    private String methodOfContact;

    @JsonView(Views.RifterSessionSessionType.class)
    private String sessionType;

    @JsonView(Views.RifterSessionSessionDuration.class)
    private PGInterval sessionDuration;

    @JsonView(Views.RifterSessionTitle.class)
    private String title;

    @JsonView(Views.RifterSessionHits.class)
    private Integer hits;

    @JsonView(Views.RifterSessionSessionTime.class)
    private Timestamp sessionTime;

    @JsonView(Views.RifterSessionGameId.class)
    private Integer gameId;

    @JsonView(Views.RifterSessionConsole.class)
    private String console;

    @JsonView(Views.RifterSessionSlotsRemaining.class)
    private Integer slotsRemaining;

    @JsonView(Views.RifterSessionCreatedTime.class)
    private Timestamp createdTime;

    @JsonView(Views.RifterSessionSessionRequests.class)
    private List<SessionRequest> sessionRequests;

    @JsonView(Views.RifterSessionUsertable.class)
    private Usertable usertable;

    @JsonView(Views.RifterSessionNotifications.class)
    private List<Notification> notifications;

    @JsonView(Views.RifterSessionPlayers.class)
    private List<Usertable> players;

    @JsonView(Views.RifterSessionGame.class)
    private Game game;

    @JsonView(Views.RifterSessionGameLevenshtein.class)
    private Double gameLevenshtein;

    @JsonView(Views.RifterSessionGameFirstWordLevenshtein.class)
    private Double gameFirstWordLevenshtein;

    @JsonView(Views.RifterSessionRiftTagLevenshtein.class)
    private Double riftTagLevenshtein;

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
