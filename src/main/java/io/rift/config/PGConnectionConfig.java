package io.rift.config;

import com.impossibl.postgres.jdbc.PGDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PGConnectionConfig {

    @Bean
    public PGDataSource pgDataSource() {

        String DBHost = "rds-rift.ca8aw0350uex.us-east-1.rds.amazonaws.com";
        String DBName = "Rift_Backend";
        String DBUserName = "riley_rift";
        String DBPassword = "RMARiftAWS2016!";

        PGDataSource dataSource = new PGDataSource();
        dataSource.setHost(DBHost);
        dataSource.setPort(5432);
        dataSource.setDatabase(DBName);
        dataSource.setUser(DBUserName);
        dataSource.setPassword(DBPassword);

        return dataSource;
    }

}
