package io.rift.service;


import io.rift.model.UserRating;
import io.rift.model.Usertable;
import io.rift.repository.RiftRepository;
import io.rift.repository.UserRatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.beans.IntrospectionException;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserRatingService {

    @Autowired
    private RiftRepository riftRepository;

    @Autowired
    private UsertableService usertableService;

    private final Integer POPULATESIZE = 7;

    private final String createRating = "createRating";
    private final String getUserRatingsAndReviewerUsertablesById = "getUserRatingsAndReviewerUsertablesById";
    private final String getUserRatingByIds = "getUserRatingByIds";
    private final String getGameByHostAndPlayerId = "getGameByHostAndPlayerId";

    public Boolean createRating(UserRating userRating) throws SQLException {

        if (userRating.getAccountType() == true) {
            if (riftRepository.doQuery(getGameByHostAndPlayerId,
                    new Object[] {userRating.getReviewerId(), userRating.getRiftId()}).next() &&
                    !riftRepository.doQuery(getUserRatingByIds,
                            new Object[] {userRating.getRiftId(), userRating.getReviewerId(), userRating.getAccountType()}).next()) {

                return riftRepository.doInsert(createRating,
                        new Object[] {userRating.getRiftId(), userRating.getAccountType(), userRating.getRating(),
                                userRating.getReview(), userRating.getReviewerId(), userRating.getCreatedTime()});
            }
            return false;
        } else if (riftRepository.doQuery(getGameByHostAndPlayerId,
                    new Object[] {userRating.getRiftId(), userRating.getReviewerId()}).next() &&
                    !riftRepository.doQuery(getUserRatingByIds,
                            new Object[] {userRating.getRiftId(), userRating.getReviewerId(), userRating.getAccountType()}).next()) {

            return riftRepository.doInsert(createRating,
                    new Object[] {userRating.getRiftId(), userRating.getAccountType(), userRating.getRating(),
                            userRating.getReview(), userRating.getReviewerId(), userRating.getCreatedTime()});

        }

        return false;

    }

    public List<UserRating> getUserRatingsAndReviewerUsertablesById(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = riftRepository.doQuery(getUserRatingsAndReviewerUsertablesById, args);
        List<UserRating> userRatings = new ArrayList<>();
        while(resultSet.next()) {
            UserRating userRating = new UserRating();
            userRating.setId(resultSet.getInt(1));
            userRating.setRiftId(resultSet.getInt(2));
            userRating.setAccountType(resultSet.getBoolean(3));
            userRating.setRating(resultSet.getDouble(4));
            userRating.setReview(resultSet.getString(5));
            userRating.setReviewerId(resultSet.getInt(6));
            userRating.setCreatedTime(resultSet.getTimestamp(7));
            userRating.setReviewerUsertable(usertableService.populateUsertable(resultSet, POPULATESIZE + 1, ""));
            userRatings.add(userRating);
        }
        resultSet.close();
        return userRatings;
    }

    /*
    public UserRating getUserRatingByRiftIdAndReviewerIdAndAccountType(Integer riftId, Integer reviewerId, Boolean accountType) {
        return userRatingRepository.getUserRatingByRiftIdAndReviewerIdAndAccountType(riftId, reviewerId, accountType);
    }

    public List<UserRating> getUserRatingByRiftIdAndAccountType(Integer riftId, Boolean accountType) {
        return userRatingRepository.getUserRatingByRiftIdAndAccountType(riftId, accountType);
    }

    public List<UserRating> getUserRatingByRiftIdAndReviewerId(Integer riftId, Integer reviewerId) {
        return userRatingRepository.getUserRatingByRiftIdAndReviewerId(riftId, reviewerId);
    }

    public List<UserRating> getUserRatingByReviewerId(Integer reviewerId) {
        return userRatingRepository.getUserRatingByReviewerId(reviewerId);
    }

    public List<UserRating> getUserRatingByReviewerIdAndAccountType(Integer reviewerId, Boolean accountType) {
        return userRatingRepository.getUserRatingByReviewerIdAndAccountType(reviewerId, accountType);
    }
    */


}
