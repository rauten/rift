package io.rift.config;

import io.rift.model.Notification;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

@Configuration
public class PollingConfig {

    @Bean
    public BlockingQueue<Notification> theQueue() {
        return new LinkedBlockingQueue<>();
    }

}
