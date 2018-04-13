package io.rift.component;

import com.impossibl.postgres.api.jdbc.PGConnection;
import com.impossibl.postgres.api.jdbc.PGNotificationListener;
import com.impossibl.postgres.jdbc.PGDataSource;
import io.rift.component.PGConnectionService;
import io.rift.config.PGConnectionConfig;
import io.rift.config.PollingConfig;
import io.rift.config.SwaggerConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.BlockingQueue;

@Service
public class PostgresListenService {


    @Autowired
    private PollingConfig pollingConfig;

    @Autowired
    private PGConnectionService pgConnectionService;

    boolean stuff = true;


    public void init(Integer id) {
        //PGConnectionService pgConnectionService = new PGConnectionService();
        //pgConnectionServiceMap.put(sessionId, pgConnectionService);

        // Get database info from environment variables
        /*
        String DBHost = "rds-rift.ca8aw0350uex.us-east-1.rds.amazonaws.com";
        String DBName = "Rift_Backend";
        String DBUserName = "riley_rift";
        String DBPassword = "RMARiftAWS2016!";
        */

        // Create the listener callback


        /*
        String id2 = id.toString();


        PGNotificationListener listener = new PGNotificationListener() {

            @Override
            public void notification(int processId, String channelName, String payload) {
                System.out.println("Caught trigger");
                System.out.println("Channel name: " + channelName);
                System.out.println("Id: " + id);
                try {
                    put(payload, id2);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

            }
        };
        */



        // Create a data source for logging into the db



        //listener.notification(5, "Riley_Rift", "Payload$$");


        // Log into the db
        //PGDataSource pgDataSource = pgConnectionConfig.pgDataSource();
        try {
            String queryBuilder = "LISTEN q_event" + id;
            Statement statement = pgConnectionService.pgConnection.createStatement();
            statement.execute(queryBuilder);
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        //pgConnectionService.pgConnection.addNotificationListener(listener);
        /*
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    PGDataSource dataSource = pgConnectionConfig.pgDataSource();
                    //PGConnection pgConnection = (PGConnection) pgDataSource.getConnection();

                    System.out.println("Establishing connection");
                    PGConnection connection = (PGConnection) dataSource.getConnection();
                    System.out.println("Connection made");
                    connection.addNotificationListener(listener);

                    .

                    // add the callback listener created earlier to the connection
                    //pgConnectionServiceMap.get(sessionId).pgConnection.addNotificationListener(listener);
                    //pgConnectionService.pgConnection.addNotificationListener(listener);

                    // Tell Postgres to send NOTIFY q_event to our connection and listener
                    Statement statement = connection.createStatement();

                    //pgConnectionMap.put(sessionId, connection);

                    System.out.println("Listening to: " + id + " on sessionId: " + sessionId);
                    String queryBuilder = "LISTEN q_event" + id;
                    statement.execute(queryBuilder);

                    statement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        });
        thread.setPriority(10);
        thread.start();
        */
    }

    /*
    public void closePGConnection(String sessionId) {
        PGConnection connection = pgConnectionMap.get(sessionId);
        try {
            connection.close();
            pgConnectionMap.remove(sessionId);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    */


}
