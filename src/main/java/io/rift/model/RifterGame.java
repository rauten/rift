package io.rift.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

import org.postgresql.util.PGInterval;

@Entity
@Table(name = "riftergame")
public class RifterGame {

    @Id
    private Integer id;

    private Integer hostId;
    private Integer numSlots;
    private Timestamp expirationTime;
    private Float gameCost;
    private String methodOfContact;
    private String gameType;
    private PGInterval interval;
    private String title;
    private Integer hits;

    public RifterGame() {}

    public RifterGame(Integer id, Integer hostId, Integer numSlots, Timestamp expirationTime, Float gameCost, String methodOfContact, String gameType, PGInterval interval, String title, Integer hits) {
        this.id = id;
        this.hostId = hostId;
        this.numSlots = numSlots;
        this.expirationTime = expirationTime;
        this.gameCost = gameCost;
        this.methodOfContact = methodOfContact;
        this.gameType = gameType;
        this.interval = interval;
        this.title = title;
        this.hits = hits;
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

    public Float getGameCost() {
        return gameCost;
    }

    public void setGameCost(Float gameCost) {
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

    public PGInterval getInterval() {
        return interval;
    }

    public void setInterval(PGInterval interval) {
        this.interval = interval;
    }

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
}
