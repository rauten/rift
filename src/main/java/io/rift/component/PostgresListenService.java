package io.rift.component;

import com.impossibl.postgres.api.jdbc.PGNotificationListener;
import com.impossibl.postgres.jdbc.PGDataSource;
import io.rift.component.PGConnectionService;
import io.rift.config.PollingConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.sql.Statement;

@Service
public class PostgresListenService {

    @Autowired
    private PGConnectionService pgConnectionService;

    @Autowired
    private PollingConfig pollingConfig;


    boolean stuff = true;

    public void put(String string) throws InterruptedException {
        System.out.println("In put");
        pollingConfig.theQueue().put(string);
        System.out.println("Size of queue after put: " + pollingConfig.theQueue().size());
    }

    public void init(Integer id) {
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

                try {
                    put(payload);
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
            //connection = (PGConnection) dataSource.getConnection();

            System.out.println("Connection made");

            // add the callback listener created earlier to the connection
            pgConnectionService.pgConnection.addNotificationListener(listener);

            // Tell Postgres to send NOTIFY q_event to our connection and listener
            Statement statement = pgConnectionService.pgConnection.createStatement();
            /*
            System.out.println("Id of listening: " + id);
            String queryBuilder = "UNLISTEN q_event" + id;
            statement.execute(queryBuilder);
            */
            String queryBuilder = "LISTEN q_event" + id;
            statement.execute(queryBuilder);

            statement.close();
        }
        catch (SQLException e) {
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
