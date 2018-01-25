package io.rift.model;

import com.fasterxml.jackson.annotation.JsonView;
import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    @JsonView(Views.Public.class)
    private Integer id;

    @Column(name = "user_id")
    @JsonView(Views.Public.class)
    private Integer userId;

    @Column(name = "notification_type", nullable = false)
    @JsonView(Views.Public.class)
    private String notificationType;

    @Column(name = "notification_content", nullable = false)
    @JsonView(Views.Public.class)
    private String notificationContent;

    @Column(name = "game_id")
    @JsonView(Views.Public.class)
    private Integer gameId;

    @Column(name = "created_time")
    @JsonView(Views.Public.class)
    private Timestamp createdTime;

    @Column(name = "creator_id")
    @JsonView(Views.Public.class)
    private Integer creatorId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "creator_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonView(Views.InternalNotificationCreator.class)
    private Usertable creatorUsertable;

    /**
     * User Id represents the user who is RECEIVING the notification
     */
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonView(Views.InternalNotificationUser.class)
    private Usertable usertable;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "game_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonView(Views.InternalNotificationRG.class)
    private RifterGame rifterGame;


    public Notification() {}

    /*
    public Notification(Integer id, Usertable usertable, String notificationType, String notificationContent, Timestamp createdTime,
                        Integer gameId) {
        super();
        this.id = id;
        //this.userId = userId;
        this.usertable = usertable;
        this.notificationType = notificationType;
        this.notificationContent = notificationContent;
        //this.datetime = datetime;
        this.gameId = gameId;
        //this.rifterGame = rifterGame;
    }
    */

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    /*
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
    */



    public Usertable getUsertable() {
        return usertable;
    }


    public void setUsertable(Usertable usertable) {
        this.usertable = usertable;
    }

    public String getNotificationType() {
        return notificationType;
    }

    public void setNotificationType(String notificationType) {
        this.notificationType = notificationType;
    }

    public String getNotificationContent() {
        return notificationContent;
    }

    public void setNotificationContent(String notificationContent) {
        this.notificationContent = notificationContent;
    }

    /*
    public String getDatetime() {
        return datetime;
    }

    public void setDatetime(String datetime) {
        this.datetime = datetime;
    }
    */


    public Integer getGameId() {
        return gameId;
    }

    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }

    public Integer getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Integer creatorId) {
        this.creatorId = creatorId;
    }

    public Timestamp getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Timestamp createdTime) {
        this.createdTime = createdTime;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Usertable getCreatorUsertable() {
        return creatorUsertable;
    }

    public void setCreatorUsertable(Usertable creatorUsertable) {
        this.creatorUsertable = creatorUsertable;
    }


    public RifterGame getRifterGame() {
        return rifterGame;
    }

    public void setRifterGame(RifterGame rifterGame) {
        this.rifterGame = rifterGame;
    }




}
