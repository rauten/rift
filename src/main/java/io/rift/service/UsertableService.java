package io.rift.service;


import io.rift.config.SwaggerConfig;
import io.rift.model.GameRequest;
import io.rift.model.Usertable;
import io.rift.repository.UsertableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;

@Service
public class UsertableService {

    @Autowired
    private UsertableRepository usertableRepository;

    /*
    @Autowired
    private SwaggerConfig swaggerConfig;

    @Autowired
    private ConnectionService connectionService;
    */

    public Usertable getUserById(Integer id) {
        return usertableRepository.findById(id);
    }


    /*
    public GameRequest getUserGameRequest(Integer rifteeId) throws SQLException {
        String query = "SELECT * FROM gamerequest WHERE rifteeid = ?";
        //String query = "SELECT * FROM Usertable NATURAL JOIN GameRequest WHERE "
        Connection connection = connectionService.connection;
        PreparedStatement preparedStatement = connection.prepareStatement(query);
        preparedStatement.setObject(1, 1);
        ResultSet resultSet = preparedStatement.executeQuery();
        GameRequest gameRequest = new GameRequest();
        if (resultSet.next()) {
            gameRequest.setRifteeId(resultSet.getInt(1));
            gameRequest.setSessionId(resultSet.getInt(2));
            gameRequest.setAccepted(resultSet.getBoolean(3));
        }
        return gameRequest;
    }

    public ResultSet getUserNotifications(Integer rifteeId) throws SQLException {
        String query = "SELECT * FROM usertable JOIN notification ON usertable.id = notification.user_id AND usertable.id = ?";
        Connection connection = connectionService.connection;
        PreparedStatement preparedStatement = connection.prepareStatement(query);
        preparedStatement.setObject(1, 1);
        ResultSet resultSet = preparedStatement.executeQuery();
        int i = 1;
        while (resultSet.next()) {
            System.out.println(resultSet.getObject(i).toString());
            i++;
        }
        return resultSet;
    }


    /*
    public User getUser(Integer id) {
        return userRepository.findOne(id);
    }
    */


}
