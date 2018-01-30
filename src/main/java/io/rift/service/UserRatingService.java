package io.rift.service;


import io.rift.model.UserRating;
import io.rift.repository.UserRatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserRatingService {

    @Autowired
    private UserRatingRepository userRatingRepository;

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
