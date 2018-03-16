package io.rift.model;


import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameAccount {

    @JsonView(Views.GameAccountId.class)
    private Integer id;

    @JsonView(Views.GameAccountUsertableId.class)
    private Integer usertableId;

    @JsonView(Views.GameAccountGameId.class)
    private Integer gameId;

    @JsonView(Views.GameAccountIgn.class)
    private String ign;

    @JsonView(Views.GameAccountVerified.class)
    private boolean verified;

    @JsonView(Views.GameAccountUsertable.class)
    private Usertable usertable;

    @JsonView(Views.GameAccountGame.class)
    private Game game;

    public GameAccount(Integer usertableId, Integer gameId, String ign) {
        this.usertableId = usertableId;
        this.gameId = gameId;
        this.ign = ign;
    }

    public GameAccount(Integer id, Integer usertableId, Integer gameId, String ign) {
        this(usertableId, gameId, ign);
        this.id = id;
    }

}
