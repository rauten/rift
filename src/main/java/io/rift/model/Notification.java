package io.rift.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class Notification {

    @JsonView(Views.NotificationId.class)
    private Integer id;

    @JsonView(Views.NotificationUserId.class)
    private Integer userId;

    @JsonView(Views.NotificationType.class)
    private NotificationType notificationType;

    @JsonView(Views.NotificationContent.class)
    private String notificationContent;

    @JsonView(Views.NotificationSessionId.class)
    private Integer sessionId;

    @JsonView(Views.NotificationCreatedTime.class)
    private Timestamp createdTime;

    @JsonView(Views.NotificationCreatorId.class)
    private Integer creatorId;

    @JsonView(Views.NotificationSeen.class)
    private boolean seen;

    @JsonView(Views.NotificationCreatorUsertable.class)
    private Usertable creatorUsertable;


    @JsonView(Views.NotificationReceiverUsertable.class)
    private Usertable receiverUsertable;

    @JsonView(Views.NotificationRifterSession.class)
    private RifterSession rifterSession;

    public Notification() {}


    public enum NotificationType {

        FOL("FOL"), // Follow - Directed
        SRQ("SRQ"), // Session Request - Directed
        SRA("SRA"), // Session Request Accepted - Directed
        SRR("SRR"), // Session Request Rejected - Directed
        SPO("SPO"), // Session Posted - Broadcast
        SUP("SUP"), // Session Updated - Broadcast
        SDE("SDE"), // Session Deleted - Broadcast
        SST("SST"),  // Stream Starting - Broadcast
        SJO("SJO"); // Session Joined - Broadcast

        private String value;

        NotificationType(String value) {
            this.value = value;
        }

        @Override
        @JsonValue
        public String toString() {
            return String.valueOf(value);
        }

        @JsonCreator
        public static NotificationType fromValue(String text) {
            for (NotificationType b : NotificationType.values()) {
                if (String.valueOf(b.value).equals(text)) {
                    return b;
                }
            }
            return null;
        }

    }



}
