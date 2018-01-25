package io.rift.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonView;
import org.postgresql.util.PGInterval;

@Entity
@Table(name = "riftergame")
public class RifterGame {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    @JsonView(Views.Public.class)
    private Integer id;

    @Column(name = "host_id")
    @JsonView(Views.Public.class)
    private Integer hostId;

    @Column(name = "num_slots")
    @JsonView(Views.Public.class)
    private Integer numSlots;

    @Column(name = "expiration_time")
    @JsonView(Views.Public.class)
    private Timestamp expirationTime;

    @Column(name = "game_cost")
    @JsonView(Views.Public.class)
    private Double gameCost;

    @Column(name = "method_of_contact")
    @JsonView(Views.Public.class)
    private String methodOfContact;

    @Column(name = "game_type")
    @JsonView(Views.Public.class)
    private String gameType;

    /*
    @Column(name = "game_duration")
    @JsonView(Views.Public.class)
    private PGInterval gameDuration;
    */

    @JsonView(Views.Public.class)
    private String title;

    @JsonView(Views.Public.class)
    private Integer hits;

    @OneToMany(mappedBy = "rifterGameGR", cascade = CascadeType.ALL)
    @JsonView(Views.InternalRifterGameGR.class)
    private List<GameRequest> gameRequests;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "host_id", insertable = false, updatable = false)
    @JsonView(Views.InternalRifterGameUsertable.class)
    private Usertable usertable;


    @OneToMany(mappedBy = "rifterGame", cascade = CascadeType.ALL)
    @JsonView(Views.InternalRifterGameNotification.class)
    private List<Notification> notifications;

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
        notification.setUsertable(null);
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


}
