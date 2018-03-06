package io.rift.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
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


    public enum NotificationType {

        FOL("fol"), // Follow - Directed
        SRQ("srq"), // Session Request - Directed
        SRA("sra"), // Session Request Accepted - Directed
        SRR("srr"), // Session Request Rejected - Directed
        SPO("spo"), // Session Posted - Broadcast
        SUP("sup"), // Session Updated - Broadcast
        SDE("sde"), // Session Deleted - Broadcast
        SST("sst");  // Stream Starting - Broadcast

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
