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

    private final Integer POPULATESIZE = 8;

    private final String createRating = "createRating";
    private final String getUserRatingsAndReviewerUsertablesById = "getUserRatingsAndReviewerUsertablesById";
    private final String getUserRatingByIds = "getUserRatingByIds";
    private final String getGameByHostAndPlayerId = "getGameByHostAndPlayerId";
    private final String getUserReviewsAndRevieweeUsertablesByUserId = "getUserReviewsAndRevieweeUsertablesByUserId";

    public Boolean createRating(UserRating userRating) throws SQLException {

        if (userRating.getAccountType()) {
            if (riftRepository.doQuery(getGameByHostAndPlayerId,
                    new Object[] {userRating.getReviewerId(), userRating.getRiftId()}).next() &&
                    !riftRepository.doQuery(getUserRatingByIds,
                            new Object[] {userRating.getRiftId(), userRating.getReviewerId(), userRating.getAccountType()}).next()) {

                return riftRepository.doInsert(createRating,
                        new Object[] {userRating.getRiftId(), userRating.getAccountType(), userRating.getRating(),
                                userRating.getReview(), userRating.getReviewerId(), userRating.getCreatedTime(),
                                userRating.getReviewTitle()});
            }
            return false;
        } else if (riftRepository.doQuery(getGameByHostAndPlayerId,
                    new Object[] {userRating.getRiftId(), userRating.getReviewerId()}).next() &&
                    !riftRepository.doQuery(getUserRatingByIds,
                            new Object[] {userRating.getRiftId(), userRating.getReviewerId(), userRating.getAccountType()}).next()) {

            return riftRepository.doInsert(createRating,
                    new Object[] {userRating.getRiftId(), userRating.getAccountType(), userRating.getRating(),
                            userRating.getReview(), userRating.getReviewerId(), userRating.getCreatedTime(),
                            userRating.getReviewTitle()});

        }

        return false;

    }

    public List<UserRating> getUserRatingsAndReviewerUsertablesById(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = riftRepository.doQuery(getUserRatingsAndReviewerUsertablesById, args);
        List<UserRating> userRatings = new ArrayList<>();
        while(resultSet.next()) {
            UserRating userRating = populateUserRating(resultSet, 1, "reviewerUsertable");
            userRatings.add(userRating);
        }
        resultSet.close();
        return userRatings;
    }

    public List<UserRating> getUserReviewsAndRevieweeUsertablesByUserId(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = riftRepository.doQuery(getUserReviewsAndRevieweeUsertablesByUserId, args);
        List<UserRating> userRatings = new ArrayList<>();
        while(resultSet.next()) {
            UserRating userRating = populateUserRating(resultSet, 1, "reviewerUsertable");
            userRatings.add(userRating);
        }
        resultSet.close();
        return userRatings;
    }

    public UserRating populateUserRating(ResultSet resultSet, Integer startPoint, String info) throws SQLException {
        UserRating userRating = new UserRating();
        userRating.setId(resultSet.getInt(startPoint));
        userRating.setRiftId(resultSet.getInt(startPoint + 1));
        userRating.setAccountType(resultSet.getBoolean(startPoint + 2));
        userRating.setRating(resultSet.getDouble(startPoint + 3));
        userRating.setReview(resultSet.getString(startPoint + 4));
        userRating.setReviewerId(resultSet.getInt(startPoint + 5));
        userRating.setCreatedTime(resultSet.getTimestamp(startPoint + 6));
        userRating.setReviewTitle(resultSet.getString(startPoint + 7));
        if (info.equals("reviewerUsertable")) {
            userRating.setReviewerUsertable(usertableService.populateUsertable(resultSet, POPULATESIZE + 1, ""));
        }
        return userRating;
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
