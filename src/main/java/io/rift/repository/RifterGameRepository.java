package io.rift.repository;

import io.rift.model.RifterGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RifterGameRepository extends JpaRepository<RifterGame, Integer> {

    RifterGame getRifterGameById(Integer id);

}
