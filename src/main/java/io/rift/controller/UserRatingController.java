package io.rift.controller;

import com.fasterxml.jackson.annotation.JsonView;
import io.rift.model.UserRating;
import io.rift.model.Usertable;
import io.rift.model.Views;
import io.rift.service.UserRatingService;
import io.rift.service.UsertableService;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.View;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://go-rift.herokuapp.com")
@RestController
@RequestMapping("/api")
public class UserRatingController {

    @Autowired
    private UserRatingService userRatingService;

    @Autowired
    private UsertableService usertableService;

    /**
     * Returns whether or not a user is allowed to rate another user for anything
     * @param riftId
     * @param reviewerId
     * @return
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "rating/{riftId}/allowedToRate/{reviewerId}")
    public Map<String, Integer> isAllowedToRate(@PathVariable Integer riftId, @PathVariable Integer reviewerId) throws SQLException {
        Map<String, Integer> result = new HashMap<>();
        result.put("result", userRatingService.isAllowedToRate(riftId, reviewerId));
        return result;
    }

    /**
     * Checks to see whether the user is still allowed to rate another user and if what they are trying to rate them for
     * is valid or not
     * @param id
     * @return
     * @throws SQLException
     */
    @JsonView(Views.GetUserRatings.class)
    @RequestMapping(method = RequestMethod.GET, value = "/rating/userRatings/{id}")
    public List<UserRating> getUserRatingsAndReviewerUsertablesById(@PathVariable Integer id) throws SQLException {
        return userRatingService.getUserRatingsAndReviewerUsertablesById(id);
    }


    /*
    @JsonView(Views.GetUserRatings.class)
    @RequestMapping(method = RequestMethod.GET, value = "/rating/userRatings/{riftTag}")
    public List<UserRating> getUserRatingsAndReviewerUsertablesByRiftTag(@PathVariable String riftTag) throws SQLException {
        Usertable usertable = usertableService.getUserByRiftTag(riftTag);
        return userRatingService.getUserRatingsAndReviewerUsertablesById(usertable.getId());
    }
    */

    /**
     * Retrieves the reviews of all individuals and usertables of their reviewers
     * @param id
     * @return
     * @throws SQLException
     */
    @JsonView(Views.UserReviews.class)
    @RequestMapping(method = RequestMethod.GET, value = "/rating/userReviews/{id}")
    public List<UserRating> getUserReviewsAndReviewerUsertablesByUserId(@PathVariable Integer id) throws SQLException {
        return userRatingService.getUserReviewsAndReviewerUsertablesByUserId(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/rating/createRating")
    public Map<String, Integer> createRating(@RequestBody UserRating userRating) throws SQLException {
        Map<String, Integer> result = new HashMap<>();
        result.put("result", userRatingService.createRating(userRating));
        return result;
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
