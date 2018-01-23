package io.rift.model;



import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne(cascade = CascadeType.ALL)
    private Usertable usertable;

    private String notificationType;
    private String notificationContent;
    private Timestamp datetime;

    @ManyToOne(cascade = CascadeType.ALL)
    private RifterGame rifterGame;

    public Notification(Integer id, Usertable usertable, String notificationType, String notificationContent,
                        Timestamp datetime, RifterGame rifterGame) {
        this.id = id;
        this.usertable = usertable;
        this.notificationType = notificationType;
        this.notificationContent = notificationContent;
        this.datetime = datetime;
        this.rifterGame = rifterGame;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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

    public Timestamp getDatetime() {
        return datetime;
    }

    public void setDatetime(Timestamp datetime) {
        this.datetime = datetime;
    }

    public RifterGame getRifterGame() {
        return rifterGame;
    }

    public void setRifterGame(RifterGame rifterGame) {
        this.rifterGame = rifterGame;
    }
}
