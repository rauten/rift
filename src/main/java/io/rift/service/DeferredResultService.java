package io.rift.service;

import io.rift.config.Hook;
import io.rift.config.PollingConfig;
import io.rift.model.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.BlockingQueue;

@Service("DeferredService")
public class DeferredResultService implements Runnable {

    private Hook hook;

    private volatile boolean start = true;

    private Thread thread;

    private final BlockingQueue<DeferredResult<Notification>> resultQueue = new LinkedBlockingQueue<>();

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private ShutdownService shutdownService;

    @Autowired
    private PollingConfig pollingConfig;

    public void subscribe() {
        System.out.println("Starting server");
        startThread();
        notificationService.isSubscribed = true;
        System.out.println(notificationService.isSubscribed);
        notificationService.setSubscribed(true);
        System.out.println(notificationService.isSubscribed);
    }

    private void startThread() {
        if (start) {
            synchronized (this) {
                if (start) {
                    start = false;
                    thread = new Thread(this, "Notification");
                    hook = shutdownService.createHook(thread);
                    thread.start();
                }
            }
        }
    }

    @Override
    public void run() {
        while (hook.keepRunning()) {
            try {
                DeferredResult<Notification> result = resultQueue.take();
                Notification notification = pollingConfig.theQueue().take();

                result.setResult(notification);
                //hook.shutdown();

            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("DeferredResultService - Thread ending");
    }

    public void getUpdate(DeferredResult<Notification> result) {
        resultQueue.add(result);
    }

}
