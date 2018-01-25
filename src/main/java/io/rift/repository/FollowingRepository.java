package io.rift.repository;

import io.rift.model.Following;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowingRepository extends JpaRepository<Following, Integer> {

    Following getFollowingByFollowerIdAndFollowingId(Integer follower, Integer following);

    List<Following> getFollowingByFollowerId(Integer followerId);

    List<Following> getFollowingByFollowingId(Integer followingId);

}
