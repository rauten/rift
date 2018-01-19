package io.rift.repository;

import io.rift.model.GameRequest;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRequestRepository extends CrudRepository<GameRequest, Integer> {

    @Modifying(clearAutomatically = true)
    @Query("SELECT um FROM GameRequest um WHERE rifteeId = :rifteeId AND sessionId = :sessionId")
    GameRequest getGameRequestByRifteeIdAndSessionId(@Param("rifteeId") int rifteeId, @Param("sessionId") int sessionId);

    GameRequest getGameRequestByRifteeId(Integer rifteeId);

    GameRequest getGameRequestBySessionId(Integer sessionId);


}
