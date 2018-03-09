package io.rift.config;


import com.impossibl.postgres.api.jdbc.PGConnection;
import com.impossibl.postgres.jdbc.PGDataSource;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import javax.sql.DataSource;
import java.util.Properties;


@Configuration
public class SwaggerConfig {

    @Bean
    @ConfigurationProperties("spring.datasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create().build();
    }

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

    @Bean
    public Docket productApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("io.rift"))
                .build();
    }

    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        mailSender.setUsername("my.gmail@gmail.com");
        mailSender.setPassword("password");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }


}
