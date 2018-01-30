package io.rift.model;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
public class GameRequest {

    private Integer rifteeId;

    private Integer sessionId;

    private Boolean accepted;

    private RifterGame rifterGame;

    private Usertable usertable;

    public GameRequest() {}



}
