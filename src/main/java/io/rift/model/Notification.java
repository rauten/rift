package io.rift.model;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
public class Notification {

    private Integer id;

    private Integer userId;

    private String notificationType;

    private String notificationContent;

    private Integer gameId;

    private Timestamp createdTime;

    private Integer creatorId;

    private Usertable creatorUsertable;

    private Usertable receiverUsertable;

    private RifterGame rifterGame;

    /*
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    @JsonView(Views.InternalNotificationUser.class)
    private Usertable broadcastNotification;
    */

    public Notification() {}

    /*
    public enum NotificationType {

        FR, // Follow Request - Directed
        GR, // Game Request - Directed
        GP, // Game Posted - Broadcast
        SS  // Stream Starting - Broadcast

    }
    */

}
