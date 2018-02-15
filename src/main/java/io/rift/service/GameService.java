package io.rift.service;

import io.rift.model.Game;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Service
public class GameService {

    public final Integer POPULATESIZE = 2;

    public Game populateGame(ResultSet resultSet, int startPoint, String info) throws SQLException {
        Game game = new Game();
        game.setId(resultSet.getInt(startPoint));
        game.setGame(resultSet.getString(startPoint + 1));
        return game;
    }

}
