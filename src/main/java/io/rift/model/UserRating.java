package io.rift.model;


import com.fasterxml.jackson.annotation.JsonView;
import org.crsh.cli.Man;

import javax.persistence.*;

@Entity
@Table(name = "userrating")
public class UserRating {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    @JsonView(Views.Public.class)
    private Integer id;

    @Column(name = "rift_id")
    private Integer riftId;

    /**
     * Whether this rating is for the user's rifter (0) or riftee (1) account
     */
    @Column(name = "account_type")
    private Boolean accountType;

    private Double rating;

    private String review;

    @Column(name = "reviewer_id")
    private Integer reviewerId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "rift_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonView(Views.InternalUserRatingUsertableReceiver.class)
    private Usertable riftUsertable;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "reviewer_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonView(Views.InternalUserRatingUsertableSubmitter.class)
    private Usertable reviewerUsertable;

    public UserRating() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRiftId() {
        return riftId;
    }

    public void setRiftId(Integer riftId) {
        this.riftId = riftId;
    }

    public Boolean getAccountType() {
        return accountType;
    }

    public void setAccountType(Boolean accountType) {
        this.accountType = accountType;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public Integer getReviewerId() {
        return reviewerId;
    }

    public void setReviewerId(Integer reviewerId) {
        this.reviewerId = reviewerId;
    }

    public Usertable getRiftUsertable() {
        return riftUsertable;
    }

    public void setRiftUsertable(Usertable riftUsertable) {
        this.riftUsertable = riftUsertable;
    }

    public Usertable getReviewerUsertable() {
        return reviewerUsertable;
    }

    public void setReviewerUsertable(Usertable reviewerUsertable) {
        this.reviewerUsertable = reviewerUsertable;
    }
}
