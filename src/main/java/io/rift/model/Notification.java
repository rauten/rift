package io.rift.model;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class Notification {

    @JsonView(Views.NotificationId.class)
    private Integer id;

    @JsonView(Views.NotificationUserId.class)
    private Integer userId;

    @JsonView(Views.NotificationType.class)
    private Integer notificationType;

    @JsonView(Views.NotificationContent.class)
    private String notificationContent;

    @JsonView(Views.NotificationSessionId.class)
    private Integer sessionId;

    @JsonView(Views.NotificationCreatedTime.class)
    private Timestamp createdTime;

    @JsonView(Views.NotificationCreatorId.class)
    private Integer creatorId;

    @JsonView(Views.NotificationCreatorUsertable.class)
    private Usertable creatorUsertable;

    @JsonView(Views.NotificationReceiverUsertable.class)
    private Usertable receiverUsertable;

    @JsonView(Views.NotificationRifterSession.class)
    private RifterSession rifterSession;

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
