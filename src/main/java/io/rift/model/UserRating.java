package io.rift.model;


import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class UserRating {

    @JsonView(Views.UserRatingId.class)
    private Integer id;

    @JsonView(Views.UserRatingRiftId.class)
    private Integer riftId;

    /**
     * Whether this rating is for the user's rifter (0) or riftee (1) account
     */
    @JsonView(Views.UserRatingAccountType.class)
    private Boolean accountType;

    @JsonView(Views.UserRatingRating.class)
    private Double rating;

    @JsonView(Views.UserRatingReview.class)
    private String review;

    @JsonView(Views.UserRatingReviewerId.class)
    private Integer reviewerId;

    @JsonView(Views.UserRatingCreatedTime.class)
    private Timestamp createdTime;

    @JsonView(Views.UserRatingReviewTitle.class)
    private String reviewTitle;

    @JsonView(Views.UserRatingRiftUsertable.class)
    private Usertable riftUsertable;

    @JsonView(Views.UserRatingReviewerUsertable.class)
    private Usertable reviewerUsertable;

    public UserRating() {}

}
