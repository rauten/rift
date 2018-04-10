package io.rift.component;

import com.impossibl.postgres.api.jdbc.PGConnection;
import com.impossibl.postgres.api.jdbc.PGNotificationListener;
import com.impossibl.postgres.jdbc.PGDataSource;
import io.rift.component.PGConnectionService;
import io.rift.config.PGConnectionConfig;
import io.rift.config.PollingConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

@Service
public class PostgresListenService {


    private Map<String, PGConnection> pgConnectionMap = new HashMap<>();


    @Autowired
    private PollingConfig pollingConfig;

    @Autowired
    private PGConnectionConfig pgConnectionConfig;

    boolean stuff = true;

    public void put(String string, String sessionId) throws InterruptedException {
        System.out.println("In put");
        Map<String, String> notification = new HashMap<>();
        notification.put(sessionId, string);
        pollingConfig.theQueues().get(sessionId).put(notification);
        //pollingConfig.theQueue().put(notification);
        System.out.println("The queue after put: " + pollingConfig.theQueues());
    }

    public void init(Integer id, String sessionId) {
        //PGConnectionService pgConnectionService = new PGConnectionService();
        //pgConnectionServiceMap.put(sessionId, pgConnectionService);

        // Get database info from environment variables
        String DBHost = "rds-rift.ca8aw0350uex.us-east-1.rds.amazonaws.com";
        String DBName = "Rift_Backend";
        String DBUserName = "riley_rift";
        String DBPassword = "RMARiftAWS2016!";

        // Create the listener callback
        PGNotificationListener listener = new PGNotificationListener() {

            @Override
            public void notification(int processId, String channelName, String payload) {
                System.out.println("Caught trigger");
                System.out.println("Channel name: " + channelName);
                System.out.println("Id: " + id);
                try {
                    put(payload, sessionId);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

            }
        };

        // Create a data source for logging into the db
        PGDataSource dataSource = new PGDataSource();
        dataSource.setHost(DBHost);
        dataSource.setPort(5432);
        dataSource.setDatabase(DBName);
        dataSource.setUser(DBUserName);
        dataSource.setPassword(DBPassword);

        //listener.notification(5, "Riley_Rift", "Payload$$");


        try {
            // Log into the db

            PGDataSource pgDataSource = pgConnectionConfig.pgDataSource();
            PGConnection pgConnection = (PGConnection) pgDataSource.getConnection();

            System.out.println("Establishing connection");
            //PGConnection connection = (PGConnection) dataSource.getConnection();
            System.out.println("Connection made");
            pgConnectionMap.put(sessionId, pgConnection);
            pgConnection.addNotificationListener(listener);

            // add the callback listener created earlier to the connection
            //pgConnectionServiceMap.get(sessionId).pgConnection.addNotificationListener(listener);
            //pgConnectionService.pgConnection.addNotificationListener(listener);

            // Tell Postgres to send NOTIFY q_event to our connection and listener
            Statement statement = pgConnection.createStatement();

            System.out.println("Listening to: " + id + " on sessionId: " + sessionId);
            String queryBuilder = "LISTEN q_event" + id;
            statement.execute(queryBuilder);

            statement.close();
        }
        catch (SQLException e) {
            e.printStackTrace();
        }

    }

    public void closePGConnection(String sessionId) {
        PGConnection connection = pgConnectionMap.get(sessionId);
        try {
            connection.close();
            pgConnectionMap.remove(sessionId);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }



/**
 *
 * main entry point
 *
 * @param args
 */
}
