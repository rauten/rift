package io.rift.config;

import io.rift.model.Notification;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

@Configuration
public class PollingConfig {

    @Bean
    public Map<String, LinkedBlockingQueue<Map<String, String>>> theQueues() {
        return new HashMap<>();
    }

}
