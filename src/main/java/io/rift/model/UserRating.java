package io.rift.model;


import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

@Data
public class UserRating {

    @JsonView(Views.Public.class)
    private Integer id;

    private Integer riftId;

    /**
     * Whether this rating is for the user's rifter (0) or riftee (1) account
     */
    private Boolean accountType;

    private Double rating;

    private String review;

    private Integer reviewerId;

    @JsonView(Views.InternalUserRatingUsertableReceiver.class)
    private Usertable riftUsertable;

    @JsonView(Views.InternalUserRatingUsertableSubmitter.class)
    private Usertable reviewerUsertable;

    public UserRating() {}

}
