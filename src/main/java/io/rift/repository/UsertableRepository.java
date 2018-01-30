package io.rift.repository;

import io.rift.model.Usertable;
import io.rift.service.ConnectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;

@Repository
public class UsertableRepository {

    @Autowired
    private ConnectionService connectionService;


    public ResultSet doQuery(String queryName, Object[] args) throws SQLException {
        HashMap<String, PreparedStatement> queryDict = connectionService.queryDict;
        PreparedStatement preparedStatement = queryDict.get(queryName);
        for (int i = 1; i <= args.length; i ++) {
            preparedStatement.setObject(i, args[i - 1]);
        }
        return preparedStatement.executeQuery();
    }

    public boolean doInsert(String queryName, Object[] args) {
        HashMap<String, PreparedStatement> queryDict = connectionService.queryDict;
        try {
            PreparedStatement preparedStatement = queryDict.get(queryName);
            for (int i = 1; i <= args.length; i++) {
                preparedStatement.setObject(i, args[i - 1]);
            }
            preparedStatement.execute();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }




    /*
    Usertable findById(Integer id);

    Usertable findByFirstName(String firstName);
    */

}
