package io.rift.service;

import com.impossibl.postgres.api.jdbc.PGConnection;
import com.impossibl.postgres.jdbc.PGDataSource;
import io.rift.config.PGConnectionConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.sql.SQLException;

@Service
public class PGConnectionService {

    @Autowired
    private PGConnectionConfig pgConnectionConfig;

    public PGConnection pgConnection;

    @PostConstruct
    public void init() throws SQLException {
        PGDataSource pgDataSource = pgConnectionConfig.pgDataSource();
        pgConnection = (PGConnection) pgDataSource.getConnection();
        System.out.println("PG connected");
    }




}
