package io.rift.model;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

@Data
public class UserComplaint {

    @JsonView(Views.UserComplaintRiftId.class)
    private Integer riftId;

    @JsonView(Views.UserComplaintSubmitterId.class)
    private Integer submitterId;

    @JsonView(Views.UserComplaintComplaint.class)
    private String complaint;

    @JsonView(Views.UserComplaintReceiverUsertable.class)
    private Usertable receiverUsertable;

    @JsonView(Views.UserComplaintSubmitterUsertable.class)
    private Usertable submitterUsertable;

    private ComplaintType complaintType;

    public UserComplaint() {}

    public enum ComplaintType {

        NO_SHOW("No Show"),
        POOR_PERFORMANCE("Poor Performance"),
        TOXIC_BEHAVIOR("Toxic Behavior"),
        HARD_TO_CONTACT("Hard to Contact");

        private String value;

        ComplaintType(String value) {
            this.value = value;
        }

        @Override
        @JsonValue
        public String toString() {
            return String.valueOf(value);
        }

        @JsonCreator
        public static UserComplaint.ComplaintType fromValue(String text) {
            for (UserComplaint.ComplaintType b : UserComplaint.ComplaintType.values()) {
                if (String.valueOf(b.value).equals(text)) {
                    return b;
                }
            }
            return null;
        }

    }


}
