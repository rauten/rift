package io.rift.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Future;
import java.util.concurrent.LinkedBlockingQueue;

@Configuration
public class FuturePayments {

    @Bean
    public Map<Double, Future> futurePaymentMap() {
        return new HashMap<>();
    }
}
