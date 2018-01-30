package io.rift.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.sun.org.apache.xpath.internal.operations.Bool;
import io.rift.model.UserRating;
import io.rift.model.Views;
import io.rift.service.UserRatingService;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.swing.text.View;
import java.util.List;

@RestController
public class UserRatingController {

    @Autowired
    private UserRatingService userRatingService;

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
