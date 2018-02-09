package io.rift.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.sun.org.apache.xpath.internal.operations.Bool;
import io.rift.model.UserRating;
import io.rift.model.Views;
import io.rift.service.UserRatingService;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.View;
import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserRatingController {

    @Autowired
    private UserRatingService userRatingService;

    @RequestMapping(method = RequestMethod.PUT, value = "/rating/createRating")
    public Boolean createRating(@RequestBody UserRating userRating) throws SQLException {

        return userRatingService.createRating(userRating);
    }

    @JsonView(Views.GetUserRatings.class)
    @RequestMapping(method = RequestMethod.GET, value = "/rating/userRatings/{id}")
    public List<UserRating> getUserRatingsAndReviewerUsertablesById(@PathVariable Integer id) throws SQLException {
        return userRatingService.getUserRatingsAndReviewerUsertablesById(id);
    }


    /*
    @JsonView(Views.Public.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/rating/{riftId}/{accountType}")
    public List<UserRating> getUserRatingByRiftIdAndAccountType(@PathVariable Integer riftId, @PathVariable Boolean accountType) {
        return userRatingService.getUserRatingByRiftIdAndAccountType(riftId, accountType);
    }

    @JsonView(Views.Public.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/rating/{riftId}/reviewer/{reviewerId}/{accountType}")
    public UserRating getUserRatingByRiftIdAndReviewerIdAndAccountType(@PathVariable Integer riftId,
                                                                       @PathVariable Integer reviewerId,
                                                                       @PathVariable Boolean accountType) {
        return userRatingService.getUserRatingByRiftIdAndReviewerIdAndAccountType(riftId, reviewerId, accountType);
    }

    @JsonView(Views.Public.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/rating/{riftId}/reviewer/{reviewerId}")
    public List<UserRating> getUserRatingsByRiftIdAndReviewerId(@PathVariable Integer riftId, @PathVariable Integer reviewerId) {
        return userRatingService.getUserRatingByRiftIdAndReviewerId(riftId, reviewerId);
    }

    @JsonView(Views.Public.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/reviews/{riftId}")
    public List<UserRating> getUserRatingsByReviewerId(@PathVariable Integer riftId) {
        return userRatingService.getUserRatingByReviewerId(riftId);
    }

    @JsonView(Views.Public.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/reviews/{riftId}/{accountType}")
    public List<UserRating> getUserRatingsByReviewerIdForAccountType(@PathVariable Integer riftId, @PathVariable Boolean accountType) {
        return userRatingService.getUserRatingByReviewerIdAndAccountType(riftId, accountType);
    }

    @JsonView(Views.InternalUserRatingUsertableReceiver.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/rating/{riftId}/{accountType}/usertable")
    public List<UserRating> getUserRatingAndUserByRiftIdAndAccountType(@PathVariable Integer riftId, @PathVariable Boolean accountType) {
        return userRatingService.getUserRatingByRiftIdAndAccountType(riftId, accountType);
    }
    */

}
