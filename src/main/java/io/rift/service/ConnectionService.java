package io.rift.service;


import io.rift.config.SwaggerConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;

@Service
public class ConnectionService {

    @Autowired
    private SwaggerConfig swaggerConfig;

    public Connection connection;

    private final String sqlFile = "BOOT-INF/classes/sql.xml";
    private HashMap<String, PreparedStatement> queryDict;

    @PostConstruct
    public void init() throws SQLException {
        //Database connection
        try {
            System.out.println("**********\nConnecting to database");
            connection = swaggerConfig.dataSource().getConnection();
        } catch (SQLException e) {
            System.out.println("SQLException io.swagger.DAOs.AndrewDAO.java line 32:\n " + e.getMessage());
        }
    }

}
