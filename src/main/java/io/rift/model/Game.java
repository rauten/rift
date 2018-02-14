package io.rift.model;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

@Data
public class Game {

    @JsonView(Views.GameId.class)
    private Integer id;

    @JsonView(Views.GameGame.class)
    private String game;

    public Game() {}

}
