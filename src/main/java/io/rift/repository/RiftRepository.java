package io.rift.repository;

import com.impossibl.postgres.api.jdbc.PGConnection;
import io.rift.component.ConnectionService;
import io.rift.component.PGConnectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.List;

@Repository
public class RiftRepository {

    @Autowired
    private ConnectionService connectionService;

    @Autowired
    private PGConnectionService pgConnectionService;

    public ResultSet doQuery(String queryName, Object[] args) {
        HashMap<String, PreparedStatement> queryDict = connectionService.queryDict;
        try {
            PreparedStatement preparedStatement = queryDict.get(queryName);
            for (int i = 1; i <= args.length; i++) {
                preparedStatement.setObject(i, args[i - 1]);
            }
            ResultSet resultSet = preparedStatement.executeQuery();
            return resultSet;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
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

    public boolean doDelete(String queryName, Object[] args) {
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

    public boolean doUpdate(StringBuilder queryName, List<Object> args) {
        try {
            PreparedStatement preparedStatement = connectionService.connection.prepareStatement(queryName.toString());
            for (int i = 1; i <= args.size(); i++) {
                preparedStatement.setObject(i, args.get(i  - 1));
            }
            preparedStatement.execute();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean doUnlisten(Integer id) {
        try {
            Statement statement = pgConnectionService.pgConnection.createStatement();
            String str = "UNLISTEN q_event" + id;
            boolean truth = statement.execute(str);
            statement.close();
            return truth;
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
