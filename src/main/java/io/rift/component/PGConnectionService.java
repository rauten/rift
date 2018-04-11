package io.rift.component;

import com.impossibl.postgres.api.jdbc.PGConnection;
import com.impossibl.postgres.api.jdbc.PGNotificationListener;
import com.impossibl.postgres.jdbc.PGDataSource;
import io.rift.config.PGConnectionConfig;
import io.rift.config.PollingConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.LinkedBlockingQueue;

@Service
public class PGConnectionService {

    @Autowired
    private PGConnectionConfig pgConnectionConfig;

    public PGConnection pgConnection;

    @Autowired
    private PollingConfig pollingConfig;

    @Autowired
    private PostgresListenService postgresListenService;


    @PostConstruct
    public void init() throws SQLException {
        PGDataSource pgDataSource = pgConnectionConfig.pgDataSource();
        pgConnection = (PGConnection) pgDataSource.getConnection();
        System.out.println("PG connected");

        PGNotificationListener listener = new PGNotificationListener() {

            @Override
            public void notification(int processId, String channelName, String payload) {
                System.out.println("Caught trigger");
                System.out.println("Channel name: " + channelName);
                //System.out.println("Id: " + id);
                String idStr = channelName.replaceAll("\\D+", "");
                Integer id = Integer.parseInt(idStr);

                try {
                    put(payload, id.toString());
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }


            }
        };

        pgConnection.addNotificationListener(listener);

    }

    public void put(String string, String id) throws InterruptedException {
        System.out.println("In put");
        Map<String, String> notification = new HashMap<>();
        for (String sessionId: pollingConfig.theQueues().keySet()) {
            if (sessionId.startsWith(id)) {
                notification.put(sessionId, string);
                pollingConfig.theQueues().get(sessionId).put(notification);
                System.out.println("put in the for loop");
                //Map<String, BlockingQueue<Map<String, String>>> map = pollingConfig.theQueues();
                //BlockingQueue<Map<String, String>> linkedBlockingQueue = map.get(id + sessionId);
                //linkedBlockingQueue.put(notification);
            }
        }
        //pollingConfig.theQueues().get(id + sessionId2).put(notification);
        //pollingConfig.theQueues().get(sessionId).put(notification);
        //pollingConfig.theQueue().put(notification);
        System.out.println("The queue after put: " + pollingConfig.theQueues());
    }

}
