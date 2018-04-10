package io.rift.component;

import io.rift.config.FuturePayments;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class FuturePaymentDaemon {

    @Autowired
    private FuturePayments futurePayments;

    /*
    @PostConstruct
    public void init() {
        ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();
        executorService.scheduleAtFixedRate(new Runnable() {
            @Override
            public void run() {
                futurePaymentDaemon();
            }
        }, 1, 1, TimeUnit.DAYS);
        System.out.println("Started daemon");
    }

    public void futurePaymentDaemon() {
        Future<?> future;
        for (Double hashedVal : futurePayments.futurePaymentMap().keySet()) {
            future = futurePayments.futurePaymentMap().get(hashedVal);
            if (future.isDone() || future.isCancelled()) {
                futurePayments.futurePaymentMap().remove(hashedVal);
            }
        }
    }
    */

}
